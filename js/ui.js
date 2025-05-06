// logic to dynamically update the UI
import { habitsArray, addNewHabit, getAllHabits } from "./storage.js";



let habitsGrid = document.querySelector(".habits-grid")
let noHabitsText = document.querySelector(".no-habits-text")

// Modal functionality
let habitTitleInput = document.getElementById("habitTitle")
let descriptionInput = document.getElementById("description")
let startTimeInput = document.getElementById("startTime")
let endTimeInput = document.getElementById("endTime")
let habitForm = document.getElementById("habitForm")
const addHabitBtn = document.getElementById('addHabitBtn');
const addHabitModal = document.getElementById('addHabitModal');
const closeModal = document.getElementById('closeModal');
const cancelAddHabit = document.getElementById('cancelAddHabit');
const createHabitBtn = document.getElementById("createHabitBtn")



document.addEventListener("DOMContentLoaded", () => {
    console.log("length of habits array = ", habitsArray.length )
    generateHabits()

    if( habitsArray.length > 0 ) {
        noHabitsText.style.display = "none"
    }
    else {
        noHabitsText.textContent = "You have not added any habits yet. Add habits to start tracking"
        noHabitsText.style.display = "block"
    }
})



// functionality to display habits
const generateHabits = ( ) => {
    habitsGrid.innerHTML = ""
    let allHabits = getAllHabits()
    console.log("all habits = ", allHabits )

    let habitsCardHTML = allHabits.map( habit => `
        <div class="habit-card">
            <div class="habit-name">
                <div class="habit-icon" style="background-color: #FFEE93;">
                    <i class="fa-solid fa-snowflake" style="color: #F18F01;"></i>
                </div>
                ${habit.title}
            </div>


            <div class="habit-description">
                <p>${ habit.description.slice( 0, 50)}...</p>
            </div>


            <div class="habit-start-end-time">
                <i class="fa-solid fa-clock habit-start-icon" style="color: #F18F01;"></i>
                <p class="habit-start-time">${ habit.startTime }</p> --
                <p class="habit-end-time">${ habit.endTime }</p>
            </div>

            <div class="habit-actions">
                <button class="btn btn-complete" title="Mark as completed">
                    <i class="fas fa-check"></i> Complete
                </button>

                <button class="btn btn-edit" title="Edit habit">
                    <i class="fas fa-edit"></i>
                </button>

                <button class="btn btn-delete" title="Delete habit">
                    <i class="fas fa-trash"></i>
                </button>
            </div>

        </div>
    `).join(" ")

    habitsGrid.innerHTML = habitsCardHTML

}





// creating a new habit.
habitForm.addEventListener("submit", ( e ) => {
    e.preventDefault()

    let habitTitleValue = habitTitleInput.value.trim()
    let habitDescriptionValue = descriptionInput.value.trim()
    let habitStartTimeValue = startTimeInput.value.trim()
    let habitEndTimeValue = endTimeInput.value.trim()

    if( !habitTitleValue ) {
        alert("habit title is required")
    }
    if (!habitDescriptionValue ) {
        alert("habit description is required")
    }
    if( !habitStartTimeValue ) {
        alert("start time value is required")
    }
    if( !habitEndTimeValue ) {
        alert("end time value is required")
    }


    // proceeding to add a habit.
    let newHabit = {
        id: 1,
        title: habitTitleValue,
        description: habitDescriptionValue,
        startTime: habitStartTimeValue,
        endTime: habitEndTimeValue,
        isCompleted: false,
        setIsNotCompleted: () => {
            this.isCompleted = false
        },
        setIsCompleted: () => {
            this.isCompleted = true
        },
        backgroundColor: "red",
        currentStreak: 0

    }


    addNewHabit( newHabit )
    
    generateHabits()



})




// modal functionality
addHabitBtn.addEventListener('click', () => {
    addHabitModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    addHabitModal.style.display = 'none';
});

cancelAddHabit.addEventListener('click', () => {
    addHabitModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addHabitModal) {
        addHabitModal.style.display = 'none';
    }
});

// Color selection
// const colorOptions = document.querySelectorAll('.color-option');
// colorOptions.forEach(option => {
//     option.addEventListener('click', () => {
//         colorOptions.forEach(opt => opt.classList.remove('selected'));
//         option.classList.add('selected');
//     });
// });
