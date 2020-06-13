package com.smarthome.backend.config;

import com.hivemq.client.mqtt.MqttClient;
import com.hivemq.client.mqtt.datatypes.MqttClientIdentifier;
import com.hivemq.client.mqtt.mqtt3.Mqtt3AsyncClient;
import com.hivemq.client.mqtt.mqtt3.Mqtt3Client;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * MQTT client configuration.
 */
@Configuration
public class MqttConfig {

    private static final Logger LOGGER = LoggerFactory.getLogger(MqttConfig.class);

    @Value("${spring.application.name}")
    private String applicationName;

    @Value("${smarthome.mqtt.server.address}")
    private String serverAddress;

    @Value("${smarthome.mqtt.server.port}")
    private Integer serverPort;

    @Bean
    public Mqtt3AsyncClient mqttClient() throws ExecutionException, InterruptedException {
        Mqtt3AsyncClient mqtt3AsyncClient = MqttClient.builder()
                .useMqttVersion3()
                .addConnectedListener(listener ->
                        LOGGER.info("MQTT client connected: mqttVersion='{}', server='{}:{}', state='{}', clientId='{}'",
                                listener.getClientConfig().getMqttVersion().name(),
                                listener.getClientConfig().getServerHost(),
                                listener.getClientConfig().getServerPort(),
                                listener.getClientConfig().getState().name(),
                                listener.getClientConfig().getClientIdentifier().get())
                )
                .addDisconnectedListener(listener ->
                        LOGGER.info("MQTT client disconnected: source='{}', mqttVersion='{}', server='{}:{}', state='{}', clientId='{}', cause='{}'",
                                listener.getSource().name(),
                                listener.getClientConfig().getMqttVersion().name(),
                                listener.getClientConfig().getServerHost(),
                                listener.getClientConfig().getServerPort(),
                                listener.getClientConfig().getState().name(),
                                listener.getClientConfig().getClientIdentifier().get(),
                                listener.getCause())
                )
                .identifier(MqttClientIdentifier.of(applicationName))
                .serverHost(serverAddress)
                .serverPort(serverPort)
                .automaticReconnect()
                .initialDelay(5, TimeUnit.SECONDS)
                .maxDelay(10, TimeUnit.SECONDS)
                .applyAutomaticReconnect()
                .buildAsync();

        mqttClientConnect(mqtt3AsyncClient);

        return mqtt3AsyncClient;
    }

    /**
     * Establishes MQTT client connectivity to the MQTT broker.
     *
     * @param mqtt3AsyncClient MQTT async client
     * @throws ExecutionException
     * @throws InterruptedException
     */
    private void mqttClientConnect(Mqtt3AsyncClient mqtt3AsyncClient) throws ExecutionException, InterruptedException {
        while (!mqtt3AsyncClient.getState().isConnected()) {
            mqtt3AsyncClient.connectWith()
                    .keepAlive(600)
                    .send()
                    .whenComplete((connAck, throwable) -> {
                        if (throwable != null) {
                            // Handle failure:
                            LOGGER.error("Connection to MQTT broker has failed", throwable);
                            mqtt3AsyncClient.disconnect();
                        } else {
                            // Setup subscriptions to broker's $SYS topics:
                            LOGGER.info("MQTT client connection: state='{}', session='{}', type='{}', returnCode='{}'",
                                    mqtt3AsyncClient.getState().name(), connAck.isSessionPresent(), connAck.getType(), connAck.getReturnCode().name());
                        }
                    })
                    .get(); // Call get() to ensure client is connected when this method exits
        }
    }


}
