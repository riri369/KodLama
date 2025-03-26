package com.example.kodlama;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.ImageView;
import javafx.stage.Stage;
import javafx.application.Platform;
import java.io.IOException;

public class MainInterfaceController {
    @FXML
    public Button menuButton;

    @FXML
    private Button checkUpButton;

    @FXML
    private Button notificationButton;

    @FXML
    private Button settingsButton;

    @FXML
    private Button medicationScheduleButton;

    @FXML
    private Button aboutButton;

    @FXML
    private Button EXIT;

    private void openInterface(String fxmlFileName, String title) {
        try {
            FXMLLoader loader = new FXMLLoader(getClass().getResource(fxmlFileName));
            Parent root = loader.load();
            Stage stage = new Stage();
            stage.setTitle(title);
            stage.setScene(new Scene(root));
            stage.show();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @FXML
    private void openCheckUpInterface() {
        openInterface("check_up_interface.fxml", "Check-Up");
    }

    @FXML
    private void openNotificationsInterface() {
        openInterface("notifications_interface.fxml", "Notifications");
    }

    @FXML
    private void openSettingsInterface() {
        openInterface("settings_interface.fxml", "Settings");
    }

    @FXML
    private void openAboutInterface() {
        openInterface("about_interface.fxml", "About");
    }

    @FXML
    private void openMedicationScheduleInterface() {
        openInterface("medication_schedule_interface.fxml", "Medication Schedule");
    }

    @FXML
    public void Exit(ActionEvent actionEvent) {
        Platform.exit();
    }
}