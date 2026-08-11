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

const generateExercises = (duration: number): Exercise[] => [
  { id: 'e1', name: 'Jumping Jacks', description: 'Start with feet together and hands by your sides, then jump while raising arms and separating legs.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Jumping-jacks.gif' },
  { id: 'e2', name: 'High Knees', description: 'Run in place while pulling your knees as high as possible.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/High-Knee-Run.gif' },
  { id: 'e3', name: 'Russian Twist', description: 'Sit on the floor with knees bent, lean back slightly, and twist from side to side.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Russian-Twist.gif' },
  { id: 'e4', name: 'Bicycle Crunches', description: 'Lie on your back, bring knees to chest, and alternate touching elbows to opposite knees.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bicycle-Crunch.gif' },
  { id: 'e5', name: 'Sit-ups', description: 'Lie on your back, bend knees, and lift your upper body towards your knees.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Sit-up.gif' },
  { id: 'e6', name: 'Scissors', description: 'Lie on your back and flutter your legs up and down without touching the floor.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Flutter-Kicks.gif' },
  { id: 'e7', name: 'Crunch Kicks', description: 'Perform a crunch while kicking your legs forward simultaneously.', durationSeconds: duration, imageUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/06/Crunch-Kicks.gif' }
];

const generateDays = (duration: number, baseCal: number): WorkoutDay[] => {
  const days: WorkoutDay[] = [];
  const baseExercises = generateExercises(duration);
  
  for (let i = 1; i <= 30; i++) {
    const isRestDay = i % 4 === 0; // Every 4th day is a rest day
    days.push({
      dayNumber: i,
      isRestDay,
      exercises: isRestDay ? [] : baseExercises,
      caloriesBurned: isRestDay ? 0 : baseCal + (i * 2)
    });
  }
  return days;
};

export const workoutPlans: ThirtyDayPlan[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Perfect for starting your journey. Build a strong foundation.',
    days: generateDays(20, 75)
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Step up the intensity and burn more calories.',
    days: generateDays(25, 120)
  },
  {
    id: 'experienced',
    title: 'Experienced',
    description: 'For seasoned athletes ready to push their limits.',
    days: generateDays(30, 200)
  },
  {
    id: 'incredible',
    title: 'Incredible',
    description: 'The ultimate 30-day challenge. Only for the brave.',
    days: generateDays(40, 350)
  }
];
