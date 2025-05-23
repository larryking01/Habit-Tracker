// logic for calculating streaks and progress 
import { getAllHabits } from "./storage.js";



const markHabitAsCompleted = ( currentHabitID ) => {
    const today = new Date().toISOString().split("T")[0];  //YYYY-MM-DD

    let habits = getAllHabits()
    let index = habits.findIndex( habit => habit.id === currentHabitID )

    if( index !== -1 ) {
        console.log("match found at index ", index )
        console.log("match is = ", habits[ index ])

        if( !habits[ index ].completionDates.includes( today )) {
            habits[ index ].completionDates.push( today )
            habits[ index ].currentStreak +=1
            habits[ index ].isCompleted = true

            localStorage.setItem("habitsArray", JSON.stringify( habits ))
            console.log("habit streak updated = ", habits[ index ])

        }

    }
    
}







export {
    markHabitAsCompleted
}