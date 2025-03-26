package com.example.kodlama;
import javafx.fxml.FXML;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;

public class SettingsController {
    @FXML
    private CheckBox notificationToggle;

    @FXML
    private ComboBox<String> themeSelector;

    @FXML
    private TextField nameField;

    @FXML
    private TextField emailField;

    @FXML
    private void initialize() {
        // Theme options
        themeSelector.getItems().addAll("Light", "Dark", "System Default");
        themeSelector.setValue("Light");

        // Default settings
        notificationToggle.setSelected(true);
    }

    @FXML
    private void saveSettings() {
        // Logic to save settings would go here
        System.out.println("Settings saved!");
        System.out.println("Name: " + nameField.getText());
        System.out.println("Email: " + emailField.getText());
        System.out.println("Theme: " + themeSelector.getValue());
        System.out.println("Notifications: " + notificationToggle.isSelected());
    }
}