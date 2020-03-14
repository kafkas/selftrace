import React from 'react';
import {
  Picker as RNPicker,
  PickerProps as RNPickerProps,
  Animated,
  StyleSheet,
  View,
} from 'react-native';
import withDelayedUnmount from '../../hocs/withDelayedUnmount';
import { BORDER_COLOR } from '../../styles/colors';
import { W_WIDTH } from '../../styles';

const PICKER_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
  },
  picker: {
    height: PICKER_HEIGHT,
    justifyContent: 'center',
  },
  border: {
    backgroundColor: BORDER_COLOR.toString(),
    width: W_WIDTH,
    height: StyleSheet.hairlineWidth,
  },
});

interface Item<V = any> {
  label: string;
  value: V;
}

export interface ContentProps<V> extends RNPickerProps {
  scale: Animated.Value;
  items: Item<V>[];
}

function Content<V>({ scale, items, ...rest }: ContentProps<V>) {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          marginTop: scale.interpolate({
            inputRange: [0, 1],
            outputRange: [-PICKER_HEIGHT, 0],
          }),
        },
      ]}
    >
      <RNPicker style={styles.picker} {...rest}>
        {items.map(item => (
          <RNPicker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </RNPicker>
      <View style={styles.border} />
    </Animated.View>
  );
}

export default withDelayedUnmount(Content);
