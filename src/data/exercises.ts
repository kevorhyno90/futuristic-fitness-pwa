export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type Category = 'Aerobic' | 'Strength' | 'Flexibility' | 'Morning Run';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  durationSeconds: number;
  imageUrl?: string;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
  warmUp: Exercise[];
  main: Exercise[];
  coolDown: Exercise[];
}

export const sampleWorkouts: WorkoutPlan[] = [
  {
    id: 'w1',
    title: 'Morning Energizer',
    category: 'Morning Run',
    difficulty: 'Beginner',
    description: 'A light routine to wake up your body, perfect for starting your day.',
    warmUp: [
      { id: 'e1', name: 'Neck Rolls', description: 'Gently roll your neck to release tension.', durationSeconds: 30, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' },
      { id: 'e2', name: 'Arm Circles', description: 'Small circles with your arms.', durationSeconds: 30, imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600' }
    ],
    main: [
      { id: 'e3', name: 'Light Jog in Place', description: 'Elevate your heart rate gently.', durationSeconds: 60, imageUrl: 'https://images.unsplash.com/photo-1552674605-171fb2c26c04?auto=format&fit=crop&q=80&w=600' },
      { id: 'e4', name: 'Jumping Jacks', description: 'Full body movement.', durationSeconds: 45, imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=600' }
    ],
    coolDown: [
      { id: 'e5', name: 'Forward Fold', description: 'Stretch your hamstrings and lower back.', durationSeconds: 45, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600' }
    ]
  },
  {
    id: 'w2',
    title: 'Evening Fat Burn (Aerobic)',
    category: 'Aerobic',
    difficulty: 'Intermediate',
    description: 'High intensity to burn calories and stabilize metabolism.',
    warmUp: [
      { id: 'e6', name: 'High Knees (Slow)', description: 'Warm up legs.', durationSeconds: 45, imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=600' }
    ],
    main: [
      { id: 'e7', name: 'Burpees', description: 'Full body explosive movement.', durationSeconds: 45, imageUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=600' },
      { id: 'e8', name: 'Mountain Climbers', description: 'Core and cardio.', durationSeconds: 45, imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600' }
    ],
    coolDown: [
      { id: 'e9', name: 'Childs Pose', description: 'Rest and stretch.', durationSeconds: 60, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600' }
    ]
  }
];
