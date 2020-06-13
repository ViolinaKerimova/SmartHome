package com.smarthome.backend.model;

import com.smarthome.backend.enums.MeasurementType;
import com.smarthome.backend.enums.MeasurementUnit;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity(name = "measurement")
public class Measurement {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;
    private MeasurementType type;
    private MeasurementUnit unit;
    private Double value;
    private LocalDateTime timestamp = LocalDateTime.now();

    public Measurement(MeasurementType type, MeasurementUnit unit, Double value) {
        this.type = type;
        this.unit = unit;
        this.value = value;
    }

    public Measurement() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
