package com.example.kodlama;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.stage.Stage;

public class HealthTrackerApp extends Application {
    @Override
    public void start(Stage primaryStage) throws Exception {
        FXMLLoader fxmlLoader = new FXMLLoader(HealthTrackerApp.class.getResource("main_interface.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 783, 612);
        primaryStage.setTitle("Health Tracker");
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}