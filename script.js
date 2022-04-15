import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";

// Your web app's Firebase configuration
const firebaseConfig = { //ตัวแปร basic config
  apiKey: "AIzaSyDUhLWKtCZ9OG-QKnIRsG0IrL5jEo77Sqw",
  authDomain: "hw14-9dbc9.firebaseapp.com",
  databaseURL: "https://hw14-9dbc9-default-rtdb.firebaseio.com",
  projectId: "hw14-9dbc9",
  storageBucket: "hw14-9dbc9.appspot.com",
  messagingSenderId: "1041075986019",
  appId: "1:1041075986019:web:a8569c5a74440a0bd36256"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //เชื่อมโดยบรรทัดนี้ app นี้เป็น obj

import{getDatabase, ref, get, set, child, update, remove, onValue, onChildAdded, onChildChanged, onChildRemoved}
from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
;
const db = getDatabase(); //database คือ db จะใช้ dot fn var ได้
//const เน้นใช้ obj

// // References
var cid = document.getElementById("cid"); //เอาค่าจาก html มาเป็น var
var name = document.getElementById("name");
var password = document.getElementById("password");

var btn_insert = document.getElementById("btn_insert");
var btn_select = document.getElementById("btn_select");
var btn_update = document.getElementById("btn_update");
var btn_delete = document.getElementById("btn_delete");
var btn_all = document.getElementById("btn_all");

//prepare EventListener
btn_insert.addEventListener('click',insertData);
btn_select.addEventListener('click',selectData);
btn_update.addEventListener('click',updateData);
btn_delete.addEventListener('click',deleteData);
btn_all.addEventListener('click',selectAll);

var btn_op = document.getElementById("btn_op");
btn_op.addEventListener('click',firstOpen);

//ทุกโค้ดเน้นใช้ ref เป็น studentID=cid จริงๆจะใช้อย่างอื่นหรือทำหลายกรณีเพื่อให้ฟังก์ชันไม่พังก็ได้

function firstOpen(){ // change value of html using data from database
    // alert("Hello OPEN");
    // adjust function to page2
    // onload doesn't work don't know why

    const dbref = ref(db);
    get(child(dbref,"Customer/"+cid.value)).then((snapshot) =>
    {
        if(snapshot.exists()){
    
            let cus_id = cid.value
            let name = snapshot.val().name;
            let password = snapshot.val().password;
            
            // alert(cus_id+ " " +name+" "+ password)

            document.getElementById("p1").innerHTML = name;
            document.getElementById("p2").innerHTML = password;
        }
        else{
            alert("No data found");
        }
    })
}

// insert function - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function insertData(){
    //set=insert data ต้องการตำแหน่ง ตำแหน่งคือ ref ซึ่งต้องการ obj กับ key และ Customer/+cid.value คือ key
    set(ref(db,"Customer/"+cid.value),{
        name: name.value,
        password: password.value
      
    })
    .then(()=>{ //ใส่ได้ก็รีโหลด
        location.reload(); 
        // alert("data stored successfully");
       
    })
    .catch((error)=>{ //ไม่ได้ก็บอกไม่ได้
        alert("unsccessful, error" + error);
    })
}

// SELECT DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function selectData(){
    
    const dbref = ref(db); //get ก็คือดึงข้อมูลออกมาจาก db
    get(child(dbref,"Customer/"+cid.value)).then((snapshot) =>{ //ถ้ามีให้ดึงข้อมูลออกมา และเก็บไว้ใน snapshot
        if(snapshot.exists()){
    
            let cus_id = cid.value
            let name = snapshot.val().name;
            let password = snapshot.val().password;
            
            // alert(cus_id+ " " +name+" "+ password)
            showIteminList(cus_id, name,password)
        }
        else{
            alert("No data dound");
            
        }
    })
    .catch((error) =>{
        alert("unsuccessful, error"+error);
    });
}

function removeAll(){
    document.getElementById("lists").innerHTML = "";
}
function showIteminList(cid, name,password){
    removeAll()
    addItemToList(cid, name,password)
}
let stdNo = 0;
function addItemToList(cid, name,password){
   
    var ul = document.getElementById('lists');
    var header = document.createElement('h2');

    var _cid = document.createElement('li');
    var _name = document.createElement('li');
    var _password = document.createElement('li');
    
    header.innerHTML = 'Student-'+(++stdNo);



    _cid.innerHTML = 'ID: '+cid;
    _name.innerHTML = 'Name: '+name;
    _password.innerHTML = 'Password: '+password;
   
    ul.appendChild(header);
    ul.appendChild(_cid);
    ul.appendChild(_name);    
    ul.appendChild(_name);
    ul.appendChild(_password);

}

// UPDATE DATA - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function updateData(){
    update(ref(db,"Customer/"+cid.value),{ //use update instead of set
        name: name.value,
        password: password.value,

    })
    .then(()=>{
        // alert("data update successfully");
        location.reload();
        
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

//DELTE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function deleteData(){
    remove(ref(db,"Customer/"+cid.value))
    .then(()=>{
        alert("data delete successfully");
        location.reload();
    })
    .catch((error)=>{
        alert("unsccessful, error" + error);
    })
}

//select all - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
function selectAll(){
    
    const dbRef = ref(db, 'Customer/');
    onValue(dbRef, (snapshot) => { //snapshot มีหลายค่า แล้วลูปปริ้นแต่ละค่าออกมาเป็นชุดๆ ทีละชุด
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;       
            let std_name = childSnapshot.val().name;
            let std_password = childSnapshot.val().password;
           

            addItemToList(childKey, std_name, std_password);
            // window.addEventListener('load',FetchAllData)
        });
    }, {
    onlyOnce: true
    });
    
}