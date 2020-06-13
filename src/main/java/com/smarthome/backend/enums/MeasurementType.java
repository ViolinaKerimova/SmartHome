package com.smarthome.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Supported measurement types.
 *
 * @author Georgi Velev
 */
public enum MeasurementType {

    TEMPERATURE("Temperature"),
    HUMIDITY("Humidity"),
    LIGHT("Light");

    private final String type;

    MeasurementType(String type) {
        this.type = type;
    }

    @JsonCreator
    public static MeasurementType fromString(String type) {
        for (MeasurementType m : MeasurementType.values()) {
            if (m.type.equalsIgnoreCase(type)) {
                return m;
            }
        }
        return null;
    }

    @JsonValue
    public String getType() {
        return type;
    }
}
