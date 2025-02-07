import {
  DeleteOutlined, ErrorOutlineOutlined, EditOutlined, LogoutOutlined, Close,
  DoneOutlined, Visibility, VisibilityOff, KeyboardArrowUpOutlined,
  Celebration, SavingsOutlined, ArrowBackOutlined,
  Fastfood, House, Engineering, Language, DirectionsCar,
  AccountBalance, MedicalInformation, FamilyRestroom, ShoppingCart,
  Menu, PaymentsOutlined, LocalOfferOutlined,
} from '@mui/icons-material';
import { ElementType } from 'react';
import * as MuiIcons from '@mui/icons-material';
import { AllCategoryIcons, AppIcons } from './Icons.interface';
import { AppColors } from '../../../styles';

export const ICONS_MATERIAL: Record<string, ElementType> = MuiIcons;
export const DEFAULT_SIZE = '2.5rem';

export const APP_ICONS: AppIcons = {
  Delete: {
    icon: DeleteOutlined,
    defaultColor: AppColors.negative,
  },
  GoBack: {
    icon: ArrowBackOutlined,
    defaultColor: AppColors.subtitleColor,
  },
  Error: {
    icon: ErrorOutlineOutlined,
    defaultColor: AppColors.negative,
  },
  Edit: {
    icon: EditOutlined,
    defaultColor: AppColors.primary,
  },
  LogOut: {
    icon: LogoutOutlined,
    defaultColor: AppColors.primary,
  },
  Close: {
    icon: Close,
    defaultColor: AppColors.grey,
  },
  GoToTop: {
    icon: KeyboardArrowUpOutlined,
    defaultColor: AppColors.grey,
  },
  TickMark: {
    icon: DoneOutlined,
    defaultColor: AppColors.positive,
  },
  Visibility: {
    icon: Visibility,
    defaultColor: AppColors.black,
  },
  VisibilityOff: {
    icon: VisibilityOff,
    defaultColor: AppColors.black,
  },
  HamburguerMenu: {
    icon: Menu,
    defaultColor: AppColors.white,
  },
};

export const categoryIcons: AllCategoryIcons = {
  foodAndDrink: Fastfood,
  house: House,
  utilities: Engineering,
  subcriptions: Language,
  transportation: DirectionsCar,
  debtAndLoans: AccountBalance,
  healthCare: MedicalInformation,
  kids: FamilyRestroom,
  shopping: ShoppingCart,
  entertainment: Celebration,
  savings: SavingsOutlined,
  income: PaymentsOutlined,
  newCategory: LocalOfferOutlined,
};
