import { CategoryUI } from '../../../globalInterface';

export interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

export type CategoryDialogAction = 'show' | 'edit' | 'delete';

export interface ShowCategoriesProps {
  updateAction: (newAction: CategoryDialogAction, categoryId: string) => void;
  updateCategoryToEdit: (newCategory: CategoryUI | null) => void;
}

export interface CategoriesListDialogProps {
  categoryName: string;
  subCategories: string[];
  categoryId: string;
  updateAction: (newAction: CategoryDialogAction, categoryId: string) => void;
  updateEditCategory: (categoryId: string) => void
}

export interface SubcategoriesListDialogProps {
  openList: boolean;
  categoryName: string;
  subCategories: string[];
  handleEdit: () => void;
  handleDelete: () => void;
}

export interface CategoryDialogActionInfo {
  title: string;
  description: string;
}

export interface CategoryDialogActions {
  show: CategoryDialogActionInfo;
  edit: CategoryDialogActionInfo;
  delete: CategoryDialogActionInfo;
}

export interface EditCategoryProps {
  categoryToEdit: CategoryUI | null;
}
