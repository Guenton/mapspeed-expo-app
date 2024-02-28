import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { GestureResponderEvent, ActivityIndicator, Pressable, Text } from 'react-native';
import { useRecoilValue } from 'recoil';

import { isLoadingState } from '$lib/store';
import { white } from '$lib/theme/colors';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export default ({ onPress, disabled }: Props) => {
  const isLoading = useRecoilValue(isLoadingState);

  return (
    <Pressable
      className="flex flex-row gap-1 items-center bg-primary-500 py-2 px-4 rounded-full justify-evenly"
      onPress={onPress}
      disabled={disabled}>
      {isLoading && <ActivityIndicator color={white} />}
      {!isLoading && <Icon name="logout" size={20} color={white} />}
      <Text style={{ fontFamily: 'Manrope' }} className="text-white">
        Logout
      </Text>
    </Pressable>
  );
};
