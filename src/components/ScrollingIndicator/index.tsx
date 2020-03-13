import React from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  indicatorBall: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

interface Props {
  ballCount: number;
  scrollX: Animated.AnimatedValue; // Can later make vertical as well
  activeColor: string;
  inactiveColor: string;
  style: ViewStyle;
}

function ScrollingIndicator({
  ballCount,
  scrollX,
  activeColor,
  inactiveColor,
  style,
}: Props) {
  // Create [0, 1, 2,..., ballCount - 1]
  const numbers = Array(ballCount)
    .fill()
    .map((n, i) => i);

  // Output range of mth ball
  const outputRange = m =>
    numbers.map(n => (n === m ? activeColor : inactiveColor));

  return (
    <View style={[styles.container, style]}>
      {numbers.map(m => (
        <Animated.View
          key={m.toString()}
          style={[
            styles.indicatorBall,
            {
              backgroundColor: scrollX.interpolate({
                inputRange: numbers,
                outputRange: outputRange(m),
              }),
            },
          ]}
        />
      ))}
    </View>
  );
}

export default React.memo(ScrollingIndicator);
