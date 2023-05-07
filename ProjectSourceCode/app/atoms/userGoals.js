import {atom} from 'recoil';

export const userGoalsState = atom({
  key: 'userGoalsState',
  default: {
    dailyCalories: 800,
    dailyProtein: 100,
    dailyCarbs: 400,
    dailyFat: 300,
  },
});
