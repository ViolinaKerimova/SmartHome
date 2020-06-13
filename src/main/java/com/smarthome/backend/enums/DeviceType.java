package com.smarthome.backend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * @author Georgi Velev
 */
public enum DeviceType {

    SENSOR("sensor"),
    ACTUATOR("actuator"),
    UNKNOWN("unknown");

    private String type;

    DeviceType(String type) {
        this.type = type;
    }

    @JsonCreator
    public static DeviceType fromString(String type) {
        for (DeviceType d : DeviceType.values()) {
            if (d.type.equalsIgnoreCase(type)) {
                return d;
            }
        }
        return null;
    }

    @JsonValue
    public String getType() {
        return type;
    }

}
