import { useCameraPermissions } from 'expo-camera/next';
import { useEffect } from 'react';
import { View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { gotoDriverQrPage, gotoDriverTripPageById } from '$lib/navigation/navigate';
import fetchTodayTripsByClientId from '$lib/services/trips/fetchTodayTripsByClientId';
import fetchUserByQrCode from '$lib/services/users/fetchUserByQrCode';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { qrScanState } from '$lib/store/trip';
import ScanQrButton from '@/buttons/ScanQrButton';
import MainContainer from '@/containers/MainContainer';

export default () => {
  const [permission, requestPermission] = useCameraPermissions();

  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [qrScan, setQrScan] = useRecoilState(qrScanState);

  useEffect(() => {
    if (!permission) {
      setIsLoading(true);
      requestPermission()
        .then((result) => {
          if (!result.granted) {
            setAlertType('warning');
            setAlertText('Phone Scanner Use Rejected');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [permission]);

  useEffect(() => {
    if (!qrScan) return;
    const fetchUserController = new AbortController();

    setIsLoading(true);
    fetchUserByQrCode(qrScan, fetchUserController)
      .then((user) => fetchTodayTripsByClientId(user.id))
      .then((trips) => gotoDriverTripPageById(trips[0].id))
      .catch((error: Error) => {
        setAlertType('error');
        setAlertText('QR SCAN: ' + error.message);
      })
      .finally(() => {
        setQrScan('');
        setIsLoading(false);
      });
  }, [qrScan]);

  const onStartScanner = () => gotoDriverQrPage();

  return (
    <MainContainer>
      <View className="flex-1 flex items-center justify-center">
        <ScanQrButton onPress={onStartScanner} />
      </View>
    </MainContainer>
  );
};
