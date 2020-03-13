import React from 'react';
import { Animated } from 'react-native';
import ObjectUtils from '../util/ObjectUtils';
import Color from '../styles/Color';

interface WithActiveProps {
  active: boolean;
  activeColor: Color;
  colorAddress: string[];
}

const withActivation = <P extends object>(Component: React.ComponentType<P>) =>
  class WithActive extends React.Component<P & WithActiveProps> {
    animatedColor: Animated.AnimatedValue;

    constructor(props: P & WithActiveProps) {
      super(props);
      this.animatedColor = new Animated.Value(props.active ? 1 : 0);
    }

    componentDidUpdate(prevProps: P & WithActiveProps): void {
      if (this.props.active !== prevProps.active) {
        Animated.timing(this.animatedColor, {
          toValue: this.props.active ? 1 : 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    }

    render() {
      const { activeColor, colorAddress, ...rest } = this.props;
      ObjectUtils.modify(
        rest,
        colorAddress,
        this.animatedColor.interpolate({
          inputRange: [0, 1],
          outputRange: [activeColor.saturate(20, true), activeColor.toString()],
        })
      );

      delete rest.active;

      return <Component {...(rest as P)} />;
    }
  };

export default withActivation;
