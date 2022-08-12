// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, get } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-database.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.9/firebase-firestore.js";

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
const fs = getFirestore();

const tableBody = document.getElementById("table-body");
let reloadBtn = document.getElementById("reload-btn");

reloadBtn.addEventListener('click',function(){
    tableBody.innerHTML = "";
    updateTable();

});

async function updateTable(){ 
    let querySnapshot = await getDocs(collection(fs, "cardatabase"));

    get(ref(db, "Database")).then((snapshot)=>{
        if(snapshot.exists()){
            var cLine = parseInt(snapshot.val().CurrentLine);  
            querySnapshot.forEach((doc) => {
                if (doc.id == cLine){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 1 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 2 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 3 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 4 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 5 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 6 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 7 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 8 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
                else if (doc.id == cLine - 9 ){
                    tableBody.insertAdjacentHTML('beforeend',
                    '<tr><td>'+doc.id+'</td><td>'+doc.data().UserName+'</td><td>'+doc.data().Direction+'</td><td>'+doc.data().ForwardCollisionWarning+'</td><td>'+doc.data().AbyssForward+'</td><td>'+doc.data().CarLight+'</td><td>'+doc.data().Date+'</td></tr>'); 
                }
            });   
        }
    });    
}

updateTable();

//////////////////////////

let forceLogoutText = document.getElementById("forceLogout-text");
let adminpasswordForce = document.getElementById("adminpassword-force");
let forceLogoutBtn = document.getElementById("forceLogout-btn");

let formNoti = document.getElementById("form-noti");
let adminpassword = document.getElementById("adminpassword");
let oldpassword = document.getElementById("oldpassword");
let newpassword= document.getElementById("newpassword");
let changepasswordBtn = document.getElementById("submit-btn");

let warningForce = document.getElementById("warning-force");
let warningChange = document.getElementById("warning-change");

var adminpass;
var controlpass;

setInterval(function () {
  get(ref(db, "Account")).then((snapshot) => {
    if (snapshot.exists()) {
      controlpass = snapshot.val().PassWord;
      adminpass = snapshot.val().AdminPassWord;
      let userincontrolpage = snapshot.val().UserInControlPage;
      let username = snapshot.val().UserName;
      
      if(userincontrolpage == "1"){
        adminpasswordForce.style.display = "block";
        forceLogoutBtn.style.display = "block";
        forceLogoutText.innerHTML = username + " is currently in the Control page";
      }
      else if (userincontrolpage == "0"){
        adminpasswordForce.style.display = "none";
        forceLogoutBtn.style.display = "none";
        forceLogoutText.innerHTML = "No one" + " is currently in the Control page";
      }
    }
  });
}, 10);

forceLogoutBtn.addEventListener('click', function(){
  if (adminpasswordForce.value == adminpass){
    update(ref(db, "Account"), {
        AllowAccessControl: "false"
    })
    warningForce.style.display = "block";
    warningForce.innerHTML = "Force Logout Success!";
    warningForce.style.color = "green";
    adminpasswordForce.value = "";
  }else{
    warningForce.style.display = "block";
    warningForce.innerHTML = "Wrong admin password! Please try again!";
    warningForce.style.color = "red";
  }
});


changepasswordBtn.addEventListener('click', function(){
  if (adminpassword.value == adminpass && oldpassword.value == controlpass){
    update(ref(db, "Account"), {
        PassWord: newpassword.value.toString()
    })
    warningChange.style.display = "block";
    warningChange.innerHTML = "Change Success!";
    warningChange.style.color = "green";
    adminpassword.value = "";
    oldpassword.value = "";
  }
  else{
    warningChange.style.display = "block";
    warningChange.innerHTML = "Wrong admin or control password! Please try again!";
    warningChange.style.color = "red";
  }

});

