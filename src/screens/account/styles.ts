import { StyleSheet } from 'react-native';
import { W_WIDTH, MAX_MARGIN_Y } from '../../styles';
import { BORDER_COLOR } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    justifyContent: 'space-between',
  },
  signOutButtonContainer: {
    alignSelf: 'center',
    marginTop: MAX_MARGIN_Y,
    width: W_WIDTH,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BORDER_COLOR.toString(),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR.toString(),
  },
  signOutButton: {
    minHeight: 40,
  },
});
