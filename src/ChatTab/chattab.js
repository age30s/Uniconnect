import { getSocket } from '/websocket.js';
import { getDBObject } from "../Profiles/firebase.js";

const socket = getSocket();

export function openNav() {
    console.log('CHATTAB.JS is loaded!');

    document.getElementById("mySidebar").style.width = "250px";

    const closeBtn = document.createElement("a");
    closeBtn.href = "javascript:void(0)";
    closeBtn.className = "closebtn";
    closeBtn.innerHTML = "&times;"; // Adds the "×" character

    // Optionally, add an event listener to handle the click event
    closeBtn.addEventListener("click", closeNav);
    const sb = document.getElementById("mySidebar");
    sb.appendChild(closeBtn);

    let studentId = sessionStorage.getItem("uid");
    console.log("rendering friends of user " + studentId);

    getDBObject("students", studentId).then(data => {
        data.friends.forEach(friend => {
            getDBObject("students", friend).then(data =>{
                var friendDiv = document.createElement('div');
                friendDiv.className = 'chat-ppl';
                // friendDiv.onclick = openForm(data.name);
                friendDiv.addEventListener('click', () => openForm(data.name));

                var img = document.createElement('img');
                img.src = "../Profile_Builder/profile_pic.jpg"
                
                var spanClass = document.createElement('span');
                spanClass.textContent = data.name;
                spanClass.className = "chat-name";

                friendDiv.appendChild(img);
                friendDiv.appendChild(spanClass);

                //const sidebarElement = document.getElementById("mySidebar");
                if (!sb) {
                    console.error("Element with ID 'mySideBar' does not exist");
                }
                sb.appendChild(friendDiv);
            });             
        });
    });

    document.querySelector(".closebtn").style.visibility = "visible";
    document.querySelector(".closebtn").style.display = "block";
    document.querySelector(".closebtn").addEventListener('click',closeNav);
}
  
export function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    const myDiv = document.getElementsByClassName("sidebar")[0]; // Access the first matching element
    if (myDiv) {
        while (myDiv) {
            myDiv.removeChild(myDiv.firstChild);
        }
    }
    // document.querySelector(".closebtn").style.display = "none";
}

export function openForm(name) {

    // pull from server 

    // get userid -> find the mapped student in DB, grab list of friends and make a new div for each student
    console.log("hit");
    document.getElementById("chat-rec-name").textContent = name;
    // dont clear if from serverlist there is msgs
    const myDiv = document.getElementsByClassName("scrollable-chat")[0]; // Access the first matching element
    if (myDiv) {
        while (myDiv.firstChild) {
            myDiv.removeChild(myDiv.firstChild);
        }
    }

    document.getElementById("myForm").style.display = "block";

    document.getElementById('sendbt').addEventListener('click', appendMsg);
    document.getElementById('closebt').addEventListener('click', closeForm);
    // <img src="../Profile_Builder/profile_pic.jpg" alt="Avatar">
    //<span class="chat-name">John</span>
}
  
export function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

export function appendMsg(){
    var text = document.getElementById("msg").value;

    socket.send(text); // Send message to WebSocket server
    document.getElementById("msg").value = ""; // Clear the input field
  
    var msgNew = document.createElement('div');
    msgNew.textContent = text;
    msgNew.className = "container darker";
    
    var img = document.createElement('img');
    img.src = "../Profile_Builder/profile_pic.jpg"
    
    msgNew.appendChild(img);

    const time = new Date();
    let [hour, minutes, seconds] = [
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
    ];
    
    if (hour > 12){
        hour = hour - 12;
    }

    var timestamp = document.createElement('span');
    const paddedMinutes = String(minutes).padStart(2, '0');
    timestamp.textContent = hour + ":" + paddedMinutes;
    timestamp.className = "time-right";

    msgNew.appendChild(timestamp);
    
    document.getElementsByClassName("scrollable-chat")[0].appendChild(msgNew);
}

function addIncMsg(event){
    var msgNew = document.createElement('div');
    msgNew.textContent = event.toString();
    console.log("user reci " + event.toString() );
    msgNew.className = "container";
    
    var img = document.createElement('img');
    img.src = "../Profile_Builder/profile_pic.jpg"
    
    msgNew.appendChild(img);

    const time = new Date();
    let [hour, minutes, seconds] = [
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
    ];
    
    if (hour > 12){
        hour = hour - 12;
    }

    var timestamp = document.createElement('span');
    const paddedMinutes = String(minutes).padStart(2, '0');
    timestamp.textContent = hour + ":" + paddedMinutes;
    timestamp.className = "time-right";

    msgNew.appendChild(timestamp);

    document.getElementsByClassName("scrollable-chat")[0].appendChild(msgNew);
}

socket.addEventListener("message", (event) => {
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
        const text = reader.result; // Get the text from the Blob
        addIncMsg(text);
        };

        reader.onerror = () => {
            console.error("Error reading Blob data:", reader.error);
        };

        reader.readAsText(event.data);
    }
});

//U987
//U456