#define MQTT_MAX_PACKET_SIZE 192
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTTYPE    DHT11    // Select DHT sensor model: DHT 11
#define ON 1
#define OFF 0


// Function prototypes:
void callback(char* topic, byte* payload, unsigned int length);
void create_json_with_sensor_readings();
void setup_wifi();
void reconnect();

// Network connection details (WiFi and MQTT):
const char* ssid = "Dani_Fiber";
const char* password = "150515051505";

const char* mqtt_server_address = "192.168.1.3";
const int mqtt_server_port = 1883;
//Sensors
const uint8_t DHTPin = D5;  

//Relays 
const uint8_t LAMP_RELAY = D8;
const uint8_t HEAT_RELAY = D7;


// MQTT topics where sensor data should be published to:
const char* device_name = "nodemcu_sensor";
const char* sensor_topic = "nodemcu_sensor/measurements";

const char* builtin_light_topic = "nodemcu_sensor/light";
const char* builtin_heat_topic = "nodemcu_sensor/heat";
