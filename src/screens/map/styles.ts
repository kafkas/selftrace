import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { W_WIDTH, MIN_MARGIN_Y, W_MARGIN } from '../../styles';
import { PRIMARY_COLOR } from '../../styles/colors';

const WARNING_CONTAINER_WIDTH = W_WIDTH - 4 * W_MARGIN;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBarSection: {
    height: Constants.statusBarHeight,
  },
  mapContainer: {
    flex: 1,
    width: W_WIDTH,
  },
  blurView: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningContainer: {
    backgroundColor: PRIMARY_COLOR.toString(),
    borderRadius: 10,
    width: WARNING_CONTAINER_WIDTH,
    padding: 15,
    marginHorizontal: W_MARGIN,
    shadowColor: PRIMARY_COLOR.lighten(20),
    shadowRadius: 20,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  lockIcon: {
    alignSelf: 'center',
  },
  warningTitle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    marginTop: MIN_MARGIN_Y,
    color: 'white',
  },
  warningMessage: {
    alignSelf: 'center',
    marginTop: MIN_MARGIN_Y,
    color: 'white',
    textAlign: 'center',
  },
});
