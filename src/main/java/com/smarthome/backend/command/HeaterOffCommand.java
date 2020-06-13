package com.smarthome.backend.command;

import com.hivemq.client.mqtt.datatypes.MqttQos;
import com.hivemq.client.mqtt.datatypes.MqttTopic;
import com.hivemq.client.mqtt.mqtt3.Mqtt3AsyncClient;
import com.smarthome.backend.annotation.Command;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

@Command
public class HeaterOffCommand extends AbstractCommand<Void> {

    @Autowired
    private Mqtt3AsyncClient mqttClient;

    @Value("${smartHome.mqtt.devices.heaterActuator.topic}")
    private String topic;

    @Override
    protected Void doExecute() {
        mqttClient.publishWith()
                .topic(MqttTopic.of(topic))
                .qos(MqttQos.EXACTLY_ONCE)
                .payload("HEAT_ON".getBytes())
                .send();

        return null;
    }
}
