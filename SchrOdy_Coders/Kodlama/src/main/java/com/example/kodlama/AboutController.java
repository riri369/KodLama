package com.example.kodlama;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.ImageView;

public class AboutController {
    @FXML
    private Label nameLabel;

    @FXML
    private Label ageLabel;

    @FXML
    private Label bloodTypeLabel;

    @FXML
    private Label emergencyContactLabel;

    @FXML
    private ImageView userProfileImage;

    @FXML
    private void initialize() {
        // Sample user information (in a real app, this would be loaded from a database or user profile)
        nameLabel.setText("John Doe");
        ageLabel.setText("35 years");
        bloodTypeLabel.setText("A+");
        emergencyContactLabel.setText("Jane Doe (Wife): 555-1234");
    }
}