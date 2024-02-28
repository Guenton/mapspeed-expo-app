import { CameraMountError, CameraView, BarcodeScanningResult } from 'expo-camera/next';
import { useSetRecoilState } from 'recoil';

import { gotoDriverPage } from '$lib/navigation/navigate';
import { alertTextState, alertTypeState } from '$lib/store';
import { qrScanState } from '$lib/store/trip';
import CancelButton from '@/buttons/CancelButton';
import SideBySideButtonContainer from '@/containers/SideBySideButtonContainer';

export default () => {
  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);

  const setQrScan = useSetRecoilState(qrScanState);

  const onBarcodeScanned = (scan: BarcodeScanningResult) => {
    setQrScan(scan.data);
    gotoDriverPage();
  };

  const onCancelScan = () => gotoDriverPage();

  const onError = (error: CameraMountError) => {
    setAlertType('error');
    setAlertText('CAMERA: ' + error.message);
  };

  return (
    <CameraView
      style={{ flex: 1, flexDirection: 'column-reverse' }}
      type="back"
      barcodeScannerSettings={{ barCodeTypes: ['qr'] }}
      onBarcodeScanned={onBarcodeScanned}
      onMountError={onError}>
      <SideBySideButtonContainer>
        <CancelButton onPress={onCancelScan} />
      </SideBySideButtonContainer>
    </CameraView>
  );
};
