import { Text } from 'react-native';

type Props = {
  label: string;
};

export default ({ label }: Props) => {
  return (
    <Text
      style={{ fontFamily: 'Outfit_Bold', fontSize: 25 }}
      className="Text my-8 text-primary-500 text-center">
      {label}
    </Text>
  );
};
