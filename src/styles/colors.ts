import Color from './Color';

// Helper function
const rgb = (r: number, g: number, b: number): Color => new Color(r, g, b);

export const SYSTEM_BLUE_LIGHT = rgb(0, 122, 255);

export const PRIMARY_COLOR = rgb(252, 10, 116);
export const SECONDARY_COLOR = rgb(254, 39, 177);
export const CLUSTER_BASE_COLOR = PRIMARY_COLOR;

export const BLUE_COLOR = rgb(26, 141, 249);

export const RED_COLOR = rgb(230, 44, 62);
export const WHITE_COLOR = rgb(255, 255, 255);
export const WHITE_BG_COLOR = rgb(255, 255, 255);
export const LIGHT_GRAY_BG_COLOR = rgb(242, 242, 242);
export const TOUCH_COLOR = rgb(225, 225, 225);
export const BORDER_COLOR = rgb(225, 225, 225);
export const SHADOW_COLOR = rgb(200, 200, 200);
export const INACTIVE_ICON_COLOR = rgb(175, 175, 175);
export const INACTIVE_TEXT_COLOR = rgb(125, 125, 125);
export const DARK_TEXT_COLOR = rgb(60, 60, 60);
export const DARK_GRAY_COLOR = rgb(50, 50, 50);
export const BLACK_TEXT_COLOR = rgb(30, 30, 30);
