import time
import pyrebase

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from datetime import datetime


cred = credentials.Certificate(
    "teslaultrapro-firebase-adminsdk-61tsw-0d3abe404f.json")

firebase_admin.initialize_app(cred)

db = firestore.client()


# define const value
passWord = "1234"

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


while True:
    currentLine = int(database.child(
        "Database").child("CurrentLine").get().val())

    uploadNewData = db.collection('cardatabase').document(str(currentLine+1))

    userName = str(database.child("Account").child("UserName").get().val())
    encodeData = str(database.child("DataCommunication").child(
        "DataFromArduino").get().val())

    splitData = []
    for num in encodeData:
        splitData.append(num)

    decodeData = []

    if (splitData[1] == '5'):
        decodeData.append("Stop")
    elif (splitData[1] == '4'):
        decodeData.append("Right")
    elif (splitData[1] == '3'):
        decodeData.append("Left")
    elif (splitData[1] == '2'):
        decodeData.append("Back")
    elif (splitData[1] == '1'):
        decodeData.append("Forward")

    if (splitData[2] == '1'):
        decodeData.append("Abyss")
    elif (splitData[2] == '0'):
        decodeData.append("Safe")

    if (splitData[3] == '1'):
        decodeData.append("On")
    elif (splitData[3] == '0'):
        decodeData.append("Off")

    if(len(splitData) == 7):
        decodeData.append(splitData[5]+splitData[6])
    elif(len(splitData) == 6):
        decodeData.append(splitData[5])
    else:
        decodeData.append("Undefined")

    uploadNewData.set({
        'UserName': userName,
        'Direction': decodeData[0],
        'ForwardCollisionWarning': decodeData[3],
        'AbyssForward': decodeData[1],
        'CarLight': decodeData[2],
        'Date': datetime.now().strftime("%m/%d/%Y, %H:%M:%S")
    })

    setNewLine = {
        "CurrentLine": str(currentLine+1)
    }
    database.child("Database").update(setNewLine)

    time.sleep(60)
