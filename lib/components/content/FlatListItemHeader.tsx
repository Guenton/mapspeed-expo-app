import { Text } from 'react-native';

type Props = {
  label: string;
};

export default ({ label }: Props) => {
  return (
    <Text style={{ fontFamily: 'Outfit', fontSize: 16 }} className="dark:text-white">
      {label}
    </Text>
  );
};
