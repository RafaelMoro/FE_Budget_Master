import { CategoryUI } from '../../../globalInterface';

export interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

export type CategoryDialogAction = 'show' | 'edit' | 'delete' | 'create' | 'addSubcategoryIcon';

export interface CategoryError {
  showError: boolean;
  title: string;
  description: string;
}

export interface UpdateErrorProps {
  newTitle: string;
  newDescription: string;
}

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
  warning?: string;
}

export interface CategoryDialogActions {
  show: CategoryDialogActionInfo;
  edit: CategoryDialogActionInfo;
  delete: CategoryDialogActionInfo;
  create: CategoryDialogActionInfo;
  addSubcategoryIcon: CategoryDialogActionInfo;
}

export interface CategoryTemplateProps {
  initialValues: ManageCategoriesValues;
  action: 'create' | 'edit';
  subcategories: string[];
  isLoading: boolean;
  isSuccess: boolean;
  goBackAction: () => void;
  updateCategories: (newCategories: string[]) => void;
  updateCategoryName: (newCategoryName: string) => void
  handleSubmit: (values: ManageCategoriesValues) => Promise<void>
}

export interface EditCategoryTemplateProps {
  categoryToEdit: CategoryUI | null;
  goBackAction: () => void;
  updateError: ({ newTitle, newDescription }: UpdateErrorProps) => void;
}

export interface CreateCategoryTemplateProps {
  goBackAction: () => void;
  updateError: ({ newTitle, newDescription }: UpdateErrorProps) => void;
}

export interface DeleteCategoryProps {
  categoryToDelete: string | null;
  goBackAction: () => void;
  updateError: ({ newTitle, newDescription }: UpdateErrorProps) => void;
}

export interface AddSubcategoryProps {
  addSubcategory: (subcategory: string) => void;
}

export interface AddSubcategoryValues {
  subcategory: string;
}

export interface ManageCategoriesValues {
  categoryName: string;
  subcategories: string[];
}

export interface EditCategoryBEValues {
  categoryName: string;
  subCategories: string[];
  categoryId: string;
}

export interface CreateCategoryBEValues {
  categoryName: string;
  subCategories: string[];
  icon: 'newCategory';
}

export interface DeleteCategoryBEValues {
  categoryId: string;
}

export interface CreateCategoryMutationProps {
  values: CreateCategoryBEValues;
  bearerToken: string;
}

export interface ModifyCategoryMutationProps {
  values: EditCategoryBEValues;
  bearerToken: string;
}

export interface DeleteCategoryMutationProps {
  values: DeleteCategoryBEValues;
  bearerToken: string;
}
