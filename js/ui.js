// logic to dynamically update the UI
import { addNewHabit, getAllHabits, 
         clearAllHabits, generateUniqueID, 
         deleteParticularHabit, updateParticularHabit,
         getCurrentHabit
       } from "./storage.js";


let habitsGrid = document.querySelector(".habits-grid")
let noHabitsText = document.querySelector(".no-habits-text")
let deleteAllHabitsBtn = document.querySelector(".delete-all-habits-btn")

// Modal functionality
let habitTitleInput = document.getElementById("habitTitle")
let descriptionInput = document.getElementById("description")
let startTimeInput = document.getElementById("startTime")
let endTimeInput = document.getElementById("endTime")
let numberOfDaysInput = document.getElementById("numberOfDays")
let habitForm = document.getElementById("habitForm")
const addHabitBtn = document.getElementById('addHabitBtn');
const addHabitModal = document.getElementById('addHabitModal');
const closeModal = document.getElementById('closeModal');
const cancelAddHabit = document.getElementById('cancelAddHabit');
const createHabitBtn = document.getElementById("createHabitBtn")

let modalTitle = document.querySelector(".modal-title")


const showNoHabitsTextOrNot = () => {
    let allHabitsFromLocalStorage = getAllHabits()

    if ( allHabitsFromLocalStorage ) {
        noHabitsText.style.display = "none"
        // console.log("length of habits array = ", allHabitsFromLocalStorage.length )
        // console.log("from dom loaded, all habits from local storage = ", allHabitsFromLocalStorage )
        generateHabits()
    
    }
    else {
        // console.log("from dom loaded, all habits from local storage = ", allHabitsFromLocalStorage )
        noHabitsText.textContent = "You have not added any habits yet. Add habits to start tracking"
        noHabitsText.style.display = "block"

    }

}


// function to delete all habits
const deleteAllHabits = () => {
    clearAllHabits()
    showNoHabitsTextOrNot()
    generateHabits()
}


// function to reset modal input values
const resetModalInputValues = ( ) => {
    habitTitleInput.value = ""
    descriptionInput.value = ""
    startTimeInput.value = ""
    endTimeInput.value = ""
}


deleteAllHabitsBtn.addEventListener("click", () => {
    if( confirm("All your habits will be deleted permanently. Do you want to continue?")) {
        deleteAllHabits()
    }
})



document.addEventListener("DOMContentLoaded", () => {
    showNoHabitsTextOrNot()
    generateHabits()
})


// functionality to display habits
const generateHabits = ( ) => {
    habitsGrid.innerHTML = ""
    let allHabits = getAllHabits()

    let habitsCardHTML = allHabits.map( habit => `
        <div class="habit-card" id=${ habit.id }>
            <div class="habit-name">
                <div class="habit-header">
                    <div class="habit-icon" style="background-color: #FFEE93;">
                        <i class="fa-solid fa-snowflake" style="color: #4c1ee3;"></i>
                    </div>

                    <div>
                        ${habit.title}
                    </div>
                </div>

                <div>
                    No. of days: ${ habit.numberOfDays }
                </div>
            </div>


            <div class="habit-description">
                <p>${ habit.description.slice( 0, 50) }...</p>
            </div>


            <div class="habit-start-end-time">
                <i class="fa-solid fa-clock habit-start-icon" style="color: #F18F01;"></i>
                <p class="habit-start-time">${ habit.startTime } </p> 
                <i class="fa-solid fa-angles-right time-icon"></i>
                <p class="habit-end-time">${ habit.endTime }</p>
            </div>


            <div class="progress-div">
                <div class="progress-div-wrapper">
                    <div class="progress-div-child"></div>
                </div>
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


let currentHabitID = ""
let currentHabit = ""
// using event delegation to delete a selected habit
habitsGrid.addEventListener("click", ( e ) => {
    let target = e.target 
    // console.log( target )

    if( target.classList.contains("fa-trash") || target.classList.contains("btn-delete") ) {
        let deleteHabitID = target.closest(".habit-card").id

        if( confirm("Are you sure you want to delete this habit?") ) {
            deleteParticularHabit( deleteHabitID )
            generateHabits()
            showNoHabitsTextOrNot()
        }
    }
    else if( target.classList.contains("fa-edit") || target.classList.contains("btn-edit")) {
        modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit Habit`
        createHabitBtn.textContent = "Edit Habit"
        addHabitModal.style.display = "flex"

        currentHabitID = target.closest(".habit-card").id
        currentHabit = getCurrentHabit( currentHabitID )
        // console.log("current habit id = ", currentHabitID)
        // console.log("from edit clicked, current habit is ", currentHabit )

        // filling modal inputs with already entered habit details
        habitTitleInput.value = currentHabit.title
        startTimeInput.value = currentHabit.startTime
        endTimeInput.value = currentHabit.endTime
        descriptionInput.value = currentHabit.description
        numberOfDaysInput.value = currentHabit.numberOfDays

    }

})







// creating a new habit.
habitForm.addEventListener("submit", ( e ) => {
    e.preventDefault()

    // creating a new habit
    if( modalTitle.innerHTML.includes("Create New Habit")) {
        // console.log( modalTitle.innerHTML )
        // console.log("this will create a habit")

        let habitTitleValue = habitTitleInput.value.trim()
        let habitDescriptionValue = descriptionInput.value.trim()
        let habitStartTimeValue = startTimeInput.value.trim()
        let habitEndTimeValue = endTimeInput.value.trim()
        let numberOfDaysValue = numberOfDaysInput.value.trim()
    
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
            id: generateUniqueID(), 
            title: habitTitleValue,
            description: habitDescriptionValue,
            startTime: habitStartTimeValue,
            endTime: habitEndTimeValue,
            isCompleted: false,
            currentStreak: 0,
            numberOfDays: Math.round( numberOfDaysValue ),
            incrementCurrentStreak: () => {
                this.currentStreak++
            },
            decrementCurrentStreak: () => {
                this.currentStreak--
            },
            resetCurrentStreak: ( ) => {
                this.currentStreak = 0
            },
            setIsNotCompleted: () => {
                this.isCompleted = false
            },
            setIsCompleted: () => {
                this.isCompleted = true
            }
    
        }
    
    
        addNewHabit( newHabit )
        showNoHabitsTextOrNot()
        generateHabits()
    
        // toggling modal display off
        addHabitModal.style.display = "none"
    
        // resetting form input values.
        resetModalInputValues()
    }
    else {
        // console.log( modalTitle.innerHTML )
        // console.log("this will update a habit")


        let habitTitleValue = habitTitleInput.value.trim()
        let habitDescriptionValue = descriptionInput.value.trim()
        let habitStartTimeValue = startTimeInput.value.trim()
        let habitEndTimeValue = endTimeInput.value.trim()
        let numberOfDaysValue = numberOfDaysInput.value.trim()


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


        // proceeding to update habit.
        let updatedHabit = {
            id: generateUniqueID(),  
            title: habitTitleValue,
            description: habitDescriptionValue,
            startTime: habitStartTimeValue,
            endTime: habitEndTimeValue,
            isCompleted: false,
            currentStreak: 0,
            numberOfDays: Math.round( numberOfDaysValue ),
            incrementCurrentStreak: () => {
                this.currentStreak++
            },
            decrementCurrentStreak: () => {
                this.currentStreak--
            },
            resetCurrentStreak: ( ) => {
                this.currentStreak = 0
            },
            setIsNotCompleted: () => {
                this.isCompleted = false
            },
            setIsCompleted: () => {
                this.isCompleted = true
            },

        }


        // console.log("current habit = ", currentHabit )
        // console.log("updated habit = ", updatedHabit )

        updateParticularHabit( currentHabitID, updatedHabit )
        showNoHabitsTextOrNot()
        generateHabits()
    
        // toggling modal display off
        addHabitModal.style.display = "none"
    
        // resetting form input values.
        resetModalInputValues()

    }


})




// modal functionality
addHabitBtn.addEventListener('click', () => {
    resetModalInputValues()
    modalTitle.innerHTML = `<i class="fas fa-plus"></i> Create New Habit`
    createHabitBtn.textContent = "Create Habit"
    addHabitModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    resetModalInputValues()    
    modalTitle.innerHTML = ""
    createHabitBtn.textContent = ""
    addHabitModal.style.display = 'none';
});

cancelAddHabit.addEventListener('click', () => {
    resetModalInputValues()
    createHabitBtn.textContent = ""
    modalTitle.innerHTML = ""
    addHabitModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === addHabitModal) {
        createHabitBtn.textContent = ""
        modalTitle.innerHTML = ""
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
