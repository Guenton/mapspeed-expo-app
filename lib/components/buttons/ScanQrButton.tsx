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
      className="flex flex-row items-center w-48 bg-primary-500 p-5 rounded-full justify-evenly"
      onPress={onPress}
      disabled={disabled}>
      {isLoading && <ActivityIndicator color={white} />}
      {!isLoading && <Icon name="qrcode-scan" size={30} color={white} />}
      <Text style={{ fontFamily: 'Manrope_Bold', fontSize: 20 }} className="text-white">
        Scan QR
      </Text>
    </Pressable>
  );
};
