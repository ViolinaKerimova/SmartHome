package com.smarthome.backend.service;

import com.smarthome.backend.command.Command;
import org.springframework.stereotype.Service;

@Service
public class CommandExecutor {

    public Object executeCommand(Command<?> command) {
        return command.execute();
    }

}
