import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  getDateStringUserFriendlyFromServerDate,
  getTimeStringUserFriendly,
} from '$lib/functions/calendar';
import { gotoClientTripPage, gotoRootPage } from '$lib/navigation/navigate';
import fetchTripById from '$lib/services/trips/fetchTripById';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { selectedTripState } from '$lib/store/trip';
import CancelButton from '@/buttons/CancelButton';
import FlexContentContainer from '@/containers/FlexContentContainer';
import MainScrollContainer from '@/containers/MainScrollContainer';
import SideBySideButtonContainer from '@/containers/SideBySideButtonContainer';
import SideBySideInputContainer from '@/containers/SideBySideInputContainer';
import SurfaceContainer from '@/containers/SurfaceContainer';
import PageHeader from '@/content/PageHeader';
import SurfaceHeader from '@/content/SurfaceHeader';
import DisabledInput from '@/inputs/DisabledInput';

export default () => {
  const { id } = useLocalSearchParams();

  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [selectedTrip, setSelectedTrip] = useRecoilState(selectedTripState);

  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [timeOfTrip, setTimeOfTrip] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    if (Array.isArray(id)) return;
    const fetchTripController = new AbortController();

    setIsLoading(true);
    fetchTripById(id, fetchTripController)
      .then((trip) => {
        setSelectedTrip(trip);
      })
      .catch((error: Error) => {
        if (error.message === 'Forbidden') return gotoRootPage();
        setAlertType('error');
        setAlertText('TRIP: ' + error.message);
      })
      .finally(() => setIsLoading(false));

    return () => {
      fetchTripController.abort();
    };
  }, [id]);

  useEffect(() => {
    if (!selectedTrip) return;

    // Date, Status, and Time
    setDate(
      selectedTrip.date_time ? getDateStringUserFriendlyFromServerDate(selectedTrip.date_time) : '',
    );
    setStatus(selectedTrip.status ?? '');
    setTimeOfTrip(selectedTrip.tripTime ? getTimeStringUserFriendly(selectedTrip.tripTime) : '');

    // Origin and Destination
    setOrigin(selectedTrip.origin?.name ?? selectedTrip.originAddress?.address ?? '');
    setDestination(
      selectedTrip.destination?.name ?? selectedTrip.destinationAddress?.address ?? '',
    );
  }, [selectedTrip]);

  return (
    <MainScrollContainer>
      <View className="flex flex-col items-center">
        <PageHeader label={`Trip #${id}`} />
        <SurfaceContainer>
          <SurfaceHeader label="Trip Information" />
          <FlexContentContainer>
            <DisabledInput value={date} label="Trip Date" placeholder="Trip Date" />

            <SideBySideInputContainer>
              <DisabledInput value={status} label="Trip Status" placeholder="Trip Status" />
              <DisabledInput value={timeOfTrip} label="Time" placeholder="Time" />
            </SideBySideInputContainer>

            <DisabledInput value={origin} label="Origin" placeholder="Origin" />
            <DisabledInput value={destination} label="Destination" placeholder="Destination" />
          </FlexContentContainer>
        </SurfaceContainer>

        <SideBySideButtonContainer>
          <CancelButton onPress={gotoClientTripPage} />
        </SideBySideButtonContainer>
      </View>
    </MainScrollContainer>
  );
};
