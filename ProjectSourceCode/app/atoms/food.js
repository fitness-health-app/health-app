import {atom} from 'recoil';

export const totalFoodMacro = atom({
  key: 'totalFoodMacro',
  default: [
    // {
    //   Calories: 0,
    //   Carbohydrate: 0,
    //   Fat: 0,
    //   Fiber: 0,
    //   Protein: 0,
    // },
  ],
});
