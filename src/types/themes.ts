/**
 * Enum of supported colors in FULLL theme
 */
export enum COFFEEColors {
  DEFAULT = "#13132A",
  PRIMARY = "#876445",
  PRIMARY_LIGHT = "#F0E5CF",
  PRIMARY_DARK = "#483434",
  SECONDARY = "#C68B59",
  SECONDARY_LIGHT = "#FCDEC0",
  SECONDARY_DARK = "#5C3D2E",
  INFO = "#7D9D9C",
  INFO_LIGHT = "#8FC1D4",
  INFO_DARK = "#4B6587",
  ERROR = "#D72E2F",
  DANGER = "#E64104",
  WARNING = "#E64104",
  DARK_GREY = "#545459",
  MEDIUM_GREY = "#EFEFEF",
  REGULAR_GREY = "#CCCDCF",
  LIGHT_GREY = "#F9F9F9",
  WHITE = "#FFFFFF",
}

/**
 * Enum of supported colors in IED theme
 */
export enum NEWColors {
  DEFAULT = "#000000",
  PRIMARY = "#54BAB9",
  PRIMARY_LIGHT = "#9DD6DF",
  PRIMARY_DARK = "#18978F",
  SECONDARY = "#A084CF",
  SECONDARY_LIGHT = "#9DD6DF",
  SECONDARY_DARK = "#005487",
  INFO = "#6EC1B4",
  INFO_LIGHT = "#B7E5DD",
  INFO_DARK = "#377D71",
  ERROR = "#B00C1F",
  DANGER = "#E30512",
  WARNING = "#F39100",
  DARK_GREY = "#666666",
  MEDIUM_GREY = "#DDDDDD",
  REGULAR_GREY = "#EEEEEE",
  LIGHT_GREY = "#FAFAFA",
  WHITE = "#FFFFFF",
}

/**
 * Enum of supported theme
 */
export enum SupportedTheme {
  COFFEE = "coffee",
  NEW = "new",
}

/**
 * enum of supported font-family
 */
export enum FontFamily {
  SourceSansProSemiBold = "SourceSansPro-SemiBold",
  SourceSansProRegular = "SourceSansPro-Regular",
  OpenSansSemiBold = "OpenSans-SemiBold",
  OpenSansRegular = "OpenSans-Regular",
}

interface ThemeColors {
  /**
   * Title and body texts, icons
   */
  default: COFFEEColors | NEWColors;
  /**
   * Primary actions, buttons, success states
   */
  primary: COFFEEColors | NEWColors;
  primaryLight: COFFEEColors | NEWColors;
  primaryDark: COFFEEColors | NEWColors;
  /**
   * Secondary actions, add actions, links
   */
  secondary: COFFEEColors | NEWColors;
  secondaryLight: COFFEEColors | NEWColors;
  secondaryDark: COFFEEColors | NEWColors;
  /**
   * All information text, update, snackbar
   */
  info: COFFEEColors | NEWColors;
  infoLight: COFFEEColors | NEWColors;
  infoDark: COFFEEColors | NEWColors;
  /**
   * All error text, negative states
   */
  error: COFFEEColors | NEWColors;
  /**
   * Warning/danger components
   */
  danger: COFFEEColors | NEWColors;
  /**
   * Warning components
   */
  warning: COFFEEColors | NEWColors;
  /**
   * Subtitle and overline texts
   */
  darkGrey: COFFEEColors | NEWColors;
  /**
   * Disabled button
   */
  mediumGrey: COFFEEColors | NEWColors;
  /**
   * Input background, divider
   */
  regularGrey: COFFEEColors | NEWColors;
  /**
   * Page and drawer backgrounds
   */
  lightGrey: COFFEEColors | NEWColors;
  /**
   * Text on dark/colored background (buttons), surface background
   */
  white: COFFEEColors | NEWColors;
}

interface Fonts {
  semiBold: FontFamily;
  regular: FontFamily;
  headline1: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  headline2: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  headline3: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  subtitle1: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  subtitle2: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  body1: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  body2: {
    fontFamily: FontFamily;
    fontSize: number;
  };
  button: {
    fontFamily: FontFamily;
    fontSize: number;
    textTransform: string;
  };
  overline: {
    fontFamily: FontFamily;
    fontSize: number;
    textTransform: string;
  };
  caption: {
    fontFamily: FontFamily;
    fontSize: number;
  };
}

export interface ITheme {
  /**
   * Supported theme design
   */
  theme: SupportedTheme;
  fonts: Fonts;
  /**
   * Design system color
   * @readonly default
   * @readonly primary
   * @readonly secondary
   * @readonly error
   * @readonly danger
   * @readonly warning
   * @readonly darkGrey
   * @readonly mediumGrey
   * @readonly regularGrey
   * @readonly lightGrey
   * @readonly white
   */
  colors: ThemeColors;
  /**
   * Transparency black
   * @param opacity
   */
  fade: (arg0: number) => string;
  /**
   * Transparency white
   * @param opacity
   */
  fadeOut: (arg0: number) => string;
}
