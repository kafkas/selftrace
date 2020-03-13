import React from 'react';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TouchableRect from '../TouchableRect';
import Icon from '../Icon';
import Text from '../Text';
import { BLACK_TEXT_COLOR } from '../../styles/colors';

const styles = StyleSheet.create({
  option: {
    justifyContent: 'space-between',
  },
});

interface Props {
  label: string;
  screenKey: string;
}

const ScreenNavigator = ({ label, screenKey }: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableRect
      onPress={() => navigation.navigate(screenKey)}
      style={styles.option}
    >
      <Text>{label}</Text>
      <Icon
        name='right-chevron'
        color={BLACK_TEXT_COLOR.toString()}
        size={20}
      />
    </TouchableRect>
  );
};

export default ScreenNavigator;
