import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRecoilValue } from 'recoil';

import { qrCodeState } from '$lib/store/auth';
import { primary, secondary, surface, white } from '$lib/theme/colors';
import SurfaceHeader from '@/content/SurfaceHeader';

const logo = require('../../../assets/images/FapSquare.png');

export default () => {
  const { colorScheme } = useColorScheme();
  const qrCode = useRecoilValue(qrCodeState);
  const noQrCode = 'You do not appear to have a QR Code, please contact your administrator';

  const lightGradient = [primary[500], surface[700]];
  const darkGradient = [white, secondary[400]];

  return (
    <View className="flex items-center">
      {qrCode && (
        <QRCode
          value={qrCode ? qrCode : ''}
          backgroundColor={colorScheme === 'dark' ? surface[800] : surface[100]}
          logo={logo}
          logoBackgroundColor={colorScheme === 'dark' ? surface[800] : surface[100]}
          logoMargin={0}
          size={300}
          logoBorderRadius={50}
          enableLinearGradient
          linearGradient={colorScheme === 'dark' ? darkGradient : lightGradient}
        />
      )}
      {!qrCode && <SurfaceHeader label={noQrCode} />}
    </View>
  );
};
