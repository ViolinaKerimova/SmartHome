package com.smarthome.backend.controller;

import com.smarthome.backend.dto.MeasurementDTO;
import com.smarthome.backend.service.MeasurementsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/smarthome")
public class SmartHomeController {

    @Autowired
    private MeasurementsService measurementsService;

    @GetMapping
    public ResponseEntity<List<MeasurementDTO>> getAllMeasurements() {
        List<MeasurementDTO> allMeasurements = measurementsService.getAllMeasurements();
        return allMeasurements.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(allMeasurements);
    }

}
