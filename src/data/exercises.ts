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
  { id: 'rest-0', name: 'Rest', description: 'Take a breather.', durationSeconds: 10, imageUrl: '/exercises/rest.gif', muscles: [] },
  { id: 'e22', name: 'Skater Jumps', description: 'Leap from side to side, landing on one foot.', durationSeconds: 20, imageUrl: '/exercises/Jumping-jack.gif', muscles: ['quadriceps', 'gluteal', 'calves'] },
  { id: 'e23', name: 'Hindu Push-ups', description: 'Swoop down and up in a fluid push-up motion.', durationSeconds: 20, imageUrl: '/exercises/Push-up.gif', muscles: ['chest', 'shoulders', 'triceps'] },
  { id: 'e24', name: 'Jump Squats', description: 'Squat down and explode upwards.', durationSeconds: 20, imageUrl: '/exercises/Squat.gif', muscles: ['quadriceps', 'gluteal', 'calves'] },
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
    imageUrl: '/workouts/full-body.png',
    exercises: [
      { name: 'Jumping Jacks', durationSeconds: 45, id: 'jumping-jack' },
      { name: 'Push-ups', durationSeconds: 45, id: 'push-up' },
      { name: 'Squats', durationSeconds: 45, id: 'squat' },
      { name: 'Plank', durationSeconds: 45, id: 'plank' }
    ]
  },
  {
    id: 'core',
    title: 'Core Crusher',
    description: 'Target your abs and obliques in 10 minutes.',
    caloriesBurned: 100,
    imageUrl: '/workouts/core.png',
    exercises: [
      { name: 'Crunches', durationSeconds: 45, id: 'crunch' },
      { name: 'Leg Raises', durationSeconds: 45, id: 'leg-raise' },
      { name: 'Russian Twist', durationSeconds: 45, id: 'russian-twist' }
    ]
  },
  {
    id: 'hiit',
    title: 'HIIT Cardio',
    description: 'High Intensity Interval Training to get your heart rate up.',
    caloriesBurned: 200,
    imageUrl: '/workouts/hiit.png',
    exercises: [
      { name: 'High Knees', durationSeconds: 30, id: 'high-knee' },
      { name: 'Burpees', durationSeconds: 30, id: 'burpee' },
      { name: 'Mountain Climbers', durationSeconds: 30, id: 'mountain-climber' }
    ]
  },
  {
    id: '200m-interval',
    title: '200m Interval Running Workout',
    description: 'Interval Running Workout For Speed and Fat Burning. For Beginners.',
    caloriesBurned: 350,
    imageUrl: '/workouts/interval-running.png',
    exercises: [
      { name: 'Walking', durationSeconds: 300, id: 'walking' },
      { name: 'Briskly Walking', durationSeconds: 180, id: 'brisk-walk' },
      { name: 'Fast Feet Run', durationSeconds: 30, id: 'fast-feet-1' },
      { name: 'High Knee Skips', durationSeconds: 30, id: 'high-knee-skips-1' },
      { name: 'Fast Feet Run', durationSeconds: 30, id: 'fast-feet-2' },
      { name: 'High Knee Skips', durationSeconds: 30, id: 'high-knee-skips-2' },
      { name: 'Running', durationSeconds: 45, id: 'run-1' },
      { name: 'Walking', durationSeconds: 180, id: 'rest-walk' },
      { name: 'Running', durationSeconds: 45, id: 'run-2' },
      { name: 'Walking', durationSeconds: 180, id: 'cool-down-walk' }
    ]
  },
  {
    id: '5-min-abs',
    title: '5 Min Total Abs Workout',
    description: 'Workout / At Home, Body Weight, Core/Abs, Fat Burning / Beginners',
    caloriesBurned: 50,
    imageUrl: '/workouts/abs-workout.png',
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
  },
  {
    id: 'tabata-advanced',
    title: '20-Min Advanced Tabata',
    description: 'Fast Fat Loss Tabata Workout. 2 Rounds.',
    caloriesBurned: 400,
    imageUrl: '/workouts/hiit.png',
    exercises: [
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-1' },
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-2' },
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-3' },
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-4' },
      
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-1' },
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-2' },
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-3' },
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-4' },
      
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-1' },
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-2' },
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-3' },
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-4' },
      
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-1' },
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-2' },
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-3' },
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-4' },
      
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-1' },
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-2' },
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-3' },
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-4' },

      { name: 'Rest', durationSeconds: 60, id: 't-rest-mid' },

      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-5' },
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-6' },
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-7' },
      { name: 'High Knee Skips', durationSeconds: 20, id: 't1-8' },
      
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-5' },
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-6' },
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-7' },
      { name: 'Skater Jumps', durationSeconds: 20, id: 't2-8' },
      
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-5' },
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-6' },
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-7' },
      { name: 'Hindu Push-ups', durationSeconds: 20, id: 't3-8' },
      
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-5' },
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-6' },
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-7' },
      { name: 'Mountain Climbers', durationSeconds: 20, id: 't4-8' },
      
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-5' },
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-6' },
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-7' },
      { name: 'Jump Squats', durationSeconds: 20, id: 't5-8' }
    ]
  }
];
