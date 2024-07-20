import { GlobalConfiguration, BackgroundColors, TextColors } from './interface';

/*
* This file saves colors, breakpoints for responsive web design, font sizes
* for different devices.
*/

export const AppColors = {
  primary: '#B16841',
  primaryDark: '#C08667',
  primaryLight: '#7B482D',
  secondary: '#592418',
  secondaryLight: '#7A4F46',
  secondaryDark: '#3E1910',
  white: '#fbfbfb',
  black: '#1D1305',
  positive: '#2e8625',
  positiveDark: '#205D19',
  positiveLight: '#579E50',
  negative: '#bd4a0e',
  negativeDark: '#843309',
  negativeLight: '#CA6E3E',
  info: '#0288d1',
  infoDark: '#01579b',
  infoLight: '#03a9f4',
  warning: '#ed6c02',
  warningLight: '#F08934',
  warningDark: '#A54B01',
  bgColorWhite: 'f8f8f8',
  bgColorDark: '#66440D',
  bgColorGrey: '#dbcaca',
  grey: '#9F9B94',
  subtitleColor: '#4b5055',
  validationError: '#d32f2f',
};

export const RecordStatusTypeColors = {
  Transfer: AppColors.info,
  Paid: AppColors.positive,
  Unpaid: AppColors.negative,
};

export const AllTextColors: TextColors[] = [
  { name: 'Black', color: '#1D1305' },
  { name: 'White', color: '#fbfbfb' },
];

export const AllBackgroundColors: BackgroundColors [] = [
  { name: 'Crimson', color: '#DC143C' },
  { name: 'Red', color: '#FF0000' },
  { name: 'Fire Brick', color: '#B22222' },
  { name: 'Dark Red', color: '#8B0000' },
  { name: 'Tomato', color: '#FF6347' },
  { name: 'Orange', color: '#FF8000' },
  { name: 'Dark Orange', color: '#FF8C00' },
  { name: 'Gold', color: '#FFD700' },
  { name: 'Yellow', color: '#FFFF00' },
  { name: 'Chartreuse Green', color: '#80FF00' },
  { name: 'Lime', color: '#00FF00' },
  { name: 'Pale Green', color: '#98FB98' },
  { name: 'Green', color: '#008000' },
  { name: 'Spring Green', color: '#00FF7F' },
  { name: 'Sea Green', color: '#2E8B57' },
  { name: 'Forest Green', color: '#228B22' },
  { name: 'Dark Sea Green', color: '#8FBC8B' },
  { name: 'Light Sea Green', color: '#20B2AA' },
  { name: 'Teal', color: '#008080' },
  { name: 'Light Cyan', color: '#E0FFFF' },
  { name: 'Turquoise', color: '#40E0D0' },
  { name: 'SteelBlue', color: '#4682B4' },
  { name: 'Sky Blue', color: '#87CEEB' },
  { name: 'Dodger Blue', color: '#1E90FF' },
  { name: 'Royal Blue', color: '#4169E1' },
  { name: 'Cyan', color: '#00FFFF' },
  { name: 'Azure', color: '#0080FF' },
  { name: 'Blue', color: '#0000FF' },
  { name: 'Navy', color: '#000080' },
  { name: 'Midnight Blue', color: '#191970' },
  { name: 'State Blue', color: '#6A5ACD' },
  { name: 'Medium State Blue', color: '#7B68EE' },
  { name: 'Indigo', color: '#4B0082' },
  { name: 'Violet', color: '#EE82EE' },
  { name: 'Magenta', color: '#FF00FF' },
  { name: 'Rebecca Purple', color: '#663399' },
  { name: 'Blue Violet', color: '#8A2BE2' },
  { name: 'Rose', color: '#FF0080' },
  { name: 'Wheat', color: '#F5DEB3' },
  { name: 'Sandy Brown', color: '#F4A460' },
  { name: 'Chocolate', color: '#D2691E' },
  { name: 'Brown', color: '#A52A2A' },
  { name: 'Light Grey', color: '#D3D3D3' },
  { name: 'Silver', color: '#C0C0C0' },
  { name: 'Grey', color: '#808080' },
  { name: 'DimGrey', color: '#696969' },
  { name: 'Black', color: '#1D1305' },
  { name: 'White', color: '#fbfbfb' },
  { name: 'Purple', color: '#A020F0' },
];

export const responsiveBreakpoints = {
  mobile: '(max-width: 599.95px)',
  tablet: '(min-width: 600px) and (max-width: 899.95px)',
  tabletAndDesktop: '(min-width: 600px)',
  desktop: '(min-width: 900px)',
};

export const globalConfiguration: GlobalConfiguration = {
  mobile: {
    fontSizes: {
      H1: '2.4rem',
      H2: '2.2rem',
      H3: '2.2rem',
      H4: '2.2rem',
      H5: '2rem',
      P: '1.6rem',
      Sub: '1.4rem',
    },
  },
  tablet: {
    fontSizes: {
      H1: '2.8rem',
      H2: '2.6rem',
      H3: '2.4rem',
      H4: '2.2rem',
      H5: '2rem',
      P: '1.6rem',
      Sub: '1.4rem',
    },
  },
  desktop: {
    fontSizes: {
      H1: '3.2rem',
      H2: '2.8rem',
      H3: '2.4rem',
      H4: '2.4rem',
      H5: '2.2rem',
      P: '1.8rem',
      Sub: '1.5rem',
    },
  },
};
