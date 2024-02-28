import { Text } from 'react-native';

type Props = {
  label: string;
};

export default ({ label }: Props) => {
  return (
    <Text
      style={{ fontFamily: 'Outfit', fontSize: 20 }}
      className="Text mb-3 text-surface-500 dark:text-surface-400">
      {label}
    </Text>
  );
};
