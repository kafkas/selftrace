import { Platform } from 'react-native';

export const MAIN_FONT_FAMILY = Platform.select({
  //   ios: 'Helvetica Neue',
  android: 'notoserif',
});

export const HEADER_FONT_FAMILY = Platform.select({
  ios: 'AvenirNext-Heavy',
  android: 'notoserif',
});
