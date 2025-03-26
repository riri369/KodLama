package com.example.kodlama;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;

public class CheckUpController {
    @FXML
    private TextField symptomsField;

    @FXML
    private TextField durationField;

    @FXML
    private TextArea possibleHelpArea;

    @FXML
    private TextArea adviceArea;

    @FXML
    private Button checkButton;

    @FXML
    private void initialize() {
        checkButton.setOnAction(e -> analyzeSymptoms());
    }

    private void analyzeSymptoms() {
        String symptoms = symptomsField.getText();
        String duration = durationField.getText();

        // Basic symptom analysis logic (you'd want to replace this with more sophisticated logic)
        if (symptoms.toLowerCase().contains("headache")) {
            possibleHelpArea.setText("Possible Help:\n- Rest in a quiet, dark room\n- Drink water\n- Take over-the-counter pain relievers");
            adviceArea.setText("Advice:\n- Monitor frequency and intensity of headaches\n- Consider consulting a doctor if persistent");
        } else if (symptoms.toLowerCase().contains("fever")) {
            possibleHelpArea.setText("Possible Help:\n- Rest\n- Stay hydrated\n- Use fever-reducing medication");
            adviceArea.setText("Advice:\n- Monitor body temperature\n- Seek medical attention if fever is high or persistent");
        } else {
            possibleHelpArea.setText("Unable to provide specific advice. Please consult a healthcare professional.");
            adviceArea.setText("General Advice:\n- Rest\n- Stay hydrated\n- Monitor your symptoms");
        }
    }
}