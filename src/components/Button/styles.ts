import { StyleSheet } from 'react-native';
import { MIN_PADDING_X, MIN_PADDING_Y } from '../../styles';

export const touchableStyles = StyleSheet.create({
  base: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: MIN_PADDING_X,
    paddingVertical: MIN_PADDING_Y,
  },
});
