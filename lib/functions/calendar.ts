import moment from 'moment';

import type { DayName, MonthName } from '$lib/types/calendar';

// Constants

/** Current day in `Date` format */
export const today = new Date();
/** Array of all Days in `string` format starting with `"Sunday"` in the `[0]` position */
export const dayNameList: DayName[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
/** Array of all Months in `string` format starting with `"January"` in the `[0]` position */
export const monthNameList: MonthName[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Date Functions

/** Pass a `Date` format to receive a user friendly Formatted DateTime `string` */
export const getDateTimeStringUserFriendly = (date: Date) =>
  moment(date).format('dddd, MMMM Do YYYY, h:mm:ss A');
/** Pass a `Date` to receive a user friendly Formatted Date `string` */
export const getDateStringUserFriendly = (date: Date) => moment(date).format('dddd, MMMM Do YYYY');
/** Server Date Format is `"YYYY-MM-DD"` pass it to receive a user friendly Formatted Date `string` */
export const getDateStringUserFriendlyFromServerDate = (date: string) =>
  moment(new Date(date + 'T00:00')).format('dddd, MMMM DD, YYYY');
/** Server Date Format is `"YYYY-MM-DD"` pass it to receive a user friendly Formatted Date `string` */
export const getDateFromNowFromServerDate = (date: string) =>
  moment(new Date(date + 'T00:00')).fromNow();
/** Server Date Format is `"YYYY-MM-DD"` pass it to receive a user friendly Formatted Date of Birth `string` */
export const getDobStringUserFriendlyFromServerDate = (date: string) =>
  moment(new Date(date + 'T00:00')).format('DD-MMMM-YYYY');
/** Server Date Format is `"YYYY-MM-DD"` pass a `Date` to receive it. */
export const getServerDateFormatByDate = (date: Date) => moment(date).format('YYYY-MM-DD');
/** Input Date Format is `"YYYY-MM-DD"` pass a `Date` to receive it. */
export const getInputDateFormatByDate = (date: Date) => moment(date).format('YYYY-MM-DD');
/** Input Date Format is `"YYYY-MM-DD"` pass it to this function to receive a `Date` Object */
export const getDateObjectByDateInput = (date: string) => new Date(date + 'T00:00');
/** Pass a `Date` to receive a `Date` that is 7 days earlier */
export const getDateMinus7Days = (date: Date) => new Date(date.setDate(date.getDate() - 7));
/** Pass a `Date` to receive a `Date` that is 7 days later */
export const getDatePlus7Days = (date: Date) => new Date(date.setDate(date.getDate() + 7));

// Day Functions

/**
 * Gets the `DayName` string by the given `index` number
 * @example getDayNamebyIndex(2) // returns "Tuesday"
 */
export const getDayNamebyIndex = (index: number): DayName => dayNameList[index];
/**
 * Gets the `index` number by the given `DayName` string
 * @example getIndexByDayName("Tuesday") // returns 2
 */
export const getIndexByDayName = (dayName: DayName): number => dayNameList.indexOf(dayName);

// Month Functions

/**
 * Gets the `MonthName` string by the given `index` number
 * @example getMonthNamebyIndex(2) // returns "March"
 */
export const getMonthNamebyIndex = (index: number): MonthName => monthNameList[index];
/**
 * Gets the `index` number by the given `MonthName` string
 * @example getIndexByMonthName("March") // returns 2
 */
export const getIndexByMonthName = (monthName: MonthName): number =>
  monthNameList.indexOf(monthName);

// Time Functions
/** Server Time Format is `"HH:mm:ss"` Pass it to receive a user friendly Formatted Time `string` */
export const getTimeStringUserFriendly = (time: string) =>
  moment(time, 'HH:mm:ss').format('h:mm A');

/** Input Time Format is `"hh:mm"` Pass it to receive a the server Server Time Format as `"HH:mm:ss"` */
export const getServerTimeFromInputTime = (time: string) =>
  moment(time, 'hh:mm').format('HH:mm:ss');

/** Server Time Format as `"HH:mm:ss"` Pass it to receive a the Input Time Format as `"hh:mm"` */
export const getInputTimeFromServerTime = (time: string) =>
  moment(time, 'HH:mm:ss').format('hh:mm');

// Mixed Functions
/**
 * Server Date Format is `"YYYY-MM-DD"`
 *
 * Server Time Format is `"HH:mm:ss"`
 *
 * Pass them both to mix them into auser friendly Formatted Date `string`
 *
 */
export const getDateFromNowFromServerMix = (date: string, time: string) =>
  moment(new Date(date + ' ' + time)).fromNow();
