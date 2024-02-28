import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RecoilRoot } from 'recoil';

// Tailwind Global Css
import '../global.css';

import { surface } from '$lib/theme/colors';
import ScreenContainer from '@/containers/ScreenContainer';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default () => {
  const { colorScheme } = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Manrope: require('../assets/fonts/Manrope-Regular.ttf'),
    Manrope_Bold: require('../assets/fonts/Manrope-Bold.ttf'),
    Outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    Outfit_Bold: require('../assets/fonts/Outfit-Bold.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (colorScheme === 'light') {
      StatusBar.setBarStyle('dark-content', true);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(surface[200]);
        NavigationBar.setBackgroundColorAsync(surface[200]);
        NavigationBar.setButtonStyleAsync('dark');
      }
    }
    if (colorScheme === 'dark') {
      StatusBar.setBarStyle('light-content', true);
      if (Platform.OS === 'android') {
        StatusBar.setBackgroundColor(surface[600]);
        NavigationBar.setBackgroundColorAsync(surface[600]);
        NavigationBar.setButtonStyleAsync('light');
      }
    }
  }, [colorScheme]);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <View className="h-screen flex-1 bg-surface-100 dark:bg-surface-800">
          <SafeAreaView>
            <ScreenContainer>
              <Slot />
            </ScreenContainer>
          </SafeAreaView>
        </View>
      </RecoilRoot>
    </SafeAreaProvider>
  );
};
