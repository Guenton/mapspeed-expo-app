import * as NavigationBar from 'expo-navigation-bar';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { isEmpty, isAscii } from 'validator';

import { setAxiosExTokenAsync } from '$lib/navigation/axiosEx';
import { gotoClientPage, gotoDriverPage } from '$lib/navigation/navigate';
import loginAsync from '$lib/services/auth/loginAsync';
import fetchUserMe from '$lib/services/users/fetchUserMe';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import {
  emailState,
  firstNameState,
  lastNameState,
  qrCodeState,
  roleState,
  userIdState,
  usernameState,
} from '$lib/store/auth';
import { usePersistStore } from '$lib/store/persist';
import { surface } from '$lib/theme/colors';
import { AuthLoginFormat } from '$lib/types/auth';
import ForgotPasswordLink from '@/buttons/ForgotPasswordLink';
import LoginButton from '@/buttons/LoginButton';
import LoginContainer from '@/containers/LoginContainer';
import PasswordInput from '@/inputs/PasswordInput';
import UsernameInput from '@/inputs/UsernameInput';

export default () => {
  const { colorScheme } = useColorScheme();

  const setJwt = usePersistStore((state) => state.setJwt);
  const jwt = usePersistStore((state) => state.jwt);

  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const setUserId = useSetRecoilState(userIdState);
  const setUsername = useSetRecoilState(usernameState);
  const setEmail = useSetRecoilState(emailState);
  const setFirstName = useSetRecoilState(firstNameState);
  const setLastName = useSetRecoilState(lastNameState);
  const setRole = useSetRecoilState(roleState);
  const setQrCode = useSetRecoilState(qrCodeState);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (colorScheme === 'light') {
      StatusBar.setBarStyle('dark-content', true);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(surface[100]);
        NavigationBar.setBackgroundColorAsync(surface[100]);
        NavigationBar.setButtonStyleAsync('light');
      }
    }
    if (colorScheme === 'dark') {
      StatusBar.setBarStyle('light-content', true);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(surface[800]);
        NavigationBar.setBackgroundColorAsync(surface[800]);
        NavigationBar.setButtonStyleAsync('light');
      }
    }
  }, [colorScheme]);

  /** Auto-Login if JWT in storage */
  useEffect(() => {
    if (!jwt) return;

    setIsLoading(true);
    setAxiosExTokenAsync(jwt)
      .then(() => fetchUserMe())
      .then((data) => {
        // Set State
        setUserId(data.id);
        setUsername(data.username);
        setEmail(data.email);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setRole(data.role.name);
        setQrCode(data.qr_code);

        // Navigate
        if (data.role.name === 'DRIVER') return gotoDriverPage();
        return gotoClientPage();
      })
      .catch((error: Error) => {
        setAlertType('error');
        setAlertText('AUTOLOGIN: ' + error.message);
      })
      .finally(() => setIsLoading(false));
  }, [jwt]);

  /** Standard Login */
  const login = () => {
    const loginFormat: AuthLoginFormat = { identifier, password };
    if (!isValidAuthLoginFormat(loginFormat)) return;

    setIsLoading(true);
    loginAsync(loginFormat)
      .then((data) => {
        // Set Store
        setJwt(data.jwt);

        // Set State
        setUserId(data.user.id);
        setUsername(data.user.username);
        setEmail(data.user.email);
        setFirstName(data.user.firstName);
        setLastName(data.user.lastName);
        setRole(data.user.role.name);
        setQrCode(data.user.qr_code);

        // Navigate
        if (data.user.role.name === 'DRIVER') return gotoDriverPage();
        return gotoClientPage();
      })
      .catch((error: Error) => {
        setAlertType('error');
        setAlertText('LOGIN' + error.message);
      })
      .finally(() => setIsLoading(false));
  };

  /** Standard Login Validation */
  const isValidAuthLoginFormat = (loginFormat: AuthLoginFormat) => {
    // Check if the identifier has a value
    if (isEmpty(loginFormat.identifier)) {
      setAlertType('warning');
      setAlertText('Please enter a username or Email');
      return false;
    }
    // Check if the password has a value
    if (isEmpty(loginFormat.password)) {
      setAlertType('warning');
      setAlertText('Please enter a password');
      return false;
    }
    // Check if the identifier has forbidden characters
    if (!isAscii(loginFormat.identifier)) {
      setAlertType('warning');
      setAlertText('Your username or Email contains forbidden characters');
      return false;
    }
    // Check if the password has forbidden characters
    if (!isAscii(loginFormat.password)) {
      setAlertType('warning');
      setAlertText('Your password contains forbidden characters');
      return false;
    }

    return true;
  };

  return (
    <LoginContainer label="Welcome Please Login">
      <View className="flex items-center gap-8">
        <UsernameInput value={identifier} onChangeText={setIdentifier} />

        <View className="w-full flex items-end">
          <PasswordInput value={password} onChangeText={setPassword} onSubmitEditing={login} />
          <ForgotPasswordLink />
        </View>
      </View>

      <View className="flex items-center mt-10">
        <LoginButton onPress={login} />
      </View>
    </LoginContainer>
  );
};
