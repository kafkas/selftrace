import React from 'react';
import {
  Animated,
  TransformsStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Text from '../../components/Text';
import logo from '../../../assets/icon.png';
import styles, {
  IMAGE_X_POSITION,
  IMAGE_Y_POSITION,
  IMAGE_SIZE,
} from './styles';
import { HEADER_FONT_FAMILY } from '../../styles/typography';
import { PRIMARY_COLOR } from '../../styles/colors';

interface Props {
  scrollX: Animated.AnimatedValue;
  keyboardScale: Animated.AnimatedValue;
  transforms: TransformsStyle[];
}

export default function LogoAnimation({
  scrollX,
  keyboardScale,
  transforms,
}: Props) {
  const safeTransforms = !transforms ? [] : transforms;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={[
          styles.logoAnimationContainer,
          {
            left: scrollX.interpolate({
              inputRange: [0, 1],
              outputRange: [IMAGE_X_POSITION, -IMAGE_SIZE],
            }),
            top: scrollX.interpolate({
              inputRange: [0, 1],
              outputRange: [IMAGE_Y_POSITION, 0],
            }),
            transform: [
              ...safeTransforms,
              {
                scale: keyboardScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.6],
                }),
              },
              { perspective: 1000 },
            ],
            opacity: scrollX.interpolate({
              inputRange: [-1, 0, 1, 2],
              outputRange: [1, 1, 0, 0],
            }),
          },
        ]}
      >
        <Animated.Image
          source={logo}
          style={{
            height: scrollX.interpolate({
              inputRange: [-1, 0, 1, 2],
              outputRange: [IMAGE_SIZE, IMAGE_SIZE, 0, 0],
            }),
            width: scrollX.interpolate({
              inputRange: [-1, 0, 1, 2],
              outputRange: [IMAGE_SIZE, IMAGE_SIZE, 0, 0],
            }),
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
