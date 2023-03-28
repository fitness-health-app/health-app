export const toTitleCase = str => {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(' ');
};

export const generateRandomCalories = () => {
  // randomNumber * (max - min) + min
  return Math.random() * (12 - 5) + 5;
};