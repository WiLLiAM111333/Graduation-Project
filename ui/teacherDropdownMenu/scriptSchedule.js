var dropDownMenuTeachersContent = document.getElementById("dropdown-teachers-content");
var selectedTeacher = document.getElementById("selected-teacher");
var mainEl = document.getElementsByTagName("main");
var selectedschedule = document.getElementById("selected-teacher-schedule");
var scheduleDropdownContent = document.getElementById("dropdown-teachers-content");
var teacherNamesContainer = document.getElementById("teacher-names-container");

var searchboxOldInput = "";

let teachers = ["Alle Ahmed Abdulwahid (AAB)", "Karin", "Monika", "Stefan", "Anders"];

let currentTeachers = teachers;

let removedTeachers = [];

// Sorterar lärarna i alhpabetisk ordning
teachers.sort();

// Skriver ut alla lärares namn i drop down menyn när den är aktiv
loadTeacherNames();
function loadTeacherNames(){

    if(currentTeachers.length > 0){
        teacherNamesContainer.innerHTML = "";
        for(var i = 0; i < currentTeachers.length; i++){
            teacherNamesContainer.innerHTML += "<p onclick='loadschedule(" + '"' + teachers[i] + '"' + ")'>" + teachers[i] + "</p>";
        }
    }

    else{
        teacherNamesContainer.innerHTML = "<p>Inga resultat hittades.</p>";
    }


}


// Laddar in vald lärares schema
function loadschedule(inputValue){
    selectedTeacher.innerHTML = inputValue;

    selectedschedule.src = "assets/schedules/" + 
    inputValue.slice(inputValue.indexOf('(') + 1, inputValue.lastIndexOf(')')) + ".jpg";
    selectedschedule.style.display = "block";

    scheduleDropdownContent.style.cssText = "display: none;";
}

function toggleTeacherDropdownContent(){ 
    if(scheduleDropdownContent.style.display == "block"){ scheduleDropdownContent.style.cssText = "display: none;"; }
    else{ scheduleDropdownContent.style.display = "block"; }
}

// Filtrerar sök resultatet efter vad som finns i sök rutan
function searchInput(input){

    if(searchboxOldInput.length > input.length && removedTeachers.length > 0){
        for(a = 0; a < removedTeachers.length; a++){

            if(removedTeachers[a].substring(0, input.length).toUpperCase() == input.toUpperCase()){

                currentTeachers[currentTeachers.length] = removedTeachers[a];
                
                removedTeachers.splice(a, 1);

                a--;
            }

        }
        currentTeachers.sort();
    }

    // Loopar igenom alla lärares namn som finns just nu
    for(i = 0; i < currentTeachers.length; i++){

        if(currentTeachers[i].substring(0, input.length).toUpperCase() != input.toUpperCase()){

            removedTeachers[removedTeachers.length] = currentTeachers[i];
            
            currentTeachers.splice(i, 1);

            i--;
        }
    }
    loadTeacherNames();
    searchboxOldInput = input;
}

