import { setKey, getKey } from './keys';
import { Wellbeing } from '../data-types';

/*
 * lastProcessedEventNumber
 */
const setWellbeing = (wellbeing: Wellbeing) =>
  setKey<number>('wellbeing', wellbeing, 'integer');

const getWellbeing = () => getKey<Wellbeing>('wellbeing', 'integer');

/**
 * Some abstractions over existing methods for reusability.
 */
export const abstract = {
  setWellbeing,
  getWellbeing,
};
