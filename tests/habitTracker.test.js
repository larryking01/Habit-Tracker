import { getAllHabits } from "../js/storage.js";
import { markHabitAsCompleted } from "../js/habitTracker.js";



describe('Mark habit as completed', () => {
  const today = new Date().toISOString().split("T")[0];
  const habit = {
    id: 'habit-1',
    title: 'Meditate',
    description: '10 minutes mindfulness',
    completionDates: [],
    currentStreak: 0,
    isCompleted: false,
  };

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('habitsArray', JSON.stringify([habit]));
  });

  it('marks a habit as completed and updates the streak', () => {
    markHabitAsCompleted('habit-1');

    const updatedHabits = getAllHabits();
    const updatedHabit = updatedHabits[0];

    expect(updatedHabit.isCompleted).toBe(true);
    expect(updatedHabit.currentStreak).toBe(1);
    expect(updatedHabit.completionDates).toContain(today);
  });

  test('does not update streak if habit is already marked for today', () => {
    // Set habit as already completed today
    habit.completionDates = [today];
    habit.currentStreak = 3;
    localStorage.setItem('habitsArray', JSON.stringify([habit]));

    markHabitAsCompleted('habit-1');

    const updatedHabit = getAllHabits()[0];
    expect(updatedHabit.currentStreak).toBe(3); // No increment
  });


  it('does nothing if habit ID is not found', () => {
    markHabitAsCompleted('nonexistent-id');
    const habits = getAllHabits();
    expect(habits.length).toBe(1);
    expect(habits[0].currentStreak).toBe(0);
  });

});