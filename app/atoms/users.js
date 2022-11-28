import {atom} from 'recoil';

export const currentUserState = atom({
  key: 'currentUserState',
  default: [
    {
      id: '',
      name: '',
      email: '',
      role: '',
      provider: '',
      status: '',
      message: '',
      created_at: '',
      updated_at: '',
      access_token: '',
      isLoggedIn: false,
    },
  ],
});

export const isUserLoginExists = atom({
  key: 'isUserLoginExists',
  default: [
    {
      isUserExists: false,
    },
  ],
});
