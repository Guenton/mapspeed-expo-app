import { useState } from 'react';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { isEmpty, isAscii, isEmail } from 'validator';

import { gotoRootPage } from '$lib/navigation/navigate';
import forgotPasswordByEmailAsync from '$lib/services/auth/forgotPasswordByEmailAsync';
import logoutAsync from '$lib/services/auth/logoutAsync';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { usePersistStore } from '$lib/store/persist';
import CancelButton from '@/buttons/CancelButton';
import ResetButton from '@/buttons/ResetButton';
import LoginContainer from '@/containers/LoginContainer';
import EmailInput from '@/inputs/EmailInput';

export default () => {
  const setJwt = usePersistStore((state) => state.setJwt);

  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [email, setEmail] = useState('');

  const requestReset = () => {
    if (!isValidEmail(email)) return;

    setIsLoading(true);
    forgotPasswordByEmailAsync(email)
      .then(() => {
        setAlertType('success');
        setAlertText('Password Reset Email Delivered to ' + email);
        cleanup();
      })
      .catch((error: Error) => {
        setAlertType('error');
        setAlertText('FORGOT PASSWORD: ' + error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const isValidEmail = (email: string) => {
    // Check if the email has a value
    if (isEmpty(email)) {
      setAlertType('warning');
      setAlertText('Please enter your Email Address');
      return false;
    }
    // Check if the email has forbidden characters
    if (!isAscii(email)) {
      setAlertType('warning');
      setAlertText('Your Email contains forbidden characters');
      return false;
    }
    // Check if the email is valid
    if (!isEmail(email)) {
      setAlertType('warning');
      setAlertText('Please enter a valid Email Address');
      return false;
    }
    return true;
  };

  const cleanup = () => {
    setIsLoading(true);

    setJwt('');

    logoutAsync()
      .then(() => gotoRootPage())
      .finally(() => setIsLoading(false));
  };

  return (
    <LoginContainer label="Please enter your email address to request a password reset">
      <View className="flex items-center gap-8">
        <EmailInput value={email} onChangeText={setEmail} onSubmitEditing={requestReset} />
      </View>

      <View className="flex flex-row justify-evenly items-center mt-10">
        <CancelButton onPress={cleanup} />
        <ResetButton onPress={requestReset} />
      </View>
    </LoginContainer>
  );
};
