package com.smarthome.backend.service;

import com.smarthome.backend.command.AbstractCommand;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service
public class CommandExecutor {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommandExecutor.class);

    @Autowired
    private ApplicationContext applicationContext;

    public Object executeCommand(Class<? extends AbstractCommand<?>> commandType) {
        LOGGER.info("Executing command '{}'", commandType);
        AbstractCommand<?> command = applicationContext.getBean(commandType);
        return command.execute();
    }

}
