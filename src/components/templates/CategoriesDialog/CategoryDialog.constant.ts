import { CategoryDialogActions } from './CategoryDialog.interface';

export const CATEGORY_DIALOG_ACTIONS: CategoryDialogActions = {
  show: {
    title: 'Categorías',
    description: 'Haga click en cualquier categoría para ver sus subcategorías. Dentro encontrará los botones para editar o eliminar esa categoría.',
  },
  edit: {
    title: 'Editar categoría',
    description: `Puede cambiar el nombre de la categoría, agregar subcategoría, o bien, eliminar una subcategoría
    dando click en el botón en forma de X que está junto a la subcategoría`,
  },
  delete: {
    title: 'Eliminar categoría',
    description: '¿Está seguro que desea eliminar esta categoría?',
    warning: 'No hay forma de deshacer esta acción.',
  },
  create: {
    title: 'Crear categoría',
    description: 'Puede crear una nueva categoría, ingresando su nombre y seleccionando las subcategorías que desea agregar.',
  },
};
