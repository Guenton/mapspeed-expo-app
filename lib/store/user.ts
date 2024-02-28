import { atom } from 'recoil';

import { UserFormat } from '../types/user';

const initialUserListState: UserFormat[] = [];
const initialSelectedUserState: UserFormat = {} as UserFormat;

export const userListState = atom<UserFormat[]>({
  key: 'userListState',
  default: initialUserListState,
});

export const selectedUserState = atom<UserFormat>({
  key: 'selectedUserState',
  default: initialSelectedUserState,
});
