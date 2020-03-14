import { Dimensions } from 'react-native';
import Constants from 'expo-constants';

export const { width: W_WIDTH, height: W_HEIGHT } = Dimensions.get('window');

// General margins
export const MIN_MARGIN_X = 5;
export const MIN_MARGIN_Y = 10;
export const MARGIN_X = 15;
export const MARGIN_Y = 20;
export const MAX_MARGIN_X = 25;
export const MAX_MARGIN_Y = 30;

// Minimum distance from a window edge and a UI element
export const W_MARGIN = 20;

// Paddings
export const MIN_PADDING_X = 10;
export const MIN_PADDING_Y = 10;
export const PADDING_X = 15;
export const PADDING_Y = 15;

// Main Element Styles
export const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
export const RAW_HEADER_HEIGHT = 50;
export const HEADER_HEIGHT = STATUS_BAR_HEIGHT + RAW_HEADER_HEIGHT;
export const BOTTOM_TAB_HEIGHT = 50;
export const FORM_INPUT_HEIGHT = 80;
