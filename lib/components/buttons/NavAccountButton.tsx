import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'nativewind';
import { Text, Pressable, GestureResponderEvent } from 'react-native';

import { black, primary, white } from '$lib/theme/colors';

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  isActive?: boolean;
};

export default ({ onPress, isActive }: Props) => {
  const { colorScheme } = useColorScheme();

  const color = colorScheme === 'dark' || isActive ? white : black;
  const backgroundColor = isActive ? primary[500] : 'transparent';

  return (
    <Pressable
      className="flex-1 flex items-center pb-4 pt-5 gap-3"
      style={{ backgroundColor }}
      onPress={onPress}>
      <Icon name="account" size={25} color={color} />
      <Text style={{ fontFamily: 'Outfit', fontSize: 16, color }}>Account</Text>
    </Pressable>
  );
};
