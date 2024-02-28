import { Tabs } from 'expo-router';
import { View } from 'react-native';

import AppBar from '@/content/AppBar';
import BottomNav from '@/content/BottomNav';

export default () => {
  return (
    <View className="flex-1">
      <AppBar />

      <Tabs tabBar={BottomNav} screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" />
        <Tabs.Screen name="trips/index" />
        <Tabs.Screen name="account" />
      </Tabs>
    </View>
  );
};
