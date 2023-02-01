let socket = io();
let name = prompt('cual es tu nombre')

const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(input.value){
        socket.emit('chat',{name:name,message:input.value});
        input.value =''
    }
});

socket.on('chat',(msg)=>{
    let ulis = document.getElementById("messageLG");
    let message = "";
    msg.forEach(elem => {
        message += `
        <li class="list-group-item">${elem.name}: ${elem.message}</li>
        `
    });
    ulis.innerHTML = message;
});

function firstLoad(){
    let ulis = document.getElementById("messageLG");
    fetch("/messages")
    .then((response) => {
        return response.json();
    })
    .then((data)=>{
        let message = "";
        data.forEach((elem)=>{
            message += `
        <li class="list-group-item">${elem.name}: ${elem.message}</li>
        `
        });
        ulis.innerHTML = message;
    })
};

firstLoad();