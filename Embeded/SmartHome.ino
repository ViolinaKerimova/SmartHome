
#include "SmartHome.h"

// Define WiFi client and MQTT PubSubClient objects:
WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

float temp, hum;            // Variables for storing temp and humidity readings:
DHT dht(DHTPin, DHTTYPE);   // Initialize DHT sensor object with pin and DHT model.
int sensorValueFromAdc; 
float voltage;  //10'bit adc, 1023resolution, 3.3v
char payload[300];

void setup() {
  // Temp&Hum Sensor Setup:
  pinMode(DHTPin, INPUT);       // Set DHTPin as input since we're going to read data from it:
  pinMode(LAMP_RELAY, OUTPUT);
  pinMode(HEAT_RELAY, OUTPUT);
  
  dht.begin();
  Serial.begin(9600);
  setup_wifi();
  mqttClient.setServer(mqtt_server_address, mqtt_server_port);
  mqttClient.setCallback(callback);
}

void loop() {

  // Ensure MQTT client is connected to the MQTT broker:
  if (!mqttClient.connected()) {
    reconnect();
  }
  mqttClient.loop();

  // Construct JSON payload with sensor readings data:
  create_json_with_sensor_readings();

  if (payload != NULL) {
    // Log message payload and send to nodemcu_sensor/measurements topic:
    Serial.println("Publishing measurements: ");
    Serial.println(payload);
    mqttClient.publish(sensor_topic, payload);
    //Serial.println();
  }
  
  // 5sec delay:
  delay(5000);
}

/**
   Procedure to setup and establish WiFi connectivity.
*/
void setup_wifi() {
  delay(10);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  // Loop until connection is established:
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

/**
   Callback procedure to execute when MQTT message has arrived.
*/
void callback(char* topic, byte* payload, unsigned int length) {
  char content[15];
  Serial.println();
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    content[i] = (char)payload[i];
  }
  Serial.println();
  String *content_string = new String(content);

  Serial.println();
  if (strcmp(topic, builtin_light_topic) == 0) {
    if (content_string->startsWith("LIGHT_ON")) {
      digitalWrite(LAMP_RELAY, ON);   // Turn the LED on (Note that LOW is the voltage level
      // but actually the LED is on; this is because
      // it is active low on the ESP-01)
    }
    if (content_string->startsWith("LIGHT_OFF")) {
      digitalWrite(LAMP_RELAY, OFF);  // Turn the LED off by making the voltage HIGH
    }
  }
  else if (strcmp(topic, builtin_heat_topic) == 0) {
    if (content_string->startsWith("HEAT_ON")) {
      digitalWrite(HEAT_RELAY, ON);   // Turn the LED on (Note that LOW is the voltage level
      // but actually the LED is on; this is because
      // it is active low on the ESP-01)
    }
    if (content_string->startsWith("HEAT_OFF")) {
      digitalWrite(HEAT_RELAY, OFF);  // Turn the LED off by making the voltage HIGH
    }
  }

  payload = (byte *)0;
}

/**
   Procedure to ensure reconnect mechanism for MQTT client.
*/
void reconnect() {

  // Loop until we're reconnected:
  while (!mqttClient.connected()) {
    Serial.print("Attempting MQTT connection...");

    // Create a random client ID:
    String clientId = device_name;

    // Attempt to connect:
    if (mqttClient.connect(clientId.c_str())) {
      Serial.println("connected");

      // Once connected, publish an announcement and subscribe to nodemcu/light topic:
      mqttClient.subscribe(builtin_light_topic);
      mqttClient.subscribe(builtin_heat_topic);
    } else {
      Serial.print("failed, state=");
      Serial.print(mqttClient.state());
      Serial.println(" try again in 5 seconds");

      // Wait 5 seconds before retrying:
      delay(5000);
    }
  }
}

/**
   Creates JSON object with populated temperature and humidity
   sensor readings from DHT11 and returns it as char[].

   Uses the globally defined temp and hum variables and reads
   the DHT11's current state.
*/
void create_json_with_sensor_readings() {
  // Define needed capacity for JSON object:
  const int capacity = JSON_ARRAY_SIZE(3) + JSON_OBJECT_SIZE(2) + 3 * JSON_OBJECT_SIZE(3);
  
  
  for(int i = 0; i < 300; i++) {
    payload[i] = 'k'; 
  }
  
  DynamicJsonDocument doc(capacity);

  // Update current light temp hum readings
 
  sensorValueFromAdc = analogRead(A0); 
  voltage = sensorValueFromAdc *(3.3 / 1023.0);  //10'bit adc, 1023resolution, 3.3v
  temp = dht.readTemperature();
  hum = dht.readHumidity();
  // Serial.print("Publishing measurements: ");
  //Serial.print("TEMP and HUM = "); Serial.print(temp); Serial.print("  "); Serial.print(hum); Serial.print("\n");
  //Serial.println("Light: "); 
  //Serial.println(sensorValueFromAdc);
  // Serial.println(voltage);
  
  if (!isnan(temp) || !isnan(hum) || !isnan(voltage)) {
    // Populate JSON object:
    doc["deviceName"] = device_name;
    JsonArray measurements = doc.createNestedArray("measurements");
    JsonObject temp_measurement = measurements.createNestedObject();
    temp_measurement["type"] = "temperature";
    temp_measurement["unit"] = "celsius";
    temp_measurement["value"] = temp;
    JsonObject humid_measurement = measurements.createNestedObject();
    humid_measurement["type"] = "humidity";
    humid_measurement["unit"] = "%";
    humid_measurement["value"] = hum;
    JsonObject light_measurement = measurements.createNestedObject();
    light_measurement["type"] = "light";
    light_measurement["unit"] = "voltage";
    light_measurement["value"] = voltage;
    // Serialize JSON object to char[] and free the allocated memory:
    serializeJson(doc, payload);
    doc.clear();
  } 
}
