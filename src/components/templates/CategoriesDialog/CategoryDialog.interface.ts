export interface CategoriesModalProps {
  open: boolean
  onClose: () => void
}

export type CategoryDialogAction = 'show' | 'edit' | 'delete';

export interface CategoryDialogActionInfo {
  title: string;
  description: string;
}

export interface CategoryDialogActions {
  show: CategoryDialogActionInfo;
  edit: CategoryDialogActionInfo;
  delete: CategoryDialogActionInfo;
}
