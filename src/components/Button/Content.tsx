import React, { FC, ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon, { IconName } from '../Icon';
import Text from '../Text';
import withLoading from '../../hocs/withLoading';
import Color from '../../styles/Color';
import { MIN_MARGIN_X } from '../../styles';
import { INACTIVE_ICON_COLOR, INACTIVE_TEXT_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
  iconLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export interface ContentProps {
  label?: string;
  labelSize?: number;
  labelColor?: Color;
  labelWeight: string;
  iconName?: IconName;
  iconSize?: number;
  iconColor?: Color;
  active?: boolean;
}

const Content: FC = ({
  label,
  labelSize,
  labelColor,
  labelWeight,
  iconName,
  iconSize,
  iconColor,
  active,
}: ContentProps): ReactElement => {
  const labelColorFinal = active ? labelColor : INACTIVE_TEXT_COLOR;
  const iconColorFinal = active ? iconColor : INACTIVE_ICON_COLOR;

  if (label && iconName)
    return (
      <View style={styles.iconLabelContainer}>
        <Icon
          name={iconName}
          size={iconSize}
          color={iconColorFinal.toString()}
        />
        <Text
          style={{
            fontSize: labelSize,
            color: labelColorFinal,
            fontWeight: labelWeight,
            marginLeft: MIN_MARGIN_X,
          }}
        >
          {label}
        </Text>
      </View>
    );
  if (label && !iconName)
    return (
      <Text
        style={{
          fontSize: labelSize,
          color: labelColorFinal,
          fontWeight: labelWeight,
        }}
      >
        {label}
      </Text>
    );
  if (iconName && !label)
    return (
      <Icon name={iconName} size={iconSize} color={iconColorFinal.toString()} />
    );
  return <View />;
};

export default React.memo(withLoading<ContentProps>(Content));
