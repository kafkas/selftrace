import React, { ReactElement } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import { TOUCH_COLOR, BORDER_COLOR, WHITE_BG_COLOR } from '../../styles/colors';
import { W_WIDTH, W_MARGIN, PADDING_Y } from '../../styles';

const baseStyles = StyleSheet.create({
  touchable: {
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    width: W_WIDTH,
    backgroundColor: WHITE_BG_COLOR.toString(),
    paddingHorizontal: W_MARGIN,
    paddingVertical: PADDING_Y,
  },
});

const {
  ImpactFeedbackStyle: { Light, Medium, Heavy },
} = Haptics;

export interface TouchableRectProps extends RectButtonProperties {
  haptic?: 'light' | 'medium' | 'heavy';
  containerStyle?: ViewStyle;
}

function TouchableRect({
  children,
  onPress,
  haptic,
  style,
  containerStyle,
  ...rest
}: TouchableRectProps): ReactElement {
  let onPressFinal = onPress;

  if (haptic) {
    onPressFinal = async (): Promise<void> => {
      let impact = Light;
      if (haptic === 'medium') impact = Medium;
      if (haptic === 'heavy') impact = Heavy;

      await Haptics.impactAsync(impact);
      onPress();
    };
  }

  /*
   * Wrapping RectButton with View as a temporary workaround since
   * RectButton doesn't support borderBottomWidth.
   * TODO: Fix this when there is a solution.
   */
  return (
    <View
      style={{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: BORDER_COLOR.toString(),
        ...containerStyle,
      }}
    >
      <RectButton
        onPress={onPressFinal}
        underlayColor={TOUCH_COLOR.toString()}
        activeOpacity={1}
        style={[baseStyles.touchable, style]}
        {...rest}
      >
        {children}
      </RectButton>
    </View>
  );
}

export default React.memo(TouchableRect);
