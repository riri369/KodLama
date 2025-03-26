
import React from 'react';
import { AlertTriangle, Phone, Shield, Info, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EmergencyGuideProps {
  isOpen: boolean;
  onClose: () => void;
  alertType: string;
}

const EmergencyGuide: React.FC<EmergencyGuideProps> = ({ 
  isOpen, 
  onClose,
  alertType
}) => {
  // Helper function to get alert-specific guidelines
  const getGuidelines = () => {
    switch (alertType.toLowerCase()) {
      case 'humidity':
        return [
          "Move to a well-ventilated area",
          "Use fans or air conditioners if available",
          "Stay hydrated with water",
          "Avoid strenuous physical activity",
          "Use dehumidifiers if available"
        ];
      case 'temperature':
        return [
          "Stay in air-conditioned areas",
          "Drink plenty of fluids",
          "Wear lightweight, light-colored clothing",
          "Take cool showers or baths",
          "Avoid direct sunlight and strenuous activities"
        ];
      case 'windspeed':
        return [
          "Stay indoors, away from windows",
          "Move to a basement or interior room on the lowest floor",
          "If outside, find shelter immediately",
          "If in a vehicle, drive to the closest building for shelter",
          "Avoid bridges, highway overpasses, and flood-prone areas"
        ];
      default:
        return [
          "Stay informed through emergency broadcasts",
          "Follow instructions from local authorities",
          "Have an emergency kit ready",
          "Charge your mobile devices",
          "Check on vulnerable neighbors if safe to do so"
        ];
    }
  };
  
  // Emergency contacts
  const emergencyContacts = [
    { name: "Emergency Services", number: "911" },
    { name: "Local Emergency Management", number: "555-123-4567" },
    { name: "Weather Service Hotline", number: "555-789-0123" },
    { name: "Disaster Relief", number: "555-456-7890" }
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto neo-glass">
        <DialogHeader>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-danger mr-2" />
            <DialogTitle>Emergency Guidelines</DialogTitle>
          </div>
          <DialogDescription>
            Important safety information and contacts
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Safety Guidelines
            </h3>
            <ul className="mt-3 space-y-2">
              {getGuidelines().map((guideline, index) => (
                <li key={index} className="flex">
                  <span className="mr-2">•</span>
                  <span>{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium flex items-center">
              <Phone className="h-5 w-5 mr-2 text-primary" />
              Emergency Contacts
            </h3>
            <ul className="mt-3 space-y-3">
              {emergencyContacts.map((contact, index) => (
                <li key={index} className="flex justify-between">
                  <span>{contact.name}</span>
                  <a 
                    href={`tel:${contact.number}`} 
                    className="font-medium text-primary hover:underline"
                  >
                    {contact.number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-secondary/50 p-4 rounded-xl">
            <h3 className="text-sm font-medium flex items-center">
              <Info className="h-4 w-4 mr-2 text-muted-foreground" />
              Important Information
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              These guidelines are general recommendations. Always follow official instructions from local emergency management agencies and first responders during emergencies.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onClose} className="mt-2">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyGuide;
