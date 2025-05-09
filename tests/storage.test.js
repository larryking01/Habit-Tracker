/**
 *@jest-environment jsdom
*/


// importing functions to test.
import { 
    addNewHabit,
    getAllHabits,
    clearAllHabits,
    generateUniqueID,
    deleteParticularHabit,
    updateParticularHabit,    
    } from "../js/storage.js"




// testing create and read operations for habits.
describe("Test creating and reading operations for habits.", () => {
    beforeEach(() => {
        localStorage.clear()
        // jest.clearAllMocks()
    })

    test("adds a new habit and saves it to local storage", () => {
        let habit = 
            { 
                id: generateUniqueID(), 
                title: "Gym",
                description: "Keep fit",
                startTime: "08:30",
                endTime: "10:00",
                isCompleted: false,
                currentStreak: 0,
                numberOfDays: 5,
                completionDates: []
            }

        addNewHabit(habit);

        const storedHabits = JSON.parse(localStorage.getItem("habitsArray"))
        expect(storedHabits).toBeTruthy()
        expect(storedHabits.length).toBe(1)
        expect(storedHabits[0]).toMatchObject( habit )
    })



  test('appends to existing habits in localStorage', () => {
    const existingHabit = {
      id: generateUniqueID(),
      title: 'Read',
      description: 'Read 30 minutes daily',
      startTime: '07:00',
      endTime: '07:30',
      isCompleted: false,
      currentStreak: 2,
      completionDates: []

    };

    localStorage.setItem('habitsArray', JSON.stringify([existingHabit]));

    const newHabit = {
      id: '222',
      title: 'Meditate',
      description: '10 min mindfulness',
      startTime: '06:00',
      endTime: '06:10',
      isCompleted: false,
      currentStreak: 0,
      completionDates: []

    };

    addNewHabit(newHabit);

    const storedHabits = JSON.parse(localStorage.getItem('habitsArray'));
    expect(storedHabits.length).toBe(2);
    expect(storedHabits[1]).toMatchObject(newHabit);
  });



  it('returns parsed habits from localStorage when data exists', () => {
    const mockHabits = [
      { id: 1, title: 'Drink Water', isCompleted: false },
      { id: 2, title: 'Exercise', isCompleted: true },
    ];

    localStorage.setItem('habitsArray', JSON.stringify(mockHabits));

    const result = getAllHabits();
    expect(result).toEqual(mockHabits);
  });


  it('returns undefined when no habits are in localStorage', () => {
    const result = getAllHabits();
    expect(result).toBeUndefined();

  });

})




// tests deletion of all habits from local storage at once
describe('clearAllHabits', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('habitsArray', JSON.stringify([{ 
      id: generateUniqueID(),
      title: 'Read',
      description: 'Read 30 minutes daily',
      startTime: '07:00',
      endTime: '07:30',
      isCompleted: false,
      currentStreak: 2,
      completionDates: []
    }]));
  });

  
  it('removes habitsArray from localStorage', () => {
    clearAllHabits();
    const result = localStorage.getItem('habitsArray');
    expect(result).toBeNull();
  });

});



// tests update of a habit
describe('updateParticularHabit', () => {
  const initialHabit = {
    id: 'abc123',
    title: 'Drink Water',
    description: 'Drink 8 glasses of water',
    isCompleted: false,
  };

  const updatedHabit = {
    id: 'abc123',
    title: 'Drink More Water',
    description: 'Drink 10 glasses of water',
    isCompleted: true,
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('habitsArray', JSON.stringify([initialHabit]));
  });


  it('updates the habit with the given ID', () => {
    updateParticularHabit('abc123', updatedHabit);
    const allHabits = getAllHabits();
    expect(allHabits.length).toBe(1);
    expect(allHabits[0]).toEqual(updatedHabit);
  });


  it('does nothing if ID is not found', () => {
    updateParticularHabit('nonexistentID', updatedHabit);
    const allHabits = getAllHabits();
    expect(allHabits[0]).toEqual(initialHabit);
  });
});



// tests deleting a specific habit
describe('Delete a particular habit', () => {
  const habit1 = {
    id: 'habit-1',
    title: 'Read',
    description: 'Read a book for 30 mins',
  };

  const habit2 = {
    id: 'habit-2',
    title: 'Exercise',
    description: 'Workout for 20 mins',
  };


  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('habitsArray', JSON.stringify([habit1, habit2]));
  });


  test('deletes the habit with the given ID', () => {
    deleteParticularHabit('habit-1');
    const habits = getAllHabits();
    expect(habits.length).toBe(1);
    expect(habits[0].id).toBe('habit-2');
  });

  
  test('does nothing if the ID does not exist', () => {
    deleteParticularHabit('nonexistent-id');
    const habits = getAllHabits();
    expect(habits.length).toBe(2);
  });
});