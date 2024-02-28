import { Image, View } from 'react-native';

const imageSource = require('../../../assets/images/FapLogo.png');

export default () => {
  return (
    <View className="mx-auto">
      <Image source={imageSource} />
    </View>
  );
};
