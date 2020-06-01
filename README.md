# smarthome-backend
Server application for a university IoT project "Smart Home"

## Used technologies
1. Mosquitto MQTT broker
2. MySQL RDBMS
3. Spring Framework & Spring Boot
4. Docker

## Short description
This is the back-end server application for the "Smart Home" university project for "Distributed Embedded Systems" discipline.

### Functionalities:
- Room lights and temperature monitoring
- Temperature control via commands based on the temperature sensor readings
    - commands issued to relays controlling a fan and a heater
- Lights control via commands based on the lights sensor readings
    - commands issued to relays the room lights
    
### Hardware:
- 2x NodeMCU (ESP8266) modules
- 4x AC relays (10A/250V)
- 1x DHT11 temperature and humidity sensor
- 1x photoresistor as a light sensor

## How-to
1. Download and install Docker -> [link](https://hub.docker.com/editions/community/docker-ce-desktop-windows/)
2. Execute ``docker-compose up`` in the root directory of the project
3. Run the Spring Boot appliaction - ``./mvnw spring-boot:run``

