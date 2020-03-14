import { StyleSheet, Platform } from 'react-native';
import { W_WIDTH, W_HEIGHT, W_MARGIN, MAX_MARGIN_Y } from '../../styles';

// Image
export const IMAGE_SIZE = 160;
export const IMAGE_Y_POSITION = W_HEIGHT * 0.1;
export const IMAGE_X_POSITION = (W_WIDTH - IMAGE_SIZE) / 2;

// Title
export const TITLE_Y_POSITION = W_HEIGHT * 0.1;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoAnimationContainer: {
    zIndex: 1,
    position: 'absolute',
  },
  titleAnimationContainer: {
    zIndex: 1,
    position: 'absolute',
    top: TITLE_Y_POSITION,
    alignSelf: 'center',
  },
  formTopGap: {
    width: W_WIDTH,
    height: IMAGE_Y_POSITION + IMAGE_SIZE,
  },
  formContainer: {
    marginTop: MAX_MARGIN_Y,
  },
  pageScroller: {
    zIndex: -1,
  },
  pageContainer: {
    backgroundColor: 'transparent',
    width: W_WIDTH,
    alignItems: 'center',
  },
  forgotPasswordButton: {
    marginTop: MAX_MARGIN_Y,
  },
  indicator: Platform.select({
    ios: {
      position: 'absolute',
      bottom: W_MARGIN + MAX_MARGIN_Y,
    },
    android: {
      marginTop: 20,
    },
  }),
});
