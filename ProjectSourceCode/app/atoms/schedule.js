import {atom} from 'recoil';

export const scheduledSessionsState = atom({
  key: 'scheduledSessions',
  default: [],
});
