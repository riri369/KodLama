package com.example.kodlama;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class NotificationsController {
    @FXML
    private ListView<String> notificationsList;

    @FXML
    private void initialize() {
        // Sample notifications
        notificationsList.getItems().addAll(
                "Next Appointment: Dr. Smith - May 15, 2024 at 10:00 AM",
                "Medication Reminder: Take Aspirin at 8:00 AM",
                "Prescription Refill: Amoxicillin due in 5 days",
                "Annual Check-up: Schedule upcoming blood tests"
        );
    }
}