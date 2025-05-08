// generate unique ids for each habit object. Requires internet connection to load
import { nanoid } from "https://cdn.skypack.dev/nanoid";

// logic for persisting data with localStorage
// {
//     id: 1,
//     title: "Watch Movie",
//     description: "Visit the gym to exercise and stay physically active. Aim to build strength, improve endurance, and maintain a healthy lifestyle",
//     startTime: "16:30",
//     endTime: "20:00",
//     isCompleted: false,
//     setIsNotCompleted: () => {
//         this.isCompleted = false
//     },
//     setIsCompleted: () => {
//         this.isCompleted = true
//     },
//     backgroundColor: "red",
//     currentStreak: 0
// }


let habitsArray = [ ]


// function to generate unique ids for habit objects
const generateUniqueID = ( ) => {
    return nanoid()
}



// function to dynamically add a habit to the habitsArray.
const addNewHabit = ( habit ) => {
    habitsArray = JSON.parse(localStorage.getItem("habitsArray")) || []
    // console.log("from initial add habits array = ", habitsArray )

    // adding a new habit using the spread operator
    habitsArray = [ ...habitsArray, habit ]

    // console.log("after adding, habits array = ", habitsArray)

    // persisting the habits data with local storage.
    localStorage.setItem("habitsArray", JSON.stringify( habitsArray ))

}



// function to get all habits
const getAllHabits = ( ) => {
    let allHabitsFromLocalStorage = localStorage.getItem("habitsArray")
    if( allHabitsFromLocalStorage ) {
        allHabitsFromLocalStorage = JSON.parse( allHabitsFromLocalStorage ) || [ ]
        // console.log("from get habits, all habits from local storage = ", allHabitsFromLocalStorage )

        return allHabitsFromLocalStorage
    }

}


// function to clear all habits from local storage.
const clearAllHabits = ( ) => {
    localStorage.removeItem("habitsArray")
}



// function to delete a selected habit
const deleteParticularHabit = ( habitID ) => {
    let habitsFromLocalStorage = getAllHabits().filter( habit => habit.id !== habitID )
    localStorage.setItem("habitsArray", JSON.stringify( habitsFromLocalStorage ))

    // return habitsFromLocalStorage
}



// function to update a selected habit
const updateParticularHabit = ( currentHabitID, updatedHabit ) => {
    let habits = getAllHabits()
    let index = habits.findIndex( habit => habit.id === currentHabitID )
    // console.log("updated habit = ", updatedHabit )
    // console.log("current habit = ", habits[ index ])

    if( index !== -1 ) {
        habits[ index ] = updatedHabit
        localStorage.setItem("habitsArray", JSON.stringify( habits ))
        console.log("updated habits run successfully")
    }
}



// function to get a selected habit
const getCurrentHabit = ( habitID ) => {
    let habits = getAllHabits()
    let currentHabit = habits.find(( habit ) => habit.id === habitID )
    console.log("from get current habits func, current habit = ", currentHabit )

    return currentHabit
}









export {
    addNewHabit,
    getAllHabits,
    clearAllHabits,
    generateUniqueID,
    deleteParticularHabit,
    updateParticularHabit,
    getCurrentHabit
}