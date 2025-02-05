import { CategoryUI } from '../../../globalInterface';

export interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

export type CategoryDialogAction = 'show' | 'edit' | 'delete';

export interface ShowCategoriesProps {
  updateAction: (newAction: CategoryDialogAction) => void;
  updateCategoryToEdit: (newCategory: CategoryUI | null) => void;
  updateCategoryToDelete: (categoryId: string) => void;
}

export interface CategoriesListDialogProps {
  categoryName: string;
  subCategories: string[];
  categoryId: string;
  updateAction: (newAction: CategoryDialogAction) => void;
  updateEditCategory: (categoryId: string) => void;
  updateCategoryToDelete: (categoryId: string) => void;
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
  goBackAction: () => void;
}

export interface DeleteCategoryProps {
  categoryToDelete: string | null;
}

export interface AddSubcategoryProps {
  addSubcategory: (subcategory: string) => void;
}

export interface AddSubcategoryValues {
  subcategory: string;
}

export interface EditCategoryValues {
  categoryName: string;
  subcategories: string[];
}
