import React, { ReactNode, useRef, useCallback } from 'react';
import {
  Animated,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface Props extends TouchableOpacityProps {
  children: ReactNode;
  delta: number;
  innerViewStyle?: ViewStyle;
}

function AnimatedTouchable({
  children,
  delta = 0.2,
  onPress,
  innerViewStyle,
  ...rest
}: Props) {
  const scaleRef = useRef(new Animated.Value(1));

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleRef.current, {
      toValue: 1 - delta,
    }).start();
  }, [delta]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleRef.current, {
      toValue: 1,
      friction: 8,
      tension: 40,
    }).start();
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...rest}
    >
      <Animated.View
        style={[
          {
            height: 50,
            alignItems: 'center',
          },
          innerViewStyle,
          { transform: [{ scale: scaleRef.current }] },
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
}

export default React.memo(AnimatedTouchable);
