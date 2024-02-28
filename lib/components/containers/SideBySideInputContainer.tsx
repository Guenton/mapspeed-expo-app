import { View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return <View className="flex-1 flex-row gap-5">{children}</View>;
};
