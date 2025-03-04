import { add, differenceInMilliseconds, type Duration } from 'date-fns';

export function durationToMilliseconds(duration: Duration) {
  const startDate = new Date(0);
  const endDate = add(new Date(0), duration);
  return differenceInMilliseconds(endDate, startDate);
}
