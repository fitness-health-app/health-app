import {atom} from 'recoil';

export const currentUserState = atom({
  key: 'currentUserState',
  default: [
    {
      name: '',
      isLoggedIn: false,
    },
  ],
});
