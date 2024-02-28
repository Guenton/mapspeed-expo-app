import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return (
    <View className="flex-1 px-7 bg-surface-100 dark:bg-surface-800">
      <KeyboardAwareScrollView enableOnAndroid>{children}</KeyboardAwareScrollView>
    </View>
  );
};
