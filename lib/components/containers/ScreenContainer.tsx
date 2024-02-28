import { View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return <View className="h-full">{children}</View>;
};
