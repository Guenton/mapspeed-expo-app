import { View } from 'react-native';

import FlatAlert from './FlatAlert';

import NavAccountButton from '@/buttons/NavAccountButton';
import NavQrButton from '@/buttons/NavQrButton';
import NavTripsButton from '@/buttons/NavTripsButton';

// @ts-expect-error "Too Lazy to code React Navigation types for just one component"
export default ({ navigation, state }) => {
  const activeRoute: string = state.routes[state.index].name;

  return (
    <>
      <FlatAlert />
      <View className="flex flex-row justify-between items-center bg-surface-200 dark:bg-surface-600">
        <NavQrButton
          isActive={activeRoute === 'index' || activeRoute === 'qr'}
          onPress={() => navigation.navigate('index')}
        />
        <NavTripsButton
          isActive={activeRoute.startsWith('trips')}
          onPress={() => navigation.navigate('trips/index')}
        />
        <NavAccountButton
          isActive={activeRoute === 'account'}
          onPress={() => navigation.navigate('account')}
        />
      </View>
    </>
  );
};
