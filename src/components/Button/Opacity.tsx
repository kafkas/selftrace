import React, { ReactElement } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Content, { ContentProps } from './Content';
import withHaptic from '../../hocs/withHaptic';
import { touchableStyles } from './styles';

interface ButtonOpacityProps
  extends TouchableOpacityProps,
    Omit<ContentProps, 'active'> {
  loading?: boolean;
  disabled?: boolean;
}

class ButtonOpacity extends React.PureComponent<ButtonOpacityProps> {
  render(): ReactElement {
    const {
      loading,
      label,
      labelSize,
      labelColor,
      labelWeight,
      iconName,
      iconSize,
      iconColor,
      disabled,
      style,
      ...rest
    } = this.props;

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[touchableStyles.base, style]}
        {...rest}
      >
        <Content
          label={label}
          labelSize={labelSize}
          labelColor={labelColor}
          labelWeight={labelWeight}
          iconName={iconName}
          iconSize={iconSize}
          iconColor={iconColor}
          active={!disabled}
          loading={loading}
          activityIndicatorColor={labelColor || iconColor}
        />
      </TouchableOpacity>
    );
  }
}

export default withHaptic<ButtonOpacityProps>(ButtonOpacity);
