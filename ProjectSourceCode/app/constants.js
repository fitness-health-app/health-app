export const TRAINERS = [
  {
    name: 'John Smith',
    description:
      "John is a certified personal trainer with over 10 years of experience in the fitness industry. He is passionate about helping people reach their fitness goals, and he believes that everyone can achieve their dream body with hard work and dedication. John is a certified personal trainer through the National Academy of Sports Medicine (NASM), and he is also a certified nutrition coach. He has a strong understanding of fitness and nutrition, and he is able to create personalized workout plans and meal plans that are tailored to each client's individual needs. John is a motivating and supportive trainer, and he is dedicated to helping his clients reach their full potential.",
    title: 'Personal Trainer',
    experience: '10',
    location: 'New York, NY',
  },
  {
    name: 'Jane Doe',
    description:
      'Jane is a group fitness instructor with over 5 years of experience in the fitness industry. She is passionate about teaching fun and challenging classes that help people get fit and have fun at the same time. Jane is certified to teach a variety of group fitness classes, including yoga, Pilates, Zumba, and spinning. She is also a certified personal trainer. Jane is a motivating and energetic instructor, and she loves to see her students succeed.',
    title: 'Group Fitness Instructor',
    experience: '5',
    location: 'Los Angeles, CA',
  },
  {
    name: 'Mike Jones',
    description:
      'Mike is a CrossFit trainer with over 3 years of experience in the fitness industry. He is passionate about helping people get fit and healthy through CrossFit, a high-intensity interval training (HIIT) workout that combines weightlifting, cardio, and gymnastics. Mike is certified through CrossFit Level 1 and CrossFit Endurance. He is a knowledgeable and experienced trainer, and he is able to create personalized CrossFit workouts that are safe and effective for all fitness levels. Mike is a motivating and supportive trainer, and he is dedicated to helping his clients reach their full potential.',
    title: 'CrossFit Trainer',
    experience: '3',
    location: 'San Francisco, CA',
  },
  {
    name: 'Jessica Smith',
    description:
      'Jessica is a registered dietitian with over 10 years of experience in the field of nutrition. She is passionate about helping people improve their health and well-being through diet and lifestyle changes. Jessica is a graduate of the University of Pennsylvania School of Nursing and Nutrition, and she is certified by the Academy of Nutrition and Dietetics. She has worked in a variety of settings, including hospitals, clinics, and private practice. Jessica is a knowledgeable and experienced dietitian, and she is dedicated to helping her clients reach their health goals.',
    title: 'Registered Dietitian (RD)',
    experience: '10',
    location: 'New York, NY',
  },
  {
    name: 'Mike Jones',
    description:
      'Mike is a sports dietitian with over 3 years of experience in the field of nutrition. He is passionate about helping athletes reach their peak performance through proper nutrition. Mike is a graduate of the University of Colorado Boulder, and he is certified by the Academy of Nutrition and Dietetics. He has worked with a variety of athletes, including professional football players, Olympic athletes, and college athletes. Mike is a knowledgeable and experienced dietitian, and he is dedicated to helping his clients reach their athletic goals.',
    title: 'Sports Dietitian',
    experience: '3',
    location: 'San Francisco, CA',
  },
  {
    name: 'Sarah Green',
    description:
      'Sarah is a pediatric dietitian with over 2 years of experience in the field of nutrition. She is passionate about helping children develop healthy eating habits and reach their full growth potential. Sarah is a graduate of the University of Illinois at Urbana-Champaign, and she is certified by the Academy of Nutrition and Dietetics. She has worked in a variety of settings, including hospitals, clinics, and schools. Sarah is a knowledgeable and experienced dietitian, and she is dedicated to helping her clients reach their health goals.',
    title: 'Pediatric Dietitian',
    experience: '2',
    location: 'Chicago, IL',
  },
  {
    name: 'David Brown',
    description:
      'David is a dietitian in private practice with over 10 years of experience in the field of nutrition. He is passionate about helping people improve their health and well-being through personalized nutrition plans. David is a graduate of the Emory University School of Medicine, and he is certified by the Academy of Nutrition and Dietetics. He has worked in a variety of settings, including hospitals, clinics, and private practice. David is a knowledgeable and experienced dietitian, and he is dedicated to helping his clients reach their health goals.',
    title: 'Dietitian in Private Practice',
    experience: '10',
    location: 'Atlanta, GA',
  },
];

export const WORKOUTS = {
  fullBody: [
    {name: 'Warm-up', reps: '5-10 minutes of light cardio'},
    {name: 'Squats', reps: '3 sets of 10-12 reps'},
    {name: 'Push-ups', reps: '3 sets of as many reps as possible'},
    {name: 'Lunges', reps: '3 sets of 10-12 reps per leg'},
    {name: 'Crunches', reps: '3 sets of 15-20 reps'},
    {name: 'Plank', reps: '30-60 seconds'},
    {name: 'Cool-down', reps: '5-10 minutes of stretching'},
  ],
  upperBody: [
    {name: 'Warm-up', reps: '5-10 minutes of light cardio'},
    {name: 'Bench press', reps: '3 sets of 8-10 reps'},
    {name: 'Overhead press', reps: '3 sets of 8-10 reps'},
    {name: 'Pull-ups', reps: '3 sets of as many reps as possible'},
    {name: 'Rows', reps: '3 sets of 8-10 reps'},
    {name: 'Triceps extensions', reps: '3 sets of 12-15 reps'},
    {name: 'Biceps curls', reps: '3 sets of 12-15 reps'},
    {name: 'Cool-down', reps: '5-10 minutes of stretching'},
  ],
  lowerBody: [
    {name: 'Warm-up', reps: '5-10 minutes of light cardio'},
    {name: 'Squats', reps: '3 sets of 10-12 reps'},
    {name: 'Deadlifts', reps: '3 sets of 5-8 reps'},
    {name: 'Lunges', reps: '3 sets of 10-12 reps per leg'},
    {name: 'Leg press', reps: '3 sets of 12-15 reps'},
    {name: 'Hamstring curls', reps: '3 sets of 12-15 reps'},
    {name: 'Calf raises', reps: '3 sets of 15-20 reps'},
    {name: 'Cool-down', reps: '5-10 minutes of stretching'},
  ],
  cardio: [
    {name: 'Warm-up', reps: '5-10 minutes of light cardio'},
    {
      name: 'Sprints',
      reps: '3 sets of 30 seconds of sprinting, followed by 90 seconds of rest',
    },
    {
      name: 'Interval training',
      reps: '30 minutes of alternating between 30 seconds of high-intensity exercise and 1 minute of low-intensity exercise',
    },
    {
      name: 'Steady-state cardio',
      reps: '30-60 minutes of moderate-intensity exercise, such as running, biking, or swimming',
    },
    {name: 'Cool-down', reps: '5-10 minutes of light cardio'},
  ],
};

export const NUTRITION_DATA = [
  {
    time: 'Breakfast',
    meals: [
      'Oatmeal, Greek yogurt, and fruit',
      'Smoothie with spinach, banana, berries, and almond milk',
      'Whole grain toast with avocado, poached egg, and cherry tomatoes',
      'Overnight chia pudding with almond milk, honey, and mixed berries',
    ],
  },
  {
    time: 'Lunch',
    meals: [
      'Grilled chicken salad with vinaigrette',
      'Quinoa, black bean, and avocado salad',
      'Whole grain wrap with hummus, turkey, and mixed vegetables',
      'Brown rice sushi with salmon, avocado, and cucumber',
    ],
  },
  {
    time: 'Dinner',
    meals: [
      'Salmon, quinoa, and steamed vegetables',
      'Stir-fried tofu with mixed vegetables and brown rice',
      'Grilled lean steak with baked sweet potato and steamed green beans',
      'Baked chicken with roasted Brussels sprouts and a side of whole grain couscous',
    ],
  },
  {
    time: 'Snacks',
    meals: [
      'Sliced apple with almond butter',
      'Carrots and cucumber with hummus',
      'Mixed nuts and dried fruit',
      'Greek yogurt with honey and walnuts',
    ],
  },
];

export const EXERCISE_DATA = [200, 300, 150, 270, 350, 180];
