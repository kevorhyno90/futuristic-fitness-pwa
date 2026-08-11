export interface Exercise {
  id: string;
  name: string;
  description: string;
  durationSeconds: number;
  imageUrl?: string;
}

export interface WorkoutDay {
  dayNumber: number;
  isRestDay: boolean;
  exercises: Exercise[];
  caloriesBurned: number;
}

export interface ThirtyDayPlan {
  id: string;
  title: string;
  description: string;
  days: WorkoutDay[];
}

const generateExercises = (): Exercise[] => [
  { id: 'e1', name: 'Jumping Jacks', description: 'Start with feet together and hands by your sides, then jump while raising arms and separating legs.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' },
  { id: 'e2', name: 'High Knees', description: 'Run in place while pulling your knees as high as possible.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600' },
  { id: 'e3', name: 'Russian Twist', description: 'Sit on the floor with knees bent, lean back slightly, and twist from side to side.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600' },
  { id: 'e4', name: 'Bicycle Crunches', description: 'Lie on your back, bring knees to chest, and alternate touching elbows to opposite knees.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' },
  { id: 'e5', name: 'Sit-ups', description: 'Lie on your back, bend knees, and lift your upper body towards your knees.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600' },
  { id: 'e6', name: 'Scissors', description: 'Lie on your back and flutter your legs up and down without touching the floor.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1552674605-171fb2c26c04?auto=format&fit=crop&q=80&w=600' },
  { id: 'e7', name: 'Crunch Kicks', description: 'Perform a crunch while kicking your legs forward simultaneously.', durationSeconds: 20, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' }
];

const generateDays = (): WorkoutDay[] => {
  const days: WorkoutDay[] = [];
  const baseExercises = generateExercises();
  
  for (let i = 1; i <= 30; i++) {
    const isRestDay = i % 4 === 0; // Every 4th day is a rest day
    days.push({
      dayNumber: i,
      isRestDay,
      exercises: isRestDay ? [] : baseExercises,
      caloriesBurned: isRestDay ? 0 : 75 + (i * 2) // Slowly increase calories over time
    });
  }
  return days;
};

export const thirtyDayPlan: ThirtyDayPlan = {
  id: '30-day-weight-loss',
  title: 'Lose Weight at Home in 30 Days',
  description: 'A structured 30-day program with daily calisthenic exercises. No equipment needed.',
  days: generateDays()
};
