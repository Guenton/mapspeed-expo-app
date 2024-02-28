import { Link } from 'expo-router';
import { Pressable, Text } from 'react-native';

import { passwordForgotPage } from '$lib/navigation/pages';

export default () => {
  return (
    <Link href={passwordForgotPage} asChild>
      <Pressable>
        <Text style={{ fontFamily: 'Manrope' }} className="underline text-primary m-1">
          Forgot Password?
        </Text>
      </Pressable>
    </Link>
  );
};
