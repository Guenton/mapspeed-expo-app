import { View, Text, FlatList, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';

import ListDivider from './ListDivider';
import ListFooter from './ListFooter';

import {
  getDateStringUserFriendlyFromServerDate,
  getDateFromNowFromServerMix,
  getTimeStringUserFriendly,
} from '$lib/functions/calendar';
import { gotoClientTripPageById } from '$lib/navigation/navigate';
import { tripListState } from '$lib/store/trip';
import { TripFormat } from '$lib/types/trip';

type ListProps = {
  trip: TripFormat;
};

export default () => {
  const tripList = useRecoilValue(tripListState);

  return (
    <FlatList
      data={tripList}
      renderItem={({ item }) => <TripListItem trip={item} />}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={ListDivider}
      ListFooterComponent={ListFooter}
      showsVerticalScrollIndicator={false}
    />
  );
};

const TripListItem = ({ trip }: ListProps) => {
  const date = trip.date_time ? getDateStringUserFriendlyFromServerDate(trip.date_time) : '';
  const time = trip.tripTime ? getTimeStringUserFriendly(trip.tripTime) : '';
  const destination = trip.destination?.name ?? trip.destinationAddress?.address ?? '';
  const status = trip.status;

  const dateTime =
    trip.date_time && trip.tripTime
      ? getDateFromNowFromServerMix(trip.date_time, trip.tripTime)
      : '';

  return (
    <Pressable className="flex-1 flex-row" onPress={() => gotoClientTripPageById(trip.id)}>
      <View className="flex-1 flex">
        <Text
          style={{ fontFamily: 'Manrope_Bold', fontSize: 16 }}
          className="text-primary dark:text-surface-300">
          {destination}
        </Text>

        {dateTime && (
          <Text style={{ fontFamily: 'Manrope', fontSize: 13 }} className="dark:text-tertiary-400">
            {dateTime}
          </Text>
        )}
        {!dateTime && (
          <View className="flex flex-row gap-1">
            <Text
              style={{ fontFamily: 'Manrope', fontSize: 13 }}
              className="dark:text-tertiary-400">
              {date}
            </Text>
            <Text
              style={{ fontFamily: 'Manrope', fontSize: 13 }}
              className="dark:text-tertiary-400">
              {time}
            </Text>
          </View>
        )}
      </View>

      <View className="flex w-32 rounded items-center">
        <Text style={{ fontFamily: 'Manrope_Bold', fontSize: 16 }} className="dark:text-white">
          {status}
        </Text>
      </View>
    </Pressable>
  );
};
