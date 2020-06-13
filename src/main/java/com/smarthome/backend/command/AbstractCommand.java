package com.smarthome.backend.command;

import com.smarthome.backend.exception.CommandExecutionException;

public abstract class AbstractCommand<T> {

    protected boolean canExecute() {
        return true;
    }

    protected abstract T doExecute();

    public T execute() {
        if (canExecute()) {
            return doExecute();
        } else {
            throw new CommandExecutionException("Command cannot be executed!");
        }
    }

}
