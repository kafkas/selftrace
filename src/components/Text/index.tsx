import React, { ReactNode, ReactElement } from 'react';
import {
  Text as RNText,
  TextProps as RNTextProps,
  Animated,
  TextStyle,
} from 'react-native';
import { MAIN_FONT_FAMILY } from '../../styles/typography';
import { BLACK_TEXT_COLOR } from '../../styles/colors';

export interface TextProps extends RNTextProps {
  children: ReactNode;
  animated?: boolean;
  style?: TextStyle;
}

function Text({ children, animated, style, ...rest }: TextProps): ReactElement {
  const Wrapper = animated ? Animated.Text : RNText;
  return (
    <Wrapper
      style={[
        {
          fontFamily: MAIN_FONT_FAMILY,
          fontSize: 14, // TODO: import from /styles/typography
          color: BLACK_TEXT_COLOR.toString(),
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Wrapper>
  );
}

export default React.memo(Text);
