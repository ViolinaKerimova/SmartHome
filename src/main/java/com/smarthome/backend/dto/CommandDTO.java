package com.smarthome.backend.dto;

import com.smarthome.backend.enums.CommandType;

public class CommandDTO {

    private CommandType command;

    public CommandType getCommand() {
        return command;
    }

    public void setCommand(CommandType command) {
        this.command = command;
    }
}