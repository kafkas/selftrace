import { DefaultTheme } from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';
import { HEADER_HEIGHT } from '../styles';
import { BLUE_COLOR, WHITE_BG_COLOR } from '../styles/colors';

export const Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: BLUE_COLOR.toString(),
  },
};

export const HeaderStyle: StackNavigationOptions['headerStyle'] = {
  height: HEADER_HEIGHT,
  backgroundColor: WHITE_BG_COLOR.toString(),
};

export const StackScreenOptions: StackNavigationOptions = {
  headerStyle: HeaderStyle,
  headerLeftContainerStyle: {
    paddingLeft: 5,
  },
  headerRightContainerStyle: {
    paddingRight: 5,
  },
};
