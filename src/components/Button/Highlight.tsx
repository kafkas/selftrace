import React, { ReactElement } from 'react';
import { Animated, View, ViewStyle } from 'react-native';
import { RectButton, RectButtonProperties } from 'react-native-gesture-handler';
import Content, { ContentProps } from './Content';
import withActivation from '../../hocs/withActivation';
import Color from '../../styles/Color';
import { TOUCH_COLOR, WHITE_BG_COLOR } from '../../styles/colors';
import withHaptic from '../../hocs/withHaptic';
import { touchableStyles } from './styles';

const ActivatingButton = withActivation(
  Animated.createAnimatedComponent(RectButton)
);

export interface ButtonHighlightProps
  extends RectButtonProperties,
    Omit<ContentProps, 'active'> {
  backgroundColor: Color;
  containerStyle?: ViewStyle;
  containerAnimated?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

let ButtonHighlight = ({
  loading,
  label,
  labelSize,
  labelColor,
  iconName,
  iconSize,
  iconColor,
  disabled,
  style,
  containerStyle,
  containerAnimated,
  backgroundColor,
  ...rest
}: ButtonHighlightProps) => {
  const Container: ReactElement = containerAnimated ? Animated.View : View;

  return (
    <Container style={containerStyle}>
      <ActivatingButton
        active={!disabled}
        activeColor={backgroundColor || WHITE_BG_COLOR}
        colorAddress={['style', 'backgroundColor']}
        style={{ ...touchableStyles.base, ...style }}
        activeOpacity={1}
        underlayColor={TOUCH_COLOR.toString()}
        enabled={!disabled}
        {...rest}
      >
        <Content
          label={label}
          labelSize={labelSize}
          labelColor={labelColor}
          iconName={iconName}
          iconSize={iconSize}
          iconColor={iconColor}
          active
          loading={loading}
          activityIndicatorColor={labelColor || iconColor}
        />
      </ActivatingButton>
    </Container>
  );
};

ButtonHighlight = React.memo(ButtonHighlight);

export default withHaptic<ButtonHighlightProps>(ButtonHighlight);
