// logic for persisting data with localStorage

let habitsArray = [
    {
        id: 1,
        title: "Go to gym",
        description: "Visit the gym to exercise and stay physically active. Aim to build strength, improve endurance, and maintain a healthy lifestyle",
        startTime: "16:30",
        endTime: "20:00",
        isCompleted: false,
        setIsNotCompleted: () => {
            this.isCompleted = false
        },
        setIsCompleted: () => {
            this.isCompleted = true
        },
        backgroundColor: "red",
        currentStreak: 0
    },
    {
        id: 1,
        title: "Watch Movie",
        description: "Visit the gym to exercise and stay physically active. Aim to build strength, improve endurance, and maintain a healthy lifestyle",
        startTime: "16:30",
        endTime: "20:00",
        isCompleted: false,
        setIsNotCompleted: () => {
            this.isCompleted = false
        },
        setIsCompleted: () => {
            this.isCompleted = true
        },
        backgroundColor: "red",
        currentStreak: 0
    },
    {
        id: 1,
        title: "Finish Assignment",
        description: "Visit the gym to exercise and stay physically active. Aim to build strength, improve endurance, and maintain a healthy lifestyle",
        startTime: "16:30",
        endTime: "20:00",
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


]






// function to dynamically add a habit to the habitsArray.
const addNewHabit = ( habit ) => {
    habitsArray = [ ...habitsArray, habit ]

    console.log("habits array = ", habitsArray )
}



// function to get all habits
const getAllHabits = ( ) => {
    return habitsArray
}

















export {
    habitsArray,
    addNewHabit,
    getAllHabits
}