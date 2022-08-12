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

var inputPassWord = document.getElementById("password");
var inputUserName = document.getElementById("username"); 
var loginForm = document.getElementById("login-form");
var optionText = document.getElementById("optionText");
var notificationText = document.getElementById("notificationText");

var toControlBtn = document.getElementById("loginControlPage");
var toViewBtn = document.getElementById("loginViewPage");

var password;
var username;
var adminpassword;

toViewBtn.addEventListener('click', function(){
  window.location.href = "/view.html";
});



setInterval(function () {
  get(ref(db, "Account")).then((snapshot) => {
    if (snapshot.exists()) {
      password = snapshot.val().PassWord;
      let serverstatus = snapshot.val().ServerStatus;
      let userincontrolpage = snapshot.val().UserInControlPage;
      username = snapshot.val().UserName;
      adminpassword = snapshot.val().AdminPassWord;
      if(serverstatus == "Off"){
        loginForm.style.display = "none";
        optionText.innerHTML = "The robot car server is now off. Please wait until it is turned on. Or visit the View page!";
      }
      else if(serverstatus == "On" && userincontrolpage == "1"){
        loginForm.style.display = "none";
        optionText.innerHTML = "Someone currently in the Control page, you can only access View page!";
      }
      else if (serverstatus == "On" && userincontrolpage == "0"){
        loginForm.style.display = "block";
        optionText.innerHTML = "Or";
      }
    }
  });
}, 10);


toControlBtn.addEventListener('click',function(){
  if (inputPassWord.value == password){
    update(ref(db, "Account"), {
        AllowAccessControl: "true",
        UserName: inputUserName.value
    })
    window.location.href = "/control.html";
  }
  else if (inputPassWord.value == adminpassword && inputUserName.value == "admin") {
    window.location.href = "/admin.html";
  } // update
  else{
    notificationText.innerHTML = "Wrong password ! Please try again!";
    notificationText.style.color = "red";
  }
});