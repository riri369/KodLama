package com.example.kodlama;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
public class HelloViewController {
    @FXML
    private Label welcomeText;

    @FXML
    protected void onHelloButtonClick() {
        welcomeText.setText("Welcome to JavaFX Application!");
    }

    public void Open(ActionEvent actionEvent) {

    }

    public void Exit(ActionEvent actionEvent) {

    }
}
