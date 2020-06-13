package com.smarthome.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Supported measurement units.
 *
 * @author Georgi Velev
 */
public enum MeasurementUnit {

    CELSIUS("Celsius"),
    FAHRENHEIT("Fahrenheit"),
    RH("%"),
    VOLTAGE("voltage");

    private final String unit;

    MeasurementUnit(String unit) {
        this.unit = unit;
    }

    @JsonCreator
    public static MeasurementUnit fromString(String unit) {
        for (MeasurementUnit m : MeasurementUnit.values()) {
            if (m.unit.equalsIgnoreCase(unit)) {
                return m;
            }
        }
        return null;
    }

    @JsonValue
    public String getUnit() {
        return unit;
    }
}
