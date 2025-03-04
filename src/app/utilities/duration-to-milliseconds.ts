import { add, type Duration } from 'date-fns';

export function durationToMilliseconds(duration: Duration) {
  return add(new Date(0), duration).getTime();
}
