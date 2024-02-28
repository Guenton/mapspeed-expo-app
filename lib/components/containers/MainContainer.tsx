import { View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return <View className="flex-1 flex px-7 bg-surface-100 dark:bg-surface-800">{children}</View>;
};
