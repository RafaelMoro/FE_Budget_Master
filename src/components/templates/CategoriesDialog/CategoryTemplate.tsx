import { Formik, Field } from 'formik';

import {
  CategoryTemplateProps,
  CreateCategoryTemplateProps,
  EditCategoryTemplateProps,
} from './CategoryDialog.interface';
import { ManageCategorySchema } from '../../../validationsSchemas/categories.schema';
import { LoadingSpinner } from '../../UI/LoadingSpinner';
import { AddSubcategory } from './AddSubcategory';
import {
  AppColors,
  CancelButton, ErrorParagraphValidation, InputForm, LongChip, PrimaryButton,
} from '../../../styles';
import {
  EditCategoryButtonContainer, EditCategoryContainer, SubcategoriesContainerChips, SubcategoryTitle,
} from './CategoriesDialog.styled';
import { AppIcon } from '../../UI/Icons';
import { withEditCategory } from './withEditCategory';
import { withCreateCategory } from './withCreateCategory';

const CategoryTemplate = ({
  initialValues, subcategories, isLoading, isSuccess, goBackAction, updateCategories,
  updateCategoryName, handleSubmit, action,
}: CategoryTemplateProps) => {
  const disableSubmitButton = isLoading && isSuccess;
  const buttonText = action === 'create' ? 'Crear' : 'Editar';

  const handleDeleteSubcategory = (subcategoryToDelete: string) => {
    const filteredSubcategories = subcategories.filter((subcategory) => subcategory !== subcategoryToDelete);
    updateCategories(filteredSubcategories);
  };
  const addSubcategory = (subcategory: string) => {
    const newSubcategories = [...subcategories, subcategory];
    updateCategories(newSubcategories);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ManageCategorySchema}
      onSubmit={(values) => handleSubmit(values)}
      enableReinitialize
      validateOnMount
    >
      {({
        submitForm, errors, touched, handleChange,
      }) => (
        <EditCategoryContainer>
          <Field
            component={InputForm}
            fullWidth
            name="categoryName"
            type="text"
            variant="standard"
            label="Título de la categoría"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handleChange(e);
              updateCategoryName(e.target.value);
            }}
          />
          <AddSubcategory addSubcategory={addSubcategory} />
          <SubcategoryTitle>Subcategorías:</SubcategoryTitle>
          { (touched.subcategories && errors.subcategories) && (
          <ErrorParagraphValidation variant="subText">{errors.subcategories}</ErrorParagraphValidation>
          ) }
          {
            subcategories.length > 0 && (
              <SubcategoriesContainerChips>
                { subcategories.map((subcategory) => (
                  <LongChip
                    key={subcategory}
                    label={subcategory}
                    variant="outlined"
                    color="primary"
                    onDelete={() => handleDeleteSubcategory(subcategory)}
                  />
                ))}
              </SubcategoriesContainerChips>
            )
          }
          <EditCategoryButtonContainer>
            <CancelButton onClick={goBackAction}>
              Cancelar
            </CancelButton>
            <PrimaryButton disabled={disableSubmitButton} variant="contained" onClick={submitForm} size="medium">
              { (isLoading && !isSuccess) && (<LoadingSpinner />) }
              { (!isLoading && isSuccess) && (<AppIcon icon="TickMark" fillColor={AppColors.white} />) }
              { (!isLoading && !isSuccess) && buttonText }
            </PrimaryButton>
          </EditCategoryButtonContainer>
        </EditCategoryContainer>
      )}
    </Formik>
  );
};

const EditCategory = ({
  categoryToEdit, goBackAction, updateError, changeSelectCategoryIconFn,
}: EditCategoryTemplateProps) => withEditCategory(CategoryTemplate)({
  categoryToEdit, goBackAction, updateError, changeSelectCategoryIconFn,
});

const CreateCategory = ({
  goBackAction, updateError, changeSelectCategoryIconFn,
}: CreateCategoryTemplateProps) => withCreateCategory(CategoryTemplate)({ goBackAction, updateError, changeSelectCategoryIconFn });

export { EditCategory, CreateCategory };
