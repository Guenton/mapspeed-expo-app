import { Image } from 'react-native';

const imageSource = require('../../../assets/images/FapLogo.png');

export default () => {
  return <Image style={{ height: 50, width: 125 }} source={imageSource} resizeMode="contain" />;
};
