import React from 'react';
import {
  Animated,
  TransformsStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Text from '../../components/Text';
import withActivation from '../../hocs/withActivation';
import { BLUE_COLOR } from '../../styles/colors';
import { HEADER_FONT_FAMILY } from '../../styles/typography';
import styles from './styles';

const ActivatedText = withActivation(Text);

interface Props {
  scrollX: Animated.AnimatedValue;
  keyboardScale: Animated.AnimatedValue;
  active: boolean;
  transforms: TransformsStyle[];
}

export default function TitleAnimation({
  scrollX,
  keyboardScale,
  active,
  transforms,
}: Props) {
  const safeTransforms = !transforms ? [] : transforms;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View
        style={[
          styles.titleAnimationContainer,
          {
            transform: [
              ...safeTransforms,
              {
                scale: keyboardScale.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.8],
                }),
              },
            ],
          },
        ]}
      >
        <Animated.View
          style={[
            {
              opacity: scrollX,
              transform: [
                {
                  translateX: scrollX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [200, 0],
                  }),
                },
                {
                  translateY: scrollX.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 60],
                  }),
                },
                { perspective: 1000 },
              ],
            },
          ]}
        >
          <ActivatedText
            animated
            active={active}
            activeColor={BLUE_COLOR}
            colorAddress={['style', 'color']}
            style={{
              fontFamily: HEADER_FONT_FAMILY,
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 32,
            }}
            numberOfLines={1}
            ellipsizeMode='clip'
          >
            Sign Up
          </ActivatedText>
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
