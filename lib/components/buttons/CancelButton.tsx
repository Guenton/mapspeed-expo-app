import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { GestureResponderEvent, Pressable, Text } from 'react-native';

import { white } from '$lib/theme/colors';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

export default ({ onPress, disabled }: Props) => {
  return (
    <Pressable
      className="flex flex-row items-center w-32 bg-tertiary-500 p-3 rounded-full justify-evenly"
      onPress={onPress}
      disabled={disabled}>
      <Icon name="step-backward" size={20} color={white} />
      <Text style={{ fontFamily: 'Manrope', fontSize: 16 }} className="text-white">
        Cancel
      </Text>
    </Pressable>
  );
};
