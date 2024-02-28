import moment from 'moment';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { getTimeStringUserFriendly } from '$lib/functions/calendar';
import { gotoRootPage } from '$lib/navigation/navigate';
import endTripByIdAsync from '$lib/services/trips/endTripByIdAsync';
import fetchUpcomingTripsByDriverId from '$lib/services/trips/fetchUpcomingTripsByDriverId';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { userIdState } from '$lib/store/auth';
import { activeTripState, selectedTripState, tripListState } from '$lib/store/trip';
import { TripPassengerFormat } from '$lib/types/trip';
import CompleteButton from '@/buttons/CompleteButton';
import FlexContentContainer from '@/containers/FlexContentContainer';
import MainScrollContainer from '@/containers/MainScrollContainer';
import SideBySideButtonContainer from '@/containers/SideBySideButtonContainer';
import SideBySideInputContainer from '@/containers/SideBySideInputContainer';
import SurfaceContainer from '@/containers/SurfaceContainer';
import PageHeader from '@/content/PageHeader';
import SurfaceHeader from '@/content/SurfaceHeader';
import DisabledInput from '@/inputs/DisabledInput';
import DriverTripList from '@/lists/DriverTripList';
import ListDivider from '@/lists/ListDivider';

export default () => {
  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const [activeTrip, setActiveTrip] = useRecoilState(activeTripState);
  const selectedTrip = useRecoilValue(selectedTripState);

  const setTripList = useSetRecoilState(tripListState);
  const userId = useRecoilValue(userIdState);

  const [hasActiveTrip, setHasActiveTrip] = useState(false);

  const [isOngoing, setIsOngoing] = useState(false);
  const [startedAt, setStartedAt] = useState('');
  const [completedAt, setCompletedAt] = useState('');
  const [timeOfTrip, setTimeOfTrip] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [passengerList, setPassengerList] = useState<TripPassengerFormat[]>([]);

  useEffect(() => {
    const fetchTripsController = new AbortController();

    setIsLoading(true);
    fetchUpcomingTripsByDriverId(userId)
      .then((trips) => {
        if (trips.length === 0) {
          setAlertType('info');
          setAlertText('No upcoming Trips In your Itinerary');
        }
        setTripList(trips);
      })
      .catch((error: Error) => {
        if (error.message === 'Forbidden') return gotoRootPage();
        setAlertType('error');
        setAlertText('UPCOMING TRIPS: ' + error.message);
      })
      .finally(() => setIsLoading(false));

    return () => {
      fetchTripsController.abort();
    };
  }, [userId, selectedTrip, activeTrip]);

  useEffect(() => {
    // Check if Active
    if (!activeTrip) return setHasActiveTrip(false);
    if (!activeTrip.trip) return setHasActiveTrip(false);
    setHasActiveTrip(true);
    if (!activeTrip.isOngoing) setIsOngoing(false);
    if (activeTrip.isOngoing) setIsOngoing(true);

    // Times
    setStartedAt(moment(activeTrip.startedAt).format('h:mm A'));
    if (activeTrip.completedAt) setCompletedAt(moment(activeTrip.completedAt).format('h:mm A'));
    if (activeTrip.trip.tripTime) {
      setTimeOfTrip(getTimeStringUserFriendly(activeTrip.trip.tripTime));
    }
    if (activeTrip.completedAt) {
      const start = moment(activeTrip.startedAt);
      const end = moment(activeTrip.completedAt);
      const diff = end.diff(start, 'minutes');
      setTripDuration(`${diff} Minutes`);
    }

    // Origin and Destination
    setOrigin(activeTrip.trip.origin?.name ?? activeTrip.trip.originAddress?.address ?? '');
    setDestination(
      activeTrip.trip.destination?.name ?? activeTrip.trip.destinationAddress?.address ?? '',
    );
    // Passenger List
    setPassengerList(activeTrip.trip.clients);
  }, [activeTrip]);

  const endTrip = () => {
    setIsLoading(true);
    endTripByIdAsync(activeTrip.trip.id)
      .then((trip) => {
        setActiveTrip((activeTrip) => ({
          isOngoing: false,
          startedAt: activeTrip.startedAt,
          completedAt: new Date(),
          trip,
        }));
        setAlertType('info');
        setAlertText(`END TRIP: Trip #${trip.id} was completed at ${moment().format('h:mm A')}`);
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
      <View className="flex flex-col">
        <PageHeader label="Driver Trips" />
        <SurfaceContainer>
          <SurfaceHeader label="Upcoming Trips" />
        </SurfaceContainer>

        <DriverTripList />

        {hasActiveTrip && (
          <>
            <SurfaceContainer>
              <SurfaceHeader label="Current Trip Information" />
              <FlexContentContainer>
                <SideBySideInputContainer>
                  <DisabledInput
                    value={startedAt}
                    label="Actual Start"
                    placeholder="Actual Start"
                  />
                  <DisabledInput
                    value={timeOfTrip}
                    label="Scheduled Start"
                    placeholder="Scheduled Start"
                  />
                </SideBySideInputContainer>

                {!isOngoing && (
                  <SideBySideInputContainer>
                    <DisabledInput
                      value={completedAt}
                      label="Completed At"
                      placeholder="Completed At"
                    />
                    <DisabledInput
                      value={tripDuration}
                      label="Trip Duration"
                      placeholder="Trip Duration"
                    />
                  </SideBySideInputContainer>
                )}

                <DisabledInput value={origin} label="Origin" placeholder="Origin" />
                <DisabledInput value={destination} label="Destination" placeholder="Destination" />
              </FlexContentContainer>
            </SurfaceContainer>

            {isOngoing && (
              <SideBySideButtonContainer>
                <CompleteButton onPress={endTrip} />
              </SideBySideButtonContainer>
            )}
            {!isOngoing && <ListDivider />}

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
          </>
        )}
      </View>
    </MainScrollContainer>
  );
};
