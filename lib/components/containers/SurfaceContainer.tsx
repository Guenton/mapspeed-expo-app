import { View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export default ({ children }: Props) => {
  return (
    <View className="p-3 bg-surface-200 dark:bg-surface-600 w-full rounded-xl">{children}</View>
  );
};
