import { View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return <View className="flex gap-5 my-2">{children}</View>;
};
