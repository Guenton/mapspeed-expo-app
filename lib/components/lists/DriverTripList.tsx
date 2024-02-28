import { View, Text, FlatList, Pressable } from 'react-native';
import { useRecoilValue } from 'recoil';

import HorizontalListDivider from './HorizontalListDivider';
import ListFooter from './ListFooter';

import { getDateFromNowFromServerMix, getTimeStringUserFriendly } from '$lib/functions/calendar';
import { gotoDriverTripPageById } from '$lib/navigation/navigate';
import { tripListState } from '$lib/store/trip';
import { TripFormat } from '$lib/types/trip';
import FlatListItemHeader from '@/content/FlatListItemHeader';

type ListProps = {
  trip: TripFormat;
};

export default () => {
  const tripList = useRecoilValue(tripListState);

  return (
    <View className="my-5">
      <FlatList
        data={tripList}
        renderItem={({ item }) => <TripListItem trip={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={HorizontalListDivider}
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const TripListItem = ({ trip }: ListProps) => {
  const time = trip.tripTime ? getTimeStringUserFriendly(trip.tripTime) : '';
  const origin = trip.origin?.name ?? trip.originAddress?.address ?? '';
  const destination = trip.destination?.name ?? trip.destinationAddress?.address ?? '';
  const status = trip.status;

  const dateTime =
    trip.date_time && trip.tripTime
      ? getDateFromNowFromServerMix(trip.date_time, trip.tripTime)
      : '';

  return (
    <Pressable
      className="bg-surface-200 dark:bg-surface-600 p-3 rounded-xl min-w-60"
      onPress={() => gotoDriverTripPageById(trip.id)}>
      <View className="my-3">
        <FlatListItemHeader label="Route" />
        <Text
          style={{ fontFamily: 'Manrope_Bold', fontSize: 16 }}
          className="text-primary dark:text-surface-300">
          {origin}
        </Text>
        <Text
          style={{ fontFamily: 'Manrope_Bold', fontSize: 16 }}
          className="text-primary dark:text-surface-300">
          {destination}
        </Text>
      </View>

      <View className="my-3">
        <FlatListItemHeader label="Time" />
        <View className="flex flex-row gap-1">
          <Text style={{ fontFamily: 'Manrope', fontSize: 13 }} className="dark:text-tertiary-400">
            {time}
          </Text>
          <Text style={{ fontFamily: 'Manrope', fontSize: 13 }} className="dark:text-tertiary-400">
            {dateTime}
          </Text>
        </View>
      </View>

      <View className="my-3">
        <FlatListItemHeader label="Status" />
        <View className="flex">
          <Text style={{ fontFamily: 'Manrope_Bold', fontSize: 16 }} className="dark:text-white">
            {status}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
