import React from 'react';
import { TextStyle, Platform } from 'react-native';
import * as ExpoIcon from '@expo/vector-icons';

const {
  Feather,
  FontAwesome,
  Foundation,
  Entypo,
  EvilIcons,
  Ionicons,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} = ExpoIcon;

const hashmap = Object.freeze({
  plus: {
    font: AntDesign,
    id: 'plus',
    defaultSize: 25,
  },
  back: {
    font: Ionicons,
    id: Platform.select({ ios: 'ios-arrow-back', android: 'md-arrow-back' }),
    defaultSize: 25,
  },
  home: {
    font: Foundation,
    id: 'home',
    defaultSize: 25,
  },
  menu: {
    font: Feather,
    id: 'menu',
    defaultSize: 25,
  },
  question: {
    font: FontAwesome,
    id: 'question',
    defaultSize: 25,
  },
  person: {
    font: MaterialIcons,
    id: 'person',
    defaultSize: 25,
  },
  'dots-vertical': {
    font: MaterialCommunityIcons,
    id: 'dots-vertical',
    defaultSize: 25,
  },
  stack: {
    font: FontAwesome,
    id: 'navicon', // bars
    defaultSize: 25,
  },
  stack2: {
    font: MaterialIcons,
    id: 'reorder',
    defaultSize: 25,
  },
  flight: {
    font: MaterialIcons,
    id: 'flight',
    defaultSize: 25,
  },
  'check-circle': {
    font: MaterialCommunityIcons,
    id: 'check-circle',
    defaultSize: 25,
  },
  'right-arrow-long': {
    font: FontAwesome,
    id: 'long-arrow-right',
    defaultSize: 25,
  },
  'right-chevron': {
    font: MaterialCommunityIcons,
    id: 'chevron-right',
    defaultSize: 25,
  },
  'right-ray': {
    font: MaterialCommunityIcons,
    id: 'ray-start-arrow',
    defaultSize: 25,
  },
  'start-end-ray': {
    font: MaterialCommunityIcons,
    id: 'ray-start-end',
    defaultSize: 25,
  },
  'start-ray': {
    font: MaterialCommunityIcons,
    id: 'ray-start',
    defaultSize: 25,
  },
  'end-ray': {
    font: MaterialCommunityIcons,
    id: 'ray-end',
    defaultSize: 25,
  },
  'ongoing-ray': {
    font: MaterialCommunityIcons,
    id: 'ray-vertex',
    defaultSize: 25,
  },
  search: {
    font: EvilIcons,
    id: 'search',
    defaultSize: 25,
  },
  delete: {
    font: MaterialCommunityIcons,
    id: 'delete-forever',
    defaultSize: 25,
  },
  flag: {
    font: FontAwesome,
    id: 'flag',
    defaultSize: 25,
  },
  'flag-checkered': {
    font: FontAwesome,
    id: 'flag-checkered',
    defaultSize: 25,
  },
  'flag-triangle': {
    font: Entypo,
    id: 'flag',
    defaultSize: 25,
  },
  'flag-triangle-2': {
    font: MaterialCommunityIcons,
    id: 'flag-triangle',
    defaultSize: 25,
  },
  'map-marker': {
    font: MaterialCommunityIcons,
    id: 'map-marker',
    defaultSize: 25,
  },
  'map-marker-multiple': {
    font: MaterialCommunityIcons,
    id: 'map-marker-multiple',
    defaultSize: 25,
  },
  'location-pin': {
    font: Entypo,
    id: 'location-pin',
    defaultSize: 25,
  },
  earth: {
    font: MaterialCommunityIcons,
    id: 'earth',
    defaultSize: 25,
  },
  form: {
    font: AntDesign,
    id: 'form',
    defaultSize: 25,
  },
});

export type IconName = keyof typeof hashmap;

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  style?: TextStyle;
}

/**
 * An icon component that works as an abstraction over react-native-vector-icons.
 */

function Icon({ name, size, color, style }: Props) {
  const {
    font: ActiveFont,
    id,
    defaultSize,
  } = Object.prototype.hasOwnProperty.call(hashmap, name)
    ? hashmap[name]
    : hashmap.question;

  return (
    <ActiveFont
      name={id}
      size={size || defaultSize}
      color={color}
      style={style}
    />
  );
}

export default React.memo(Icon);
