export interface Exercise {
  id: string;
  name: string;
  description: string;
  durationSeconds: number;
  imageUrl?: string;
  muscles?: string[];
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

export const allExercises: Exercise[] = [
  { id: 'e1', name: 'Jumping Jacks', description: 'Start with feet together and hands by your sides, then jump while raising arms and separating legs.', durationSeconds: 20, imageUrl: '/exercises/Jumping-jack.gif', muscles: ['calves', 'quadriceps', 'gluteal', 'abs'] },
  { id: 'e2', name: 'High Knees', description: 'Run in place while pulling your knees as high as possible.', durationSeconds: 20, imageUrl: '/exercises/High-Knee-Run.gif', muscles: ['quadriceps', 'hamstring', 'calves', 'abs'] },
  { id: 'e3', name: 'Russian Twist', description: 'Sit on the floor with knees bent, lean back slightly, and twist from side to side.', durationSeconds: 20, imageUrl: '/exercises/Russian-Twist.gif', muscles: ['obliques', 'abs'] },
  { id: 'e4', name: 'Bicycle Crunches', description: 'Lie on your back, bring knees to chest, and alternate touching elbows to opposite knees.', durationSeconds: 20, imageUrl: '/exercises/Bicycle-Crunch.gif', muscles: ['abs', 'obliques'] },
  { id: 'e5', name: 'Sit-ups', description: 'Lie on your back, bend knees, and lift your upper body towards your knees.', durationSeconds: 20, imageUrl: '/exercises/Sit-ups.gif', muscles: ['abs'] },
  { id: 'e6', name: 'Scissors', description: 'Lie on your back and flutter your legs up and down without touching the floor.', durationSeconds: 20, imageUrl: '/exercises/Flutter-Kicks.gif', muscles: ['abs'] },
  { id: 'e7', name: 'Crunch Kicks', description: 'Perform a crunch while kicking your legs forward simultaneously.', durationSeconds: 20, imageUrl: '/exercises/Flutter-Kicks.gif', muscles: ['abs'] },
  { id: 'e8', name: 'Walking', description: 'Brisk walk to warm up or cool down the muscles.', durationSeconds: 60, imageUrl: '/exercises/Walking.gif', muscles: ['calves', 'quadriceps'] },
  { id: 'e9', name: 'Briskly Walking', description: 'Walk at a fast pace to elevate heart rate.', durationSeconds: 60, imageUrl: '/exercises/Briskly-Walking.gif', muscles: ['calves', 'quadriceps', 'hamstring'] },
  { id: 'e10', name: 'Fast Feet Run', description: 'Run in place with very fast, shallow steps.', durationSeconds: 30, imageUrl: '/exercises/Fast-Feet-Run.gif', muscles: ['calves', 'quadriceps'] },
  { id: 'e11', name: 'High Knee Skips', description: 'Skip forward while driving your knees up to waist height.', durationSeconds: 30, imageUrl: '/exercises/High-Knee-Skips.gif', muscles: ['quadriceps', 'gluteal', 'calves'] },
  { id: 'e12', name: 'Running', description: 'High intensity sprint to maximize speed and fat burn.', durationSeconds: 45, imageUrl: '/exercises/Running.gif', muscles: ['quadriceps', 'hamstring', 'calves', 'gluteal', 'abs'] },
  { id: 'e13', name: 'Half Kneeling Hip Flexor Stretch', description: 'Kneel on one knee, push hips forward gently.', durationSeconds: 15, imageUrl: '/exercises/Half-Kneeling-Hip-Flexor-Stretch.gif', muscles: ['quadriceps'] },
  { id: 'e14', name: 'Inner Thigh Side Stretch', description: 'Lunge to the side, keeping one leg straight.', durationSeconds: 15, imageUrl: '/exercises/Inner-Thigh-Side-Stretch.gif', muscles: ['quadriceps'] },
  { id: 'e15', name: 'Standing Cross Leg Hamstring Stretch', description: 'Cross one leg over the other and reach for your toes.', durationSeconds: 15, imageUrl: '/exercises/Standing-Cross-Leg-Hamstring-Stretch.gif', muscles: ['hamstring'] },
  { id: 'e16', name: 'Standing Quadriceps Stretch', description: 'Pull one foot up behind you towards your glutes.', durationSeconds: 15, imageUrl: '/exercises/Standing-Quadriceps-Stretch.gif', muscles: ['quadriceps'] },
  { id: 'e17', name: 'Mountain Climber', description: 'Bring knees to chest alternately in a plank position.', durationSeconds: 20, imageUrl: '/exercises/Mountain-Climber.gif', muscles: ['abs', 'quadriceps', 'front-deltoids'] },
  { id: 'e18', name: 'Crunches', description: 'Lie on your back and lift your shoulders off the floor.', durationSeconds: 20, imageUrl: '/exercises/Crunches.gif', muscles: ['abs'] },
  { id: 'e19', name: 'Heel Touch', description: 'Lie on back, knees bent, and reach alternately for your heels.', durationSeconds: 20, imageUrl: '/exercises/Alternate-Heel-Touchers.gif', muscles: ['obliques', 'abs'] },
  { id: 'e20', name: 'Flutter Kick', description: 'Lie on back and flutter straight legs up and down.', durationSeconds: 20, imageUrl: '/exercises/Flutter-Kicks.gif', muscles: ['abs'] },
  { id: 'rest', name: 'Rest', description: 'Take a quick breather to recover.', durationSeconds: 10, imageUrl: '/exercises/Rest.png', muscles: [] }
];

const generateDays = (duration: number, baseCal: number): WorkoutDay[] => {
  const days: WorkoutDay[] = [];
  const baseExercises = allExercises.map(ex => ({ ...ex, durationSeconds: duration }));
  
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

export const singleWorkouts = [
  {
    id: 'full-body',
    title: 'Full Body Burner',
    description: 'A quick 15-minute full body routine.',
    caloriesBurned: 150,
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
    exercises: [
      { name: 'Jumping Jacks', durationSeconds: 45, id: 'jumping-jack' },
      { name: 'Push-ups', durationSeconds: 45, id: 'push-up' },
      { name: 'Squats', durationSeconds: 45, id: 'squat' },
      { name: 'Plank', durationSeconds: 60, id: 'plank' }
    ]
  },
  {
    id: 'core',
    title: 'Core Crusher',
    description: 'Target your abs and obliques in 10 minutes.',
    caloriesBurned: 100,
    imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
    exercises: [
      { name: 'Crunches', durationSeconds: 45, id: 'crunch' },
      { name: 'Leg Raises', durationSeconds: 45, id: 'leg-raise' },
      { name: 'Plank', durationSeconds: 60, id: 'plank' }
    ]
  },
  {
    id: 'hiit',
    title: 'HIIT Cardio',
    description: 'High Intensity Interval Training to get your heart rate up.',
    caloriesBurned: 200,
    imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&q=80&w=800',
    exercises: [
      { name: 'High Knees', durationSeconds: 30, id: 'high-knee' },
      { name: 'Burpees', durationSeconds: 30, id: 'burpee' },
      { name: 'Jumping Jacks', durationSeconds: 30, id: 'jumping-jack' },
      { name: 'Mountain Climbers', durationSeconds: 30, id: 'mountain-climber' }
    ]
  },
  {
    id: '200m-interval',
    title: '200m Interval Running Workout',
    description: 'Interval Running Workout For Speed and Fat Burning. For Beginners.',
    caloriesBurned: 350,
    imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    exercises: [
      { name: 'Walking', durationSeconds: 300, id: 'walking' },
      { name: 'Briskly Walking', durationSeconds: 180, id: 'brisk-walk' },
      { name: 'Fast Feet Run', durationSeconds: 30, id: 'fast-feet' },
      { name: 'High Knee Skips', durationSeconds: 30, id: 'knee-skips' },
      { name: 'Running', durationSeconds: 45, id: 'run-1' }, // 200m sprint 70%
      { name: 'Walking', durationSeconds: 120, id: 'walk-1' }, // 2-3 min rest
      { name: 'Running', durationSeconds: 45, id: 'run-2' }, // 200m sprint 75%
      { name: 'Walking', durationSeconds: 120, id: 'walk-2' },
      { name: 'Running', durationSeconds: 40, id: 'run-3' }, // 200m sprint 80%
      { name: 'Walking', durationSeconds: 120, id: 'walk-3' },
      { name: 'Running', durationSeconds: 40, id: 'run-4' }, // 200m sprint 80%
      { name: 'Walking', durationSeconds: 120, id: 'walk-4' },
      { name: 'Half Kneeling Hip Flexor Stretch', durationSeconds: 15, id: 'stretch-1' },
      { name: 'Inner Thigh Side Stretch', durationSeconds: 15, id: 'stretch-2' },
      { name: 'Standing Cross Leg Hamstring Stretch', durationSeconds: 15, id: 'stretch-3' },
      { name: 'Standing Quadriceps Stretch', durationSeconds: 15, id: 'stretch-4' }
    ]
  },
  {
    id: '5-min-abs',
    title: '5 Min Total Abs Workout',
    description: 'Workout / At Home, Body Weight, Core/Abs, Fat Burning / Beginners',
    caloriesBurned: 50,
    imageUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800',
    exercises: [
      { name: 'Flutter Kick', durationSeconds: 20, id: 'abs-1-set1' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-1' },
      { name: 'Flutter Kick', durationSeconds: 20, id: 'abs-1-set2' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-2' },
      
      { name: 'Mountain Climber', durationSeconds: 20, id: 'abs-2-set1' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-3' },
      { name: 'Mountain Climber', durationSeconds: 20, id: 'abs-2-set2' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-4' },
      
      { name: 'Crunches', durationSeconds: 20, id: 'abs-3-set1' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-5' },
      { name: 'Crunches', durationSeconds: 20, id: 'abs-3-set2' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-6' },
      
      { name: 'Bicycle Crunches', durationSeconds: 20, id: 'abs-4-set1' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-7' },
      { name: 'Bicycle Crunches', durationSeconds: 20, id: 'abs-4-set2' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-8' },
      
      { name: 'Heel Touch', durationSeconds: 20, id: 'abs-5-set1' },
      { name: 'Rest', durationSeconds: 10, id: 'rest-9' },
      { name: 'Heel Touch', durationSeconds: 20, id: 'abs-5-set2' }
    ]
  }
];
