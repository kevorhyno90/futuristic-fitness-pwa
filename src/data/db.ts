import { get, set, update } from 'idb-keyval';

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

export const getWeightHistory = async (): Promise<WeightRecord[]> => {
  return await get('weightHistory') || [];
};

export const saveWorkout = async (workoutId: string, caloriesBurned: number) => {
  const record: WorkoutRecord = { date: new Date().toISOString(), workoutId, caloriesBurned };
  await update<WorkoutRecord[]>('workoutHistory', (val = []) => [...val, record]);
};

export const getWorkoutHistory = async (): Promise<WorkoutRecord[]> => {
  return await get('workoutHistory') || [];
};
