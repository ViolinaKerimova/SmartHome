package com.smarthome.backend.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.smarthome.backend.enums.MeasurementType;
import com.smarthome.backend.enums.MeasurementUnit;

import java.time.LocalDateTime;

public class MeasurementDTO {

    @JsonAlias({"type", "measurementType"})
    private MeasurementType type;

    @JsonAlias({"unit", "measurementUnit"})
    private MeasurementUnit unit;

    @JsonAlias({"value", "measurementValue"})
    private String value;

    private LocalDateTime timestamp;

    public MeasurementDTO(MeasurementType type, MeasurementUnit unit, String value) {
        this.type = type;
        this.unit = unit;
        this.value = value;
    }

    public MeasurementDTO() {
    }

    public MeasurementType getType() {
        return type;
    }

    public void setType(MeasurementType type) {
        this.type = type;
    }

    public MeasurementUnit getUnit() {
        return unit;
    }

    public void setUnit(MeasurementUnit unit) {
        this.unit = unit;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}