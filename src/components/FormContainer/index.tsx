import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Animated, ViewStyle } from 'react-native';
import Text from '../Text';
import { Progress } from '../../data-types';
import { SECTION_APPEAR_DURATION } from '../../styles/animations';
import {
  INACTIVE_TEXT_COLOR,
  WHITE_BG_COLOR,
  BORDER_COLOR,
} from '../../styles/colors';
import { W_WIDTH, W_MARGIN } from '../../styles';

const FORM_BG_COLOR = WHITE_BG_COLOR.toString();
const PROGRESS_SECTION_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    backgroundColor: FORM_BG_COLOR,
    maxWidth: W_WIDTH,
  },
  childrenContainer: {
    backgroundColor: FORM_BG_COLOR,
  },
  progressMessageContainer: {
    zIndex: -1,
    height: PROGRESS_SECTION_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: W_MARGIN,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER_COLOR.toString(),
  },
  progressMessage: {
    fontSize: 13,
    color: INACTIVE_TEXT_COLOR.toString(),
    textAlign: 'center',
  },
});

interface Props {
  progress: Progress;
  showErrorsOnly: boolean;
  children: React.ReactNode;
  style: ViewStyle;
}

function FormContainer({
  progress,
  showErrorsOnly = false,
  children,
  style,
}: Props) {
  const [persistentMessage, setPersistentMessage] = useState(progress.message);

  useEffect(() => {
    if (!progress.message)
      setTimeout(() => {
        setPersistentMessage(progress.message);
      }, SECTION_APPEAR_DURATION);
    else setPersistentMessage(progress.message);
  }, [progress]);

  const progressScaleRef = useRef(
    new Animated.Value(getScaleValue(progress, showErrorsOnly))
  );
  const { current: progressScale } = progressScaleRef;

  useEffect(() => {
    Animated.timing(progressScale, {
      duration: SECTION_APPEAR_DURATION,
      toValue: getScaleValue(progress, showErrorsOnly),
    }).start();
  }, [progress, progressScale, showErrorsOnly]);

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.childrenContainer}>{children}</View>
      <Animated.View
        style={[
          styles.progressMessageContainer,
          {
            marginTop: progressScale.interpolate({
              inputRange: [0, 1],
              outputRange: [-PROGRESS_SECTION_HEIGHT, 0],
            }),
          },
        ]}
      >
        <Text style={styles.progressMessage}>{persistentMessage}</Text>
      </Animated.View>
    </Animated.View>
  );
}

function getScaleValue(p: Progress, errorsOnly: boolean): 0 | 1 {
  let val = p.status ? 1 : 0;
  if (errorsOnly) {
    if (p.status === 'ERROR') val = 1;
    else val = 0;
  }

  return val;
}

export default React.memo(FormContainer);
