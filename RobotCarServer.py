# install: pip install requests
# install: pip install pyrebase
# tutorial: https://www.youtube.com/watch?v=DCaH4bQ4DxA

# install: pip install pyserial
# https://www.youtube.com/watch?v=Lm_xfm1d5h0

from asyncio.windows_events import NULL
from copy import copy
from charset_normalizer import from_bytes
import pyrebase
import serial
import time
import keyboard

# init serial port
serialPort = serial.Serial(port='COM5', baudrate=9600)

# init cloud
firebaseConfig = {
    "apiKey": "AIzaSyBnNBRE1CL7G0Oc_C7_TRAsh2dbryTJpUM",
    "authDomain": "teslaultrapro.firebaseapp.com",
    "databaseURL": "https://teslaultrapro-default-rtdb.firebaseio.com",
    "projectId": "teslaultrapro",
    "storageBucket": "teslaultrapro.appspot.com",
    "messagingSenderId": "1075156788846",
    "appId": "1:1075156788846:web:5b834db7a333a877e0a87f",
    "measurementId": "G-GMQM9NXXZZ"
}

firebase = pyrebase.initialize_app(firebaseConfig)
database = firebase.database()


def sendOffData():
    data = {
        "DataFromArduino": "05002",
        "DataFromUser": "s"
    }
    database.child("DataCommunication").update(data)
    data2 = {
        "ServerStatus": "Off"
    }
    database.child("Account").update(data2)


def sendDataToCloud(dataFromArduino):
    data = {
        "DataFromArduino": dataFromArduino
    }
    database.child("DataCommunication").update(data)


def setAccount():
    data = {
        "ServerStatus": "On"
    }
    database.child("Account").update(data)


def sendDataToArduino():
    data = str(database.child("DataCommunication").child(
        "DataFromUser").get().val())
    if data == "f":
        serialPort.write(data.encode())
    if data == "l":
        serialPort.write(data.encode())
    if data == "r":
        serialPort.write(data.encode())
    if data == "b":
        serialPort.write(data.encode())
    if data == "s":
        serialPort.write(data.encode())
    return data


def readDataFromArduino():
    line = serialPort.readline().decode("utf-8")
    for number in line.split():
        return number


def main():
    while(True):
        data_from_arduino = readDataFromArduino()
        sendDataToArduino()
        sendDataToCloud(data_from_arduino)
        if keyboard.is_pressed('z'):
            sendOffData()
            break
        else:
            continue


setAccount()
print("The developer's browser is Microsoft Edge")
print("Use a 15.6-inch laptop for a better experience")
print("Access this link to login: https://teslaultrapro.web.app/")
main()
