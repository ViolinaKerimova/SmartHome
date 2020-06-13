package com.smarthome.backend.dto;

import java.util.List;

public class SensorMessageDTO {

    private String deviceName;

    private List<MeasurementDTO> measurements;

    public SensorMessageDTO() {
    }

    public SensorMessageDTO(String deviceName, List<MeasurementDTO> measurements) {
        this.deviceName = deviceName;
        this.measurements = measurements;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public List<MeasurementDTO> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(List<MeasurementDTO> measurements) {
        this.measurements = measurements;
    }
}
