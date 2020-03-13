import React, { ReactElement } from 'react';
import * as Haptics from 'expo-haptics';

const {
  ImpactFeedbackStyle: { Light, Medium, Heavy },
} = Haptics;

interface WithHapticProps {
  haptic?: 'light' | 'medium' | 'heavy';
  onPress: () => void;
}

const withHaptic = <P extends object>(
  Button: React.ComponentType<P>
): React.FC<P & WithHapticProps> => ({
  haptic,
  onPress,
  ...rest
}: WithHapticProps): ReactElement => {
  let onPressFinal = onPress;
  if (haptic) {
    onPressFinal = async (): Promise<void> => {
      let impact = Light;
      if (haptic === 'medium') impact = Medium;
      if (haptic === 'heavy') impact = Heavy;

      await Haptics.impactAsync(impact);
      return onPress();
    };
  }

  return <Button onPress={onPressFinal} {...(rest as P)} />;
};

export default withHaptic;
