package com.example.kodlama;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class MedicationScheduleController {
    @FXML
    private TextField medicineNameField;

    @FXML
    private TextField timeField;

    @FXML
    private ComboBox<String> mealStatusComboBox;

    @FXML
    private ListView<String> medicationList;

    @FXML
    private Button addMedicineButton;

    private ObservableList<String> medications = FXCollections.observableArrayList();

    @FXML
    private void initialize() {
        mealStatusComboBox.getItems().addAll("Before Eating", "After Eating");
        medicationList.setItems(medications);
    }

    @FXML
    private void addMedicine() {
        String medicineName = medicineNameField.getText();
        String time = timeField.getText();
        String mealStatus = mealStatusComboBox.getValue();

        if (!medicineName.isEmpty() && !time.isEmpty() && mealStatus != null) {
            String medicationEntry = String.format("%s - %s (%s)", medicineName, time, mealStatus);
            medications.add(medicationEntry);

            // Clear input fields
            medicineNameField.clear();
            timeField.clear();
            mealStatusComboBox.setValue(null);
        } else {
            showAlert("Please fill in all fields");
        }
    }

    private void showAlert(String message) {
        Alert alert = new Alert(Alert.AlertType.WARNING);
        alert.setTitle("Warning");
        alert.setHeaderText(null);
        alert.setContentText(message);
        alert.showAndWait();
    }
}