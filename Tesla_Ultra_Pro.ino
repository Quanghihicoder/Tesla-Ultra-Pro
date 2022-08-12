#include <Servo.h>
#include <NewPing.h>
#include <IRremote.h>

#define UNLOCK 16736925 // 2
#define LOCK 16754775   // 8
#define RECV_PIN 3
IRrecv irrecv(RECV_PIN);
decode_results results;
unsigned long val;

unsigned long previousMillis = 0;
const long interval = 500;

#define IN1 8  // Left wheel forward
#define IN2 9  // Left wheel reverse
#define IN3 10 // Right wheel reverse
#define IN4 11 // Right wheel forward

#define ECHO_PIN A1 
#define TRIG_PIN A2

#define AF digitalRead(5) // Abyss forward

#define LT digitalRead(7) // Light sensor


#define LWF digitalRead(8)
#define LWR digitalRead(9)
#define RWR digitalRead(10)
#define RWF digitalRead(11)

#define max_distance 150
bool carUnlock = false;
int distance = 0;

#define LED 1
Servo myservo;
NewPing sonar(TRIG_PIN, ECHO_PIN, max_distance);

void forward()
{
  myservo.write(90);
  delay(500);
  distance = readPing();
  if (distance >= 20)
  {
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);
  }
}

void back()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, HIGH);
  digitalWrite(IN3, HIGH);
  digitalWrite(IN4, LOW);
}

void left()
{
  myservo.write(165);
  delay(500);
  distance = readPing();
  if (distance >= 20)
  {
    digitalWrite(IN1, HIGH);
    digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, LOW);
  }
}

void right()
{
  myservo.write(15);
  delay(500);
  distance = readPing();
  if (distance >= 20)
  {
    digitalWrite(IN1, LOW);
    digitalWrite(IN2, LOW);
    digitalWrite(IN3, LOW);
    digitalWrite(IN4, HIGH);
  }
}

void stopcar()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
}

void stopcarButCanBack()
{
  digitalWrite(IN1, LOW);
  digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW);
  digitalWrite(IN4, LOW);
  if (Serial.available())
  {
    String data = Serial.readStringUntil('\n');
    if (data == "b")
    {
      back();
      delay(700);
    }
  }
}

void unLockCar()
{
  if (irrecv.decode(&results))
  {
    val = results.value;
    irrecv.resume();
    if (LWF == LOW and LWR == LOW and RWR == LOW and RWF == LOW){
    switch (val)
    {
    case UNLOCK:
      carUnlock = true;
      stopcar();
      break;
    case LOCK:
      carUnlock = false;
      stopcar();
      break;
    default:
      break;
    }
    }
  }
}

int readPing()
{
  int cm = sonar.ping_cm();
  if (cm == 0)
  {
    cm = 150;
  }
  return cm;
}

int avoidCollision()
{
  distance = readPing();
  if (distance > 100)
  {
    return 0; // safe - green
  }
  else if ((100 > distance) && (distance > 20) )
  {
    return 1; // yellow
  }
  else if (distance <= 20)
  {
    return 2; // red
  }
  
}

void autoTurnOnLed(){
  if (LT == HIGH){
    digitalWrite(4,HIGH);  
  }  
  else{
    digitalWrite(4,LOW);  
  }
}

void currentData()
{
  String result;

  if (carUnlock == true)
  {
    result += "1";
  }
  else
  {
    result += "0";
  }

  if (LWF == HIGH and LWR == LOW and RWR == LOW and RWF == HIGH)
  {
    result += "1";
  } // forward
  if (LWF == LOW and LWR == HIGH and RWR == HIGH and RWF == LOW)
  {
    result += "2";
  } // back
  if (LWF == HIGH and LWR == LOW and RWR == LOW and RWF == LOW)
  {
    result += "3";
  } // left
  if (LWF == LOW and LWR == LOW and RWR == LOW and RWF == HIGH)
  {
    result += "4";
  } // right
  if (LWF == LOW and LWR == LOW and RWR == LOW and RWF == LOW)
  {
    result += "5";
  } // stop

  if (AF == HIGH)
  {
    result += "1";
  }
  else
  {
    result += "0";
  }

  if (LT == HIGH)
  {
    result += "1";
  }
  else
  {
    result += "0";
  }

  int lval = avoidCollision();
  if (lval == 0)
  {
    result += "0";
  }
  else if (lval == 1)
  {
    result += "1";
    distance = readPing();
    result += String(distance);
  }
  else if (lval == 2)
  {
    result += "2";
    distance = readPing();
    result += String(distance);
  }

  Serial.println(result);
}

void setup()
{
  Serial.begin(9600);
  pinMode(IN1, OUTPUT);
  pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT);
  pinMode(IN4, OUTPUT);
  stopcar();

  irrecv.enableIRIn();
  pinMode(AF, INPUT);
  
  pinMode(LT, INPUT);
  pinMode(4, OUTPUT);
  digitalWrite(4,LOW);
  
  myservo.attach(12);
  myservo.write(90);

  
}

void loop()
{ 
  unLockCar();

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval)
  {
    currentData();
    previousMillis = currentMillis;
  }

  if (carUnlock == true)
  {
    autoTurnOnLed();
    distance = readPing();
    if (distance <= 20)
    {
      stopcarButCanBack();
    }

    if(AF == HIGH){
      stopcarButCanBack();
    }

    if (Serial.available())
    {
      String data = Serial.readStringUntil('\n');
      if (data == "f")
      {
        forward();
      }
      if (data == "r")
      {
        right();
      }
      if (data == "l")
      {
        left();
      }
      if (data == "b")
      {
        back();
      }
      if (data == "s")
      {
        stopcar();
      }
    }
  }
  else
  {
    stopcar();
  }
}
