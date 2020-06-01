package com.smarthome.backend.dto;

public class LightSensorReadingDTO {

    private String deviceId;

    private Integer measurement;

    public LightSensorReadingDTO() {
    }

    public LightSensorReadingDTO(String deviceId, Integer measurement) {
        this.deviceId = deviceId;
        this.measurement = measurement;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public Integer getMeasurement() {
        return measurement;
    }

    public void setMeasurement(Integer measurement) {
        this.measurement = measurement;
    }
}
