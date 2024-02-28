import { View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return <View className="w-full flex-row justify-evenly my-8">{children}</View>;
};
