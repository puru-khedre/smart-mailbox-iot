#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>

int INPUT_PIN = 13; // choose input pin (for Infrared sensor)
int val = 0;        // variable for reading the pin status

String ssid = "@purushottam";
String password = "Puru@20010919";

String host = "192.168.130.109";
String path = "/api/ping";
int port = 3000;

WiFiClient client;
HTTPClient http;

bool sense_on = false;
bool sense_off = false;

void setup()
{
    Serial.begin(9600);
    pinMode(LED_BUILTIN, OUTPUT); // declare LED as output
    pinMode(INPUT_PIN, INPUT);    // declare Infrared sensor as input

    connect_to_wifi();
    http.begin(client, host, port, path);
}

void connect_to_wifi()
{
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED)
    {

        digitalWrite(LED_BUILTIN, HIGH); // turn LED OFF
        delay(700);
        digitalWrite(LED_BUILTIN, LOW); // turn LED OFF

        Serial.print(".");
    }

    // wifi_blink_signal();
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void wifi_blink_signal()
{
    while (WiFi.status() == WL_CONNECTED)
    {
        digitalWrite(LED_BUILTIN, LOW);
        delay(1500);
        digitalWrite(LED_BUILTIN, HIGH);
        delay(1500);
    }
}

void ping()
{
    int status_code = http.GET();
    if (status_code != 200)
    {
        ping();
    }
    sense_on = false;
    sense_off = false;
}

void loop()
{

    if (WiFi.status() != WL_CONNECTED)
        connect_to_wifi();

    val = digitalRead(INPUT_PIN); // read input value
    if (val == HIGH)
    { // check if the input is HIGH
        Serial.println("OFF");
        sense_off = true;
    }
    else
    {
        Serial.println("ON");
        sense_on = true;
    }

    if (sense_on == true && sense_off == true)
    {
        ping();
    }

    if (sense_on == true)
    {
        digitalWrite(LED_BUILTIN, HIGH); // turn LED OFF
    }
    else
    {
        digitalWrite(LED_BUILTIN, LOW); // turn LED OFF
    }
    sense_on = false;
}