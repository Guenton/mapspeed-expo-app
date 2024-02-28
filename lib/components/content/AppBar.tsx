import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import FapLogoSmall from './FapLogoSmall';

import { gotoRootPage } from '$lib/navigation/navigate';
import logoutAsync from '$lib/services/auth/logoutAsync';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import {
  emailState,
  firstNameState,
  lastNameState,
  roleState,
  userIdState,
  usernameState,
} from '$lib/store/auth';
import { usePersistStore } from '$lib/store/persist';
import DarkToggle from '@/buttons/DarkToggle';
import LogoutButton from '@/buttons/LogoutButton';

export default () => {
  const setJwt = usePersistStore((state) => state.setJwt);

  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const setUserId = useSetRecoilState(userIdState);
  const setUsername = useSetRecoilState(usernameState);
  const setEmail = useSetRecoilState(emailState);
  const setFirstName = useSetRecoilState(firstNameState);
  const setLastName = useSetRecoilState(lastNameState);
  const setRole = useSetRecoilState(roleState);

  const logout = () => {
    setIsLoading(true);

    setJwt('');

    setAlertType('');
    setAlertText('');

    setUserId(0);
    setUsername('');
    setEmail('');
    setFirstName('');
    setLastName('');
    setRole('');

    logoutAsync()
      .then(() => gotoRootPage())
      .finally(() => setIsLoading(false));
  };

  return (
    <View className="flex flex-row justify-between items-center py-9 px-5 bg-surface-200 dark:bg-surface-600">
      <FapLogoSmall />
      <View className="flex-1" />
      <DarkToggle />
      <LogoutButton onPress={logout} />
    </View>
  );
};
