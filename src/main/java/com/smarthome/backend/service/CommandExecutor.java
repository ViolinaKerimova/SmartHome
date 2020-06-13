package com.smarthome.backend.service;

import com.smarthome.backend.command.AbstractCommand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class CommandExecutor {

    @Autowired
    private ApplicationContext applicationContext;

    public Object executeCommand(Class<? extends AbstractCommand<?>> commandType) {
        AbstractCommand<?> command = applicationContext.getBean(commandType);
        return command.execute();
    }

}
