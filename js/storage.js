// generate unique ids for each habit object. Requires internet connection to load
import { nanoid } from "nanoid";


let habitsArray = [ ]


// function to generate unique ids for habit objects
const generateUniqueID = ( ) => {
    return nanoid()
}



// function to dynamically add a habit to the habitsArray.
const addNewHabit = ( habit ) => {
    habitsArray = JSON.parse(localStorage.getItem("habitsArray")) || []
    habitsArray = [ ...habitsArray, habit ]

    // persisting the habits data with local storage.
    localStorage.setItem("habitsArray", JSON.stringify( habitsArray ))

}



// function to get all habits
const getAllHabits = ( ) => {
    let allHabitsFromLocalStorage = localStorage.getItem("habitsArray")
    if( allHabitsFromLocalStorage ) {
        allHabitsFromLocalStorage = JSON.parse( allHabitsFromLocalStorage ) || [ ]

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

}



// function to update a selected habit
const updateParticularHabit = ( currentHabitID, updatedHabit ) => {
    let habits = getAllHabits()
    let index = habits.findIndex( habit => habit.id === currentHabitID )

    if( index !== -1 ) {
        habits[ index ] = updatedHabit
        localStorage.setItem("habitsArray", JSON.stringify( habits ))
    }
}



// function to get a selected habit
const getCurrentHabit = ( habitID ) => {
    let habits = getAllHabits()
    let currentHabit = habits.find(( habit ) => habit.id === habitID )

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