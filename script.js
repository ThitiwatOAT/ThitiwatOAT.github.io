function TEST(){
    var inpName = document.getElementById("name").value;
    var inpPass = document.getElementById("password").value;
    
    console.log("hello");
    console.log("name is",inpName);
    console.log("pass is",inpPass);
}

function send(){
    var inpName = document.getElementById("name").value;
    var inpPass = document.getElementById("password").value;

    localStorage.setItem("name",inpName);
    localStorage.setItem("pass",inpPass);
}

function firstOpen(){
    alert("Your name is "+localStorage.getItem("name")+". Your password is "+localStorage.getItem("pass")+".");
    alert("Read text below before close this alert");

    document.getElementById("p1").innerHTML = localStorage.getItem("name")
    document.getElementById("p2").innerHTML = localStorage.getItem("pass")
}

function claer(){
    localStorage.clear;
}