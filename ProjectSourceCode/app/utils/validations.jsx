import {Alert} from 'react-native';

const showAlert = (alertTitle, alertMessage) => {
  Alert.alert(alertTitle, alertMessage, [
    {
      text: 'OK',
    },
  ]);
};

export const successValidation = () => {
  showAlert('Success!', 'Successfully created the account');
  return;
};

export const invalidSignup = () => {
  showAlert('Invalid Signup', 'Please enter valid credentials');
  return;
};

export const invalidLogin = () => {
  showAlert('Invalid Credentials', 'Please enter valid credentials');
  return;
};

export const validateName = nameString => {
  if (nameString.length < 3 || nameString.length > 15) {
    showAlert(
      'Invalid Name',
      'Please enter a name between 3 and 15 characters',
    );
    return false;
  } else {
    return true;
  }
};
export const validateEmail = emailString => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(emailString)) {
    showAlert('Invalid Email', 'Please enter a correct email address');
    return false;
  }
  return true;
};

export const validateSignupPassword = (
  passwordString,
  passwordConfirmString,
) => {
  if (passwordString.length !== passwordConfirmString.length) {
    showAlert('Invalid Password', 'Password does not match');
    return false;
  }
  if (passwordString.length < 8 || passwordString.length > 15) {
    showAlert(
      'Invalid Password',
      'Please Enter Password between 8 and 15 characters',
    );
    return false;
  }
  return true;
};

export const validatePassword = passwordString => {
  if (passwordString.length < 8 || passwordString.length > 15) {
    showAlert(
      'Invalid Password',
      'Please Enter Password between 8 and 15 characters',
    );
    return false;
  }
  return true;
};
