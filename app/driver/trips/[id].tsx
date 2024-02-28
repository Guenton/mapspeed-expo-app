import { useLocalSearchParams } from 'expo-router';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRecoilState, useSetRecoilState } from 'recoil';

import {
  getDateStringUserFriendlyFromServerDate,
  getTimeStringUserFriendly,
} from '$lib/functions/calendar';
import { gotoDriverTripPage, gotoRootPage } from '$lib/navigation/navigate';
import endTripByIdAsync from '$lib/services/trips/endTripByIdAsync';
import fetchTripById from '$lib/services/trips/fetchTripById';
import startTripByIdAsync from '$lib/services/trips/startTripByIdAsync';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { activeTripState, selectedTripState } from '$lib/store/trip';
import { TripPassengerFormat } from '$lib/types/trip';
import CancelButton from '@/buttons/CancelButton';
import CompleteButton from '@/buttons/CompleteButton';
import StartButton from '@/buttons/StartButton';
import FlexContentContainer from '@/containers/FlexContentContainer';
import MainScrollContainer from '@/containers/MainScrollContainer';
import SideBySideButtonContainer from '@/containers/SideBySideButtonContainer';
import SideBySideInputContainer from '@/containers/SideBySideInputContainer';
import SurfaceContainer from '@/containers/SurfaceContainer';
import PageHeader from '@/content/PageHeader';
import SurfaceHeader from '@/content/SurfaceHeader';
import DisabledInput from '@/inputs/DisabledInput';
import ListDivider from '@/lists/ListDivider';

export default () => {
  const { id } = useLocalSearchParams();

  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [selectedTrip, setSelectedTrip] = useRecoilState(selectedTripState);
  const [activeTrip, setActiveTrip] = useRecoilState(activeTripState);

  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [timeOfTrip, setTimeOfTrip] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [isInvoiced, setIsInvoiced] = useState('No');
  const [passengerAmount, setPassengerAmount] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [remarks, setRemarks] = useState('');
  const [passengerList, setPassengerList] = useState<TripPassengerFormat[]>([]);

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
  }, [id, activeTrip]);

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

    // Additional Information
    setRemarks(selectedTrip.remarks ?? '');
    setVehicle(selectedTrip.vehicle?.name ?? selectedTrip.vehicle?.license_plate ?? '');
    setPassengerAmount(
      selectedTrip.passenger_number
        ? selectedTrip.passenger_number.toString()
        : selectedTrip.clients?.length.toString(),
    );
    setIsInvoiced(selectedTrip.invoiced ? 'Yes' : 'No');

    // Passenger List
    setPassengerList(selectedTrip.clients);
  }, [selectedTrip]);

  const startTrip = () => {
    setIsLoading(true);
    startTripByIdAsync(selectedTrip.id)
      .then((trip) => {
        setActiveTrip({
          isOngoing: true,
          startedAt: new Date(),
          trip,
        });
        setAlertType('info');
        setAlertText(`START TRIP: Trip #${trip.id} was started at ${moment().format('h:mm A')}`);
        return gotoDriverTripPage();
      })
      .catch((error: Error) => {
        if (error.message === 'Forbidden') return gotoRootPage();
        setAlertType('error');
        setAlertText('START TRIP: ' + error.message);
      })
      .finally(() => setIsLoading(false));
  };

  const endTrip = () => {
    setIsLoading(true);
    endTripByIdAsync(selectedTrip.id)
      .then((trip) => {
        setActiveTrip((activeTrip) => ({
          isOngoing: false,
          startedAt: activeTrip.startedAt,
          completedAt: new Date(),
          trip,
        }));
        setAlertType('info');
        setAlertText(`END TRIP: Trip #${trip.id} was completed at ${moment().format('h:mm A')}`);
        return gotoDriverTripPage();
      })
      .catch((error: Error) => {
        if (error.message === 'Forbidden') return gotoRootPage();
        setAlertType('error');
        setAlertText('END TRIP: ' + error.message);
      })
      .finally(() => setIsLoading(false));
  };

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
          <CancelButton onPress={gotoDriverTripPage} />
          {status === 'IN_PROGRESS' && <CompleteButton onPress={endTrip} />}
          {status !== 'IN_PROGRESS' && <StartButton onPress={startTrip} />}
        </SideBySideButtonContainer>

        <SurfaceContainer>
          <SurfaceHeader label="Additional Information" />
          <FlexContentContainer>
            <DisabledInput value={remarks} label="Remarks" placeholder="Remarks" />
            <DisabledInput value={vehicle} label="Vehicle" placeholder="Vehicle" />

            <SideBySideInputContainer>
              <DisabledInput value={passengerAmount} label="Passengers" placeholder="Amount" />
              <DisabledInput value={isInvoiced} label="Invoiced" placeholder="Invoiced" />
            </SideBySideInputContainer>
          </FlexContentContainer>
        </SurfaceContainer>

        <ListDivider />

        <SurfaceContainer>
          <SurfaceHeader label="Passenger list" />
          <FlexContentContainer>
            {passengerList?.map((passenger) => (
              <Text
                key={passenger.id}
                style={{ fontFamily: 'Manrope' }}
                className="ml-3 dark:text-white">
                - {passenger.firstName} {passenger.lastName} - Bric ID#{passenger.bricID}
              </Text>
            ))}
          </FlexContentContainer>
        </SurfaceContainer>

        <ListDivider />
      </View>
    </MainScrollContainer>
  );
};
