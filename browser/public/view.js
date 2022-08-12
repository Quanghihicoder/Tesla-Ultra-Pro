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


var direction = document.getElementById("direction-content");
var warningText = document.getElementById("warningText");
var warningImg = document.getElementById("warningImg");
var carAbyssForwardText = document.getElementById("carAbyssForwardText");
var carAbyssForwardImg = document.getElementById("carAbyssForwardImg");
var carLightText = document.getElementById("carLightText");
var carLightImg = document.getElementById("carLightImg");
var carKeyText = document.getElementById("carKeyText");
var guideInf = document.getElementById("guideInf");
var linkToControl = document.getElementById("linkToControl");


setInterval(function(){
    get(ref(db, "DataCommunication")).then((snapshot)=>{
        if(snapshot.exists()){
            let data = snapshot.val().DataFromArduino;         
            let arrayData = data.split("");
            if (arrayData[0] == "0"){
                direction.innerHTML = "Actual Car Direction: Stop";
                carKeyText.innerHTML = "Car Key: Lock";
                carAbyssForwardImg.src = "img/warning-3.png";
                carAbyssForwardText.innerHTML = "Abyss Forward: Undefined";
                carLightText.innerHTML = "Auto Car Light: Off";
                carLightImg.src = "img/light-1.png";
                warningText.innerHTML = "Distance Forward: Undefined";
                warningImg.src = "img/warning-2.png";  
            } 
            else if (arrayData[0] == "1"){
                direction.innerHTML = "Actual Car Direction: Stop";
                carKeyText.innerHTML = "Car Key: UnLock";
            }

            if (arrayData[1] == "5"){
                direction.innerHTML = "Actual Car Direction: Stop";
            } 
            else if(arrayData[1] == "1"){
                direction.innerHTML = "Actual Car Direction: Forward";
                
            } 
            else if(arrayData[1] == "2"){
                direction.innerHTML = "Actual Car Direction: Reverse";
                
            } 
            else if(arrayData[1] == "3"){
                direction.innerHTML = "Actual Car Direction: Left";
                
            } 
            else if(arrayData[1] == "4"){
                direction.innerHTML = "Actual Car Direction: Right";
                
            } 

            if (arrayData[2] == "0" && arrayData[0] != "0"){
                carAbyssForwardImg.src = "img/warning-3.png";
                carAbyssForwardText.innerHTML = "Abyss Forward: Safe";
            } 
            else if (arrayData[2] == "1" && arrayData[0] != "0"){
                if(carStartEngine == true){
                    carAbyssForwardImg.src = "img/abyssforward.png";
                    carAbyssForwardText.innerHTML = "Abyss Forward: Danger";
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
            }
        }
    });  
    
    get(ref(db, "Account")).then((snapshot)=>{
        if(snapshot.exists()){
            let status = snapshot.val().UserInControlPage;
            if (status == "0"){
                guideInf.innerHTML = "No one in the control page, access this link to join: ";
                linkToControl.style.display = "block";
            }
            else{
                guideInf.innerHTML = "This is the viewing page, someone is currently on the control page, you can't log in now";
                linkToControl.style.display = "none";
            }
        }
    });
},10);