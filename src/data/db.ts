import { get, update } from 'idb-keyval';

export interface WeightRecord {
  date: string;
  weight: number;
}

export interface WorkoutRecord {
  date: string;
  workoutId: string;
  caloriesBurned: number;
}

export const saveWeight = async (weight: number) => {
  const record: WeightRecord = { date: new Date().toISOString(), weight };
  await update<WeightRecord[]>('weightHistory', (val = []) => [...val, record]);
};

export interface CompletedDayRecord {
  dayNumber: number;
  date: string;
  calories: number;
}

export const getCompletedDays = async (): Promise<CompletedDayRecord[]> => {
  return (await get('fitai-completed-days')) || [];
};

export const saveCompletedDay = async (dayNumber: number, calories: number) => {
  await update('fitai-completed-days', (val: any) => {
    const days: CompletedDayRecord[] = val || [];
    if (!days.find(d => d.dayNumber === dayNumber)) {
      days.push({ dayNumber, date: new Date().toISOString(), calories });
    }
    return days;
  });
};

export const getWeightHistory = async (): Promise<WeightRecord[]> => {
  return (await get('weightHistory')) || [];
};

export const saveWorkout = async (workoutId: string, caloriesBurned: number) => {
  const record: WorkoutRecord = { date: new Date().toISOString(), workoutId, caloriesBurned };
  await update<WorkoutRecord[]>('workoutHistory', (val = []) => [...val, record]);
};

export const getWorkoutHistory = async (): Promise<WorkoutRecord[]> => {
  return await get('workoutHistory') || [];
};
