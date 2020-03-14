import { Platform, TextStyle } from 'react-native';
import { INACTIVE_TEXT_COLOR } from './colors';

export const INACTIVE_TEXT_STYLES: TextStyle = {
  fontWeight: '600',
  color: INACTIVE_TEXT_COLOR.toString(),
};

export const MAIN_FONT_FAMILY = Platform.select({
  //   ios: 'Helvetica Neue',
  android: 'notoserif',
});

export const HEADER_FONT_FAMILY = Platform.select({
  ios: 'AvenirNext-Heavy',
  android: 'notoserif',
});
