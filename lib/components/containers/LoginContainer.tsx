import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import DarkToggle from '@/buttons/DarkToggle';
import FapLogo from '@/content/FapLogo';
import FlatAlert from '@/content/FlatAlert';
import SurfaceHeader from '@/content/SurfaceHeader';

type Props = {
  label: string;
  children?: React.ReactNode;
};

export default ({ label, children }: Props) => {
  return (
    <View className="flex-1 gap-5 mx-12 my-5">
      <View className="flex flex-col items-end">
        <DarkToggle withLabel />
      </View>

      <FapLogo />

      <KeyboardAwareScrollView enableOnAndroid>
        <View className="flex flex-col items-center my-10">
          <SurfaceHeader label={label} />
        </View>

        <View className="flex-1">{children}</View>
      </KeyboardAwareScrollView>

      <FlatAlert />
    </View>
  );
};
