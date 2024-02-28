import { atom } from 'recoil';

export const userIdState = atom<number>({ key: 'userIdState', default: 0 });
export const usernameState = atom<string | null>({ key: 'usernameState', default: '' });
export const firstNameState = atom<string | null>({ key: 'firstNameState', default: '' });
export const lastNameState = atom<string | null>({ key: 'lastNameState', default: '' });
export const emailState = atom<string | null>({ key: 'emailState', default: '' });
export const roleState = atom<string | null>({ key: 'roleState', default: '' });
export const qrCodeState = atom<string | null>({ key: 'qrCodeState', default: '' });
