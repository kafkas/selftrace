import { StyleSheet } from 'react-native';
import { W_MARGIN, W_WIDTH, MIN_MARGIN_Y } from '../../styles';
import { INACTIVE_TEXT_STYLES } from '../../styles/typography';
import { BORDER_COLOR } from '../../styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
  },
  textContainer: {
    width: W_WIDTH,
    padding: W_MARGIN,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR,
  },
  topText: {
    ...INACTIVE_TEXT_STYLES,
  },
  descriptionText: {},
  noteSection: {
    marginTop: MIN_MARGIN_Y,
  },
  noteTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  noteText: {
    fontSize: 12,
  },
});
