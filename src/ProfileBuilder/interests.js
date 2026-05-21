import { addStudentIntrests } from "./script.js";

const selectedInterests = [];
let bio_field = "";

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.selection').forEach(function(checkbox) {
        checkbox.addEventListener('click', function(event) {
            checkboxClicked(event, selectedInterests);
        });
    });
});

window.checkboxClicked = function checkboxClicked(event, selectedInterests) {
    const interest = event.target.nextElementSibling.innerText;

    if (event.target.checked) {
        selectedInterests.push(interest);
        console.log(interest + " added to selected interests.");
    } else {
        const index = selectedInterests.indexOf(interest);
        if (index !== -1) {
            selectedInterests.splice(index, 1);
            console.log(interest + " removed from selected interests.");
        }
    }

    console.log("Current selected interests:", selectedInterests);
}

window.submission_check_bio = function submission_check_bio(){
    
    bio_field = document.getElementById("profile_bio").value;

    if (bio_field.length < 1){
        alert("you must enter a bio");
    }
    else{
        if (selectedInterests.length < 1) {
            alert("You must select at least one interest");
            return; 
        }
        else{
            
            addStudentIntrests(bio_field,selectedInterests).then(()=>(window.location.href = "../mainPage/index.html"));
            //getIntrests();
            //window.location.href = "../mainPage/index.html";
        }
    }
}


export function getIntrests(){
    return bio_field,selectedInterests;
}