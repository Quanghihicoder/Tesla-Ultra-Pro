// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBnNBRE1CL7G0Oc_C7_TRAsh2dbryTJpUM",
    authDomain: "teslaultrapro.firebaseapp.com",
    databaseURL: "https://teslaultrapro-default-rtdb.firebaseio.com",
    projectId: "teslaultrapro",
    storageBucket: "teslaultrapro.appspot.com",
    messagingSenderId: "1075156788846",
    appId: "1:1075156788846:web:5b834db7a333a877e0a87f",
    measurementId: "G-GMQM9NXXZZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

var controlmodeBtn = document.getElementById("control-mode-btn");
var steeringmodeBtn = document.getElementById("steering-mode-btn");
var voicemodeBtn = document.getElementById("voice-mode-btn");
var controlMode = document.getElementById("control-mode");
var steeringMode = document.getElementById("steering-mode");
var voiceMode = document.getElementById("voice-mode");
let inSteeringMode = false;

controlmodeBtn.addEventListener('click', function(){
    controlMode.style.display = "block";
    steeringMode.style.display = "none";
    voiceMode.style.display = "none";
    gear.style.display = "block";
    gearD.style.display = "block";
    gearR.style.display = "block";
    texts.innerHTML = "";
    WriteControlData("s");
    inSteeringMode = false;
});


steeringmodeBtn.addEventListener('click', function(){
    controlMode.style.display = "none";
    steeringMode.style.display = "block";
    voiceMode.style.display = "none";
    gear.style.display = "block";
    gearD.style.display = "block";
    gearR.style.display = "block";
    texts.innerHTML = "";
    WriteControlData("s");
    inSteeringMode = true;
});

voicemodeBtn.addEventListener('click', function(){
    controlMode.style.display = "none";
    steeringMode.style.display = "none";
    voiceMode.style.display = "block";
    gear.style.display = "none";
    gearD.style.display = "none";
    gearR.style.display = "none";
    texts.innerHTML = "";
    WriteControlData("s");
    insteeringMode = false;
});
    
var forwardBtn = document.getElementById("Forwardbtn");
var leftBtn = document.getElementById("Leftbtn");
var stopBtn = document.getElementById("Stopbtn");
var rightBtn = document.getElementById("Rightbtn");
var backBtn = document.getElementById("Backbtn");

let ableToStartEngine = false;
let carStartEngine = false;
let modeGearD = true;
let carStop = false;


function WriteControlData(data) {
    update(ref(db, "DataCommunication"), {
        DataFromUser: data
    })
}

forwardBtn.addEventListener('click', function(){
    if (carStartEngine == true && modeGearD == true){
        WriteControlData("f");
    }
});

leftBtn.addEventListener('click', function(){
    if (carStartEngine == true && modeGearD == true){
        WriteControlData("l");
    }
});
stopBtn.addEventListener('click', function(){
    WriteControlData("s");
});
rightBtn.addEventListener('click', function(){
    if (carStartEngine == true && modeGearD == true){
        WriteControlData("r");
    }
});
backBtn.addEventListener('click', function(){
    if (carStartEngine == true && modeGearD == false){
        WriteControlData("b");
    }
});

CheckLogin();
WriteControlData("s");

var direction = document.getElementById("direction-content");
var warningText = document.getElementById("warningText");
var warningImg = document.getElementById("warningImg");
var carAbyssForwardText = document.getElementById("carAbyssForwardText");
var carAbyssForwardImg = document.getElementById("carAbyssForwardImg");
var carLightText = document.getElementById("carLightText");
var carLightImg = document.getElementById("carLightImg");
var gear = document.getElementById("gear");
var gearD = document.getElementById("gearD");
var gearR = document.getElementById("gearR");
var engineText = document.getElementById("engineText");
var engineImg = document.getElementById("engineImg");
var carKeyText = document.getElementById("carKeyText");
var guideInf = document.getElementById("guideInf");

// You can not use while(true) here, 
// I spend more than 4hours to find the way that "act" like while(true)
// Basically, its loop the function after 0s 
// and human eyes recognize it as while(true)  
setInterval(function(){
    get(ref(db, "DataCommunication")).then((snapshot)=>{
        if(snapshot.exists()){
            let data = snapshot.val().DataFromArduino;         
            let arrayData = data.split("");
            if (arrayData[0] == "0"){
                direction.innerHTML = "Actual Car Direction: Stop";
                WriteControlData("s");
                carKeyText.innerHTML = "Car Key: Lock";
                guideInf.style.display = "block";
                ableToStartEngine = false;
                guideInf.innerHTML = "Please use IR remote control, press '2' to unlock the car";
                // force turn off engine
                engineImg.src = "img/startengine-1.png";
                engineText.innerHTML = "Engine: Off";
                carStartEngine = false;
                carAbyssForwardImg.src = "img/warning-3.png";
                carAbyssForwardText.innerHTML = "Abyss Forward: Undefined";
                carLightText.innerHTML = "Auto Car Light: Off";
                carLightImg.src = "img/light-1.png";
                warningText.innerHTML = "Distance Forward: Undefined";
                warningImg.src = "img/warning-2.png";  
                texts.innerHTML = "";

            } 
            else if (arrayData[0] == "1"){
                direction.innerHTML = "Actual Car Direction: Stop";
                carKeyText.innerHTML = "Car Key: UnLock";
                ableToStartEngine = true;
                if (carStartEngine == false){
                    guideInf.innerHTML = "Click 'Start Engine' to start the car, or press '8' to lock the car";
                    guideInf.style.display = "block";
                }
                else {
                    guideInf.style.display = "none";
                }
            }

            if (arrayData[1] == "5"){
                direction.innerHTML = "Actual Car Direction: Stop";
                carStop = true;
            } 
            else if(arrayData[1] == "1"){
                direction.innerHTML = "Actual Car Direction: Forward";
                carStop = false;
            } 
            else if(arrayData[1] == "2"){
                direction.innerHTML = "Actual Car Direction: Reverse";
                carStop = false;
            } 
            else if(arrayData[1] == "3"){
                direction.innerHTML = "Actual Car Direction: Left";
                carStop = false;
            } 
            else if(arrayData[1] == "4"){
                direction.innerHTML = "Actual Car Direction: Right";
                carStop = false;
            } 

            if (arrayData[2] == "0" && arrayData[0] != "0"){
                carAbyssForwardImg.src = "img/warning-3.png";
                carAbyssForwardText.innerHTML = "Abyss Forward: Safe";
            } 
            else if (arrayData[2] == "1" && arrayData[0] != "0"){
                if(carStartEngine == true){
                    carAbyssForwardImg.src = "img/abyssforward.png";
                    carAbyssForwardText.innerHTML = "Abyss Forward: Danger";
                    if (carStartEngine == true){
                        guideInf.innerHTML = "There is an abyss in front of your car, you can only go back";
                        guideInf.style.display = "block";
                    }
                }
            }

            if (arrayData[3] == "0" && arrayData[0] != "0"){
                carLightText.innerHTML = "Auto Car Light: Off";
                carLightImg.src = "img/light-1.png";
            } 
            else if(arrayData[3] == "1" && arrayData[0] != "0"){
                carLightText.innerHTML = "Auto Car Light: On";
                carLightImg.src = "img/light-2.png";
            }

            if (arrayData[4] == "0" && arrayData[0] != "0"){
                warningText.innerHTML = "Distance Forward: Safe";
                warningImg.src = "img/warning-3.png";
            } 
            else if (arrayData[4] == "1" && arrayData[0] != "0"){
                warningText.innerHTML = "Distance Forward: " + arrayData[5] + arrayData[6] + " cm";
                warningImg.src = "img/warning-1.png";
            }
            else if (arrayData[4] == "2" && arrayData[0] != "0"){
                if (arrayData[6]){
                    warningText.innerHTML = "Distance Forward: " + arrayData[5] + arrayData[6] + " cm";
                    warningImg.src = "img/warning-2.png";
                }else {
                    warningText.innerHTML = "Distance Forward: " + arrayData[5] + " cm";
                    warningImg.src = "img/warning-2.png";
                }
                if (carStartEngine == true){
                    guideInf.innerHTML = "There is something in front of your car, you can only go back";
                    guideInf.style.display = "block";
                }
            }
        }
    }); 
    get(ref(db, "Account")).then((snapshot)=>{
        if(snapshot.exists()){
            if (snapshot.val().AllowAccessControl == "false"){
                window.location.href = "/view.html";
            }
            else if (snapshot.val().ServerStatus == "Off"){
                window.location.href = "/view.html";
            }
        }
    });
},1);


gear.addEventListener('click', function(){
    WriteControlData("s");
    if (carStartEngine == true){
        if (gearD.style.color == "red"){
            gearR.style.color = "red";
            gearD.style.color = "white";
            modeGearD = false;
        }
        else{
            gearD.style.color = "red";
            gearR.style.color = "White";
            modeGearD = true;
        }
    }
});

engineImg.addEventListener('click', function(){
    if (ableToStartEngine == true){
        if (carStartEngine == false ){
            engineImg.src = "img/startengine-2.png";
            engineText.innerHTML = "Engine: On";
            carStartEngine = true;
            var startEngineSound = new Audio("sound/car-engine-starting-sound-effect.mp3");
            startEngineSound.loop = false;
            startEngineSound.play();
        }
        else{
            if(carStop == true){
            engineImg.src = "img/startengine-1.png";
            engineText.innerHTML = "Engine: Off";
            carStartEngine = false;
            carAbyssForwardImg.src = "img/warning-3.png";
            carAbyssForwardText.innerHTML = "Abyss Forward: Undefined";
            texts.innerHTML = "";
            WriteControlData("s");
            }
        }
    }  
});

function CheckLogin(){
    get(ref(db, "Account")).then((snapshot)=>{
        if(snapshot.exists()){
            if (snapshot.val().UserInControlPage == "1"){
                window.location.href = "/view.html";
            }
            else if (snapshot.val().UserInControlPage == "0"){
                WriteStatusData("1");
            }
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////
const texts = document.querySelector(".texts");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");

var possibleInput = ["forward","right","left","stop","reverse", "creator", "nice", "hello"];
var expectedOutput = ["Going Forward!", "Going Right!", "Going Left!", "Stop!", "Going Reverse!","The creator is Quang","Thank you!","Hi, Welcome User!"]

recognition.addEventListener("result", (e) => {
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  p.innerText = text;
  if (e.results[0].isFinal) {
    for (var i = 0; i < possibleInput.length; i++) {
        if (text.toLowerCase().includes(possibleInput[i])) {
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = expectedOutput[i];
            texts.appendChild(p);
            if (i==0){
                WriteControlData("f");
            }
            else if (i==1){
                WriteControlData("r");
            }
            else if (i==2){
                WriteControlData("l");
            }
            else if (i==3){
                WriteControlData("s");
            }
            else if (i==4){
                WriteControlData("b");
            }
            else{
                WriteControlData("s");
            }
            break;
        }
        if (i == possibleInput.length -1){
            p = document.createElement("p");
            p.classList.add("replay");
            p.innerText = "Try again!";
            texts.appendChild(p);
        }
    }  
    p = document.createElement("p");
  }
});

recognition.addEventListener("end", () => {
  recognition.end();
});

var recordbtn = document.getElementById("record-btn");
recordbtn.addEventListener('click', function(){
  texts.innerHTML = "";
  if(carStartEngine==true) {
    recognition.start();
  }
    
});

//////////////////////////////////////////////////////////////////////////////////////////////
 
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

videoElement.style.display = "none";
const yourControl = document.getElementById("yourControl");

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
    results.image, 0, 0, canvasElement.width, canvasElement.height);
    if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,{ color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 }); 
        }

        ////
        if (inSteeringMode == true){    
        if (Object.keys(results.multiHandLandmarks).length == 2) {
            console.log(results.multiHandLandmarks[0][0].y);
            console.log(results.multiHandLandmarks[1][0].y);

            if ((results.multiHandLandmarks[0][8].y > results.multiHandLandmarks[0][6].y) 
            && (results.multiHandLandmarks[0][12].y > results.multiHandLandmarks[0][10].y)
            && (results.multiHandLandmarks[0][16].y > results.multiHandLandmarks[0][14].y)
            && (results.multiHandLandmarks[0][20].y > results.multiHandLandmarks[0][18].y)
            && (results.multiHandLandmarks[1][8].y > results.multiHandLandmarks[1][6].y)
            && (results.multiHandLandmarks[1][12].y > results.multiHandLandmarks[1][10].y)
            && (results.multiHandLandmarks[1][16].y > results.multiHandLandmarks[1][14].y)
            && (results.multiHandLandmarks[1][20].y > results.multiHandLandmarks[1][18].y)) {
                if ((results.multiHandLandmarks[0][0].y - results.multiHandLandmarks[1][0].y) > 0.2) {
                    if (carStartEngine == true && modeGearD == true && inSteeringMode == true ){
                        yourControl.innerHTML = "Your Control: Left";
                        WriteControlData("l");
                    }
                }
                else if ((results.multiHandLandmarks[0][0].y - results.multiHandLandmarks[1][0].y) < (-0.2)) {
                    if (carStartEngine == true && modeGearD == true && inSteeringMode == true){
                        yourControl.innerHTML = "Your Control: Right";
                        WriteControlData("r");
                    }
                }
                else if ((-0.2) < (results.multiHandLandmarks[0][0].y - results.multiHandLandmarks[1][0].y) && (results.multiHandLandmarks[0][0].y - results.multiHandLandmarks[1][0].y) < 0.2) {
                    if (carStartEngine == true && modeGearD == true && inSteeringMode == true){
                        yourControl.innerHTML = "Your Control: Forward";
                        WriteControlData("f");
                    }
                    if (carStartEngine == true && modeGearD == false && inSteeringMode == true){
                        yourControl.innerHTML = "Your Control: Reverse";
                        WriteControlData("b");
                    }
                }
            }
            else{
                if (carStartEngine == true && inSteeringMode == true){
                    yourControl.innerHTML = "Your Control: Stop";
                    WriteControlData("s");
                }  
            }
        }
        else {
            yourControl.innerHTML = "Your Control: Stop";
            WriteControlData("s");
        }
        }
    }
    canvasCtx.restore();
}

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
});
hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});

hands.onResults(onResults);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});

camera.start();


////////////////////////////////
function WriteStatusData(data) {
    update(ref(db, "Account"), {
        UserInControlPage: data
    })
}


window.addEventListener("beforeunload", function (e) {
    WriteStatusData('0');
});












// Reference:
// https://stackoverflow.com/questions/14840527/whiletrue-vs-setintervalfunction-0 // Super Useful
// https://www.freesoundslibrary.com/car-engine-starting-idling-sound-effect/#google_vignette
// https://github.com/nicolaspanel/numjs