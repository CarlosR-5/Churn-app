// verificar sesión
let pagina = window.location.pathname;

if(!localStorage.getItem("login") && !pagina.includes("index.html")){
    window.location.href = "index.html";
}

async function registro(){

let user=document.getElementById("regUser").value.trim();
let pass=document.getElementById("regPass").value.trim();

let msg=document.getElementById("registerMsg");

if(user==="" || pass===""){

msg.className="alert alert-danger";
msg.innerText="Complete todos los campos";
msg.classList.remove("d-none");

return;

}

try{

let response = await fetch("/Auth/Register",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({user:user,pass:pass})
});

let result = await response.json();

if(result.success){

msg.className="alert alert-success";
msg.innerText="Usuario registrado correctamente";
msg.classList.remove("d-none");

document.getElementById("regUser").value="";
document.getElementById("regPass").value="";

}else{

msg.className="alert alert-danger";
msg.innerText="No se pudo registrar el usuario";
msg.classList.remove("d-none");

}

}catch(e){

msg.className="alert alert-danger";
msg.innerText="Error del servidor";
msg.classList.remove("d-none");

}

}

async function login(){

let user=document.getElementById("loginUser").value.trim();
let pass=document.getElementById("loginPass").value.trim();

let error=document.getElementById("loginError");

try{

let response = await fetch("/Auth/Login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({user:user,pass:pass})
});

let result = await response.json();

if(result.success){

localStorage.setItem("login",true);

window.location="dashboard.html";

}else{

error.innerText="Usuario o contraseña incorrectos";
error.classList.remove("d-none");

}

}catch(e){

error.innerText="Error del servidor";
error.classList.remove("d-none");

}

}

function logout(){

localStorage.removeItem("login");

fetch("/Auth/Logout");

window.location="index.html";

}