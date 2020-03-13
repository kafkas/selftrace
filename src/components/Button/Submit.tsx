import React from 'react';
import { StyleSheet } from 'react-native';
import ButtonHighlight, { ButtonHighlightProps } from './Highlight';
import { WHITE_COLOR, BLUE_COLOR } from '../../styles/colors';
import { MAX_MARGIN_Y } from '../../styles';

const styles = StyleSheet.create({
  container: {
    marginTop: MAX_MARGIN_Y,
  },
  button: {
    borderRadius: 5,
    minWidth: 100,
  },
});

const SubmitButton = (props: ButtonHighlightProps) => (
  <ButtonHighlight
    labelColor={WHITE_COLOR}
    underlayColor={BLUE_COLOR.shade(-20)}
    haptic='medium'
    backgroundColor={BLUE_COLOR}
    style={styles.button}
    containerStyle={styles.container}
    {...props}
  />
);

export default React.memo(SubmitButton);
