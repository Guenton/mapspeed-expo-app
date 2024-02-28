import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';

import { alertTextState, alertTypeState } from '$lib/store';

export default () => {
  const [alertText, setAlertText] = useRecoilState(alertTextState);
  const [alertType, setAlertType] = useRecoilState(alertTypeState);

  const dismissAlert = () => {
    setAlertText('');
    setAlertType('');
  };

  return (
    <View className="mx-2">
      {alertText && alertType === 'info' && (
        <Pressable
          className="flex flex-row justify-between items-center h-16 my-2 rounded-lg shadow bg-primary-400 p-3 w-full"
          onPress={dismissAlert}>
          <Icon name="information-variant" size={25} />
          <Text>{alertText}</Text>
          <Icon name="close" size={20} />
        </Pressable>
      )}

      {alertText && alertType === 'success' && (
        <Pressable
          className="flex flex-row justify-between items-center h-16 my-2 rounded-lg shadow bg-success-400 p-3 w-full"
          onPress={dismissAlert}>
          <Icon name="play" size={25} />
          <Text>{alertText}</Text>
          <Icon name="close" size={20} />
        </Pressable>
      )}

      {alertText && alertType === 'warning' && (
        <Pressable
          className="flex flex-row justify-between items-center h-16 my-2 rounded-lg shadow bg-warning-400 p-3 w-full"
          onPress={dismissAlert}>
          <Icon name="pause" size={25} />
          <Text>{alertText}</Text>
          <Icon name="close" size={20} />
        </Pressable>
      )}

      {alertText && alertType === 'error' && (
        <Pressable
          className="flex flex-row justify-between items-center h-16 my-2 rounded-lg shadow bg-error-400 p-3 w-full"
          onPress={dismissAlert}>
          <Icon name="stop" size={25} />
          <Text>{alertText}</Text>
          <Icon name="close" size={20} />
        </Pressable>
      )}

      {alertText && alertType === '' && (
        <Pressable
          className="flex flex-row justify-between items-center h-16 my-2 rounded-lg shadow bg-surface-400 p-3 w-full"
          onPress={dismissAlert}>
          <Icon name="chat-question" size={25} />
          <Text>{alertText}</Text>
          <Icon name="close" size={20} />
        </Pressable>
      )}
    </View>
  );
};
