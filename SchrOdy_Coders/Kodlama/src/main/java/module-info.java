module com.example.kodlama {
    requires javafx.controls;
    requires javafx.fxml;
    requires javafx.graphics;

    opens com.example.kodlama to javafx.fxml;
    exports com.example.kodlama;
}