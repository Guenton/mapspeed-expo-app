import { useEffect } from 'react';
import { View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { gotoRootPage } from '$lib/navigation/navigate';
import fetchUpcomingTripsByClientId from '$lib/services/trips/fetchUpcomingTripsByClientId';
import { alertTextState, alertTypeState, isLoadingState } from '$lib/store';
import { userIdState } from '$lib/store/auth';
import { tripListState } from '$lib/store/trip';
import FlexContentContainer from '@/containers/FlexContentContainer';
import MainContainer from '@/containers/MainContainer';
import SurfaceContainer from '@/containers/SurfaceContainer';
import PageHeader from '@/content/PageHeader';
import SurfaceHeader from '@/content/SurfaceHeader';
import ClientTripList from '@/lists/ClientTripList';

export default () => {
  const setAlertType = useSetRecoilState(alertTypeState);
  const setAlertText = useSetRecoilState(alertTextState);
  const setIsLoading = useSetRecoilState(isLoadingState);

  const userId = useRecoilValue(userIdState);

  const setTripList = useSetRecoilState(tripListState);

  useEffect(() => {
    const fetchTripsController = new AbortController();

    setIsLoading(true);
    fetchUpcomingTripsByClientId(userId)
      .then((trips) => {
        if (trips.length === 0) {
          setAlertType('info');
          setAlertText('No upcoming Trips scheduled yet');
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
  }, [userId]);

  return (
    <MainContainer>
      <View className="flex flex-col items-center">
        <PageHeader label="Trips" />
        <SurfaceContainer>
          <SurfaceHeader label="Upcoming Trips" />
          <FlexContentContainer>
            <ClientTripList />
          </FlexContentContainer>
        </SurfaceContainer>
      </View>
    </MainContainer>
  );
};
