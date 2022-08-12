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

function WriteStatusData(data) {
    update(ref(db, "Account"), {
        UserInControlPage: data
    })
}

function CheckLogin(){
    get(ref(db, "Account")).then((snapshot)=>{
        if(snapshot.exists()){
            if (snapshot.val().UserInControlPage == "1"){
                window.location.href = "/index.html";
            }
            else if (snapshot.val().UserInControlPage == "0"){
                WriteStatusData("1");
            }
        }
    });
}
CheckLogin();