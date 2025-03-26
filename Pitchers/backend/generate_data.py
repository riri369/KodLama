from flask import Flask, jsonify
from flask_cors import CORS
import random
import time
import threading
import datetime
import math

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Store patient data in memory for this demo
patients = [
    {
        "id": "P-001",
        "name": "John Smith",
        "age": 65,
        "gender": "Male",
        "room": "ICU-101",
        "baselineVitals": {
            "heartRate": 90,
            "bloodPressure": {
                "systolic": 140,
                "diastolic": 90
            },
            "temperature": {
                "celsius": 37.8
            },
            "respiratoryRate": 19,
            "oxygenSaturation": 94
        },
        "deteriorating": True  # This patient will show worsening vitals
    },
    {
        "id": "P-002",
        "name": "Sarah Johnson",
        "age": 45,
        "gender": "Female",
        "room": "ICU-102",
        "baselineVitals": {
            "heartRate": 75,
            "bloodPressure": {
                "systolic": 120,
                "diastolic": 80
            },
            "temperature": {
                "celsius": 37.2
            },
            "respiratoryRate": 16,
            "oxygenSaturation": 98
        },
        "deteriorating": False  # This patient will have stable vitals
    }
]

# Current state of each patient's vital signs
current_patient_data = {}

# Define normal ranges for vital signs
NORMAL_RANGES = {
    "heartRate": (60, 100),  # BPM
    "systolic": (90, 140),   # mmHg
    "diastolic": (60, 90),   # mmHg
    "temperature": (36.5, 37.5),  # Celsius
    "respiratoryRate": (12, 20),  # breaths per minute
    "oxygenSaturation": (95, 100)  # percentage
}

def celsius_to_fahrenheit(celsius):
    """Convert Celsius to Fahrenheit."""
    return (celsius * 9/5) + 32

def calculate_sepsis_risk(vitals):
    """
    Calculate a sepsis risk score based on vital signs.
    Returns a value between 0-100.
    """
    score = 0
    
    # Heart rate contribution (tachycardia increases risk)
    if vitals["heartRate"] > 90:
        score += min(30, (vitals["heartRate"] - 90) * 0.6)
    
    # Temperature contribution (fever increases risk)
    if vitals["temperature"]["celsius"] > 38.0:
        score += min(25, (vitals["temperature"]["celsius"] - 38.0) * 20)
    
    # Respiratory rate contribution (tachypnea increases risk)
    if vitals["respiratoryRate"] > 20:
        score += min(20, (vitals["respiratoryRate"] - 20) * 2)
    
    # Blood pressure contribution (hypotension increases risk)
    if vitals["bloodPressure"]["systolic"] < 100:
        score += min(25, (100 - vitals["bloodPressure"]["systolic"]) * 0.8)
    
    # Oxygen saturation contribution (hypoxemia increases risk)
    if vitals["oxygenSaturation"] < 95:
        score += min(30, (95 - vitals["oxygenSaturation"]) * 6)
    
    return min(100, max(0, score))

def update_patient_vitals():
    """Update patient vitals at regular intervals."""
    for patient in patients:
        patient_id = patient["id"]
        baseline = patient["baselineVitals"]
        deteriorating = patient["deteriorating"]
        
        # Time-based variation - use a sine wave with different phases for each vital
        t = time.time() / 300  # slow cycle of about 5 minutes
        
        # Initialize patient data if it doesn't exist
        if patient_id not in current_patient_data:
            current_patient_data[patient_id] = {
                "lastUpdate": datetime.datetime.now().isoformat(),
                "vitalSigns": {
                    "heartRate": round(baseline["heartRate"], 2),
                    "bloodPressure": {
                        "systolic": round(baseline["bloodPressure"]["systolic"], 2),
                        "diastolic": round(baseline["bloodPressure"]["diastolic"], 2)
                    },
                    "temperature": {
                        "celsius": round(baseline["temperature"]["celsius"], 2),
                        "fahrenheit": round(celsius_to_fahrenheit(baseline["temperature"]["celsius"]), 2)
                    },
                    "respiratoryRate": round(baseline["respiratoryRate"], 2),
                    "oxygenSaturation": round(baseline["oxygenSaturation"], 2)
                },
                "sepsisRiskScore": 0,
                "alerts": {
                    "active": False,
                    "timestamp": None
                }
            }
        
        # Current data
        current = current_patient_data[patient_id]
        
        # Generate new vital signs with randomness and trends
        # For deteriorating patients, slowly worsen vitals over time
        deterioration_factor = 0
        if deteriorating:
            # Increase over a 30-minute period to simulate deterioration
            deterioration_factor = min(1.0, time.time() % 1800 / 1800) * 1.5  
        
        # Update heart rate - smaller variations for visual appeal
        variation = math.sin(t) * 3 + random.uniform(-1, 1)
        if deteriorating:
            variation += deterioration_factor * 15  # More moderate increase
        current["vitalSigns"]["heartRate"] = round(max(60, min(120, baseline["heartRate"] + variation)), 2)
        
        # Update blood pressure - smaller variations
        sys_variation = math.sin(t + 1) * 4 + random.uniform(-2, 2)
        dia_variation = math.sin(t + 2) * 3 + random.uniform(-1, 1)
        if deteriorating:
            # Blood pressure initially increases then drops for sepsis
            if deterioration_factor < 0.5:
                sys_variation += deterioration_factor * 20
            else:
                sys_variation -= (deterioration_factor - 0.5) * 30
        current["vitalSigns"]["bloodPressure"]["systolic"] = round(max(90, min(160, baseline["bloodPressure"]["systolic"] + sys_variation)), 2)
        current["vitalSigns"]["bloodPressure"]["diastolic"] = round(max(50, min(100, baseline["bloodPressure"]["diastolic"] + dia_variation)), 2)
        
        # Update temperature - smaller variations
        temp_variation = math.sin(t + 3) * 0.2 + random.uniform(-0.05, 0.05)
        if deteriorating:
            temp_variation += deterioration_factor * 1.0  # More moderate fever
        new_celsius = round(max(36.0, min(39.5, baseline["temperature"]["celsius"] + temp_variation)), 2)
        current["vitalSigns"]["temperature"]["celsius"] = new_celsius
        current["vitalSigns"]["temperature"]["fahrenheit"] = round(celsius_to_fahrenheit(new_celsius), 2)
        
        # Update respiratory rate - smaller variations
        resp_variation = math.sin(t + 4) * 1.5 + random.uniform(-0.5, 0.5)
        if deteriorating:
            resp_variation += deterioration_factor * 6  # More moderate increase
        current["vitalSigns"]["respiratoryRate"] = round(max(10, min(28, baseline["respiratoryRate"] + resp_variation)), 2)
        
        # Update oxygen saturation - smaller variations
        ox_variation = math.sin(t + 5) * 0.8 + random.uniform(-0.3, 0.3)
        if deteriorating:
            ox_variation -= deterioration_factor * 5  # More moderate decrease
        current["vitalSigns"]["oxygenSaturation"] = round(max(85, min(100, baseline["oxygenSaturation"] + ox_variation)), 2)
        
        # Update timestamp
        current["lastUpdate"] = datetime.datetime.now().isoformat()
        
        # Calculate sepsis risk score
        current["sepsisRiskScore"] = int(calculate_sepsis_risk(current["vitalSigns"]))
        
        # Set alert if risk score is high
        if current["sepsisRiskScore"] > 70 and not current["alerts"]["active"]:
            current["alerts"]["active"] = True
            current["alerts"]["timestamp"] = datetime.datetime.now().isoformat()
        elif current["sepsisRiskScore"] <= 60 and current["alerts"]["active"]:
            current["alerts"]["active"] = False
            current["alerts"]["timestamp"] = None

def vitals_updater():
    """Background thread to update vitals regularly."""
    while True:
        update_patient_vitals()
        time.sleep(3)  # Update every 3 seconds

# Start the background thread
threading.Thread(target=vitals_updater, daemon=True).start()

@app.route('/api/patients', methods=['GET'])
def get_patients():
    """Return a list of all patients with their current vital signs."""
    result = []
    for patient in patients:
        patient_id = patient["id"]
        if patient_id in current_patient_data:
            result.append({
                "id": patient["id"],
                "name": patient["name"],
                "age": patient["age"],
                "gender": patient["gender"],
                "room": patient["room"],
                "lastUpdate": current_patient_data[patient_id]["lastUpdate"],
                "vitalSigns": current_patient_data[patient_id]["vitalSigns"],
                "sepsisRiskScore": current_patient_data[patient_id]["sepsisRiskScore"],
                "alerts": current_patient_data[patient_id]["alerts"]
            })
    return jsonify(result)

@app.route('/api/patient/<patient_id>', methods=['GET'])
def get_patient(patient_id):
    """Return detailed information for a specific patient."""
    for patient in patients:
        if patient["id"] == patient_id and patient_id in current_patient_data:
            return jsonify({
                "id": patient["id"],
                "name": patient["name"],
                "age": patient["age"],
                "gender": patient["gender"],
                "room": patient["room"],
                "lastUpdate": current_patient_data[patient_id]["lastUpdate"],
                "vitalSigns": current_patient_data[patient_id]["vitalSigns"],
                "sepsisRiskScore": current_patient_data[patient_id]["sepsisRiskScore"],
                "alerts": current_patient_data[patient_id]["alerts"]
            })
    return jsonify({"error": "Patient not found"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)