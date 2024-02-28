import { useColorScheme } from 'nativewind';
import { Switch, Text, View } from 'react-native';

import { secondary, surface } from '$lib/theme/colors';

type Props = {
  withLabel?: boolean;
};

export default ({ withLabel }: Props) => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View className="flex flex-row items-center mx-2">
      {withLabel && (
        <>
          <Text style={{ fontFamily: 'Manrope' }} className="flex dark:hidden">
            Dark Mode
          </Text>
          <Text style={{ fontFamily: 'Manrope' }} className="hidden dark:flex text-white">
            Light Mode
          </Text>
        </>
      )}

      <View className="ml-1">
        <Switch
          trackColor={{ false: surface[300], true: surface[50] }}
          thumbColor={secondary[500]}
          ios_backgroundColor={surface[300]}
          onValueChange={toggleColorScheme}
          value={colorScheme === 'light'}
        />
      </View>
    </View>
  );
};
