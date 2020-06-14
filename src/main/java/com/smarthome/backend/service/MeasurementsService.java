package com.smarthome.backend.service;

import com.smarthome.backend.dto.MeasurementDTO;
import com.smarthome.backend.model.Measurement;
import com.smarthome.backend.repository.MeasurementRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MeasurementsService {

    @Autowired
    private MeasurementRepository measurementRepository;

    public List<MeasurementDTO> getAllMeasurements() {
        return measurementRepository.findAll().stream()
                .map(measurement -> {
                    MeasurementDTO measurementDTO = new MeasurementDTO();
                    measurementDTO.setValue(measurement.getValue().toString());
                    measurementDTO.setUnit(measurement.getUnit());
                    measurementDTO.setType(measurement.getType());
                    measurementDTO.setTimestamp(measurement.getTimestamp());
                    return measurementDTO;
                })
                .collect(Collectors.toList());
    }

    public void saveMultiple(List<MeasurementDTO> measurements) {
        measurementRepository.saveAll(measurements.stream()
                .map(dto -> new Measurement(dto.getType(), dto.getUnit(), Double.parseDouble(dto.getValue())))
                .collect(Collectors.toList()));
    }

    public List<MeasurementDTO> getLastMeasurements(int numberOfMeasurements) {
        return measurementRepository.findAll(PageRequest.of(0, numberOfMeasurements, Sort.Direction.DESC, "id")).get()
                .map(measurement -> {
                    MeasurementDTO measurementDTO = new MeasurementDTO();
                    measurementDTO.setValue(measurement.getValue().toString());
                    measurementDTO.setUnit(measurement.getUnit());
                    measurementDTO.setType(measurement.getType());
                    measurementDTO.setTimestamp(measurement.getTimestamp());
                    return measurementDTO;
                })
                .collect(Collectors.toList());
    }

}
