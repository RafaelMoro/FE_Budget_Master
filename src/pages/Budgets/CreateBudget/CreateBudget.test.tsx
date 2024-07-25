import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../tests/CustomWrapperRedux';
import { CreateBudget } from './CreateBudget';

describe('Create budget page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  const history = createMemoryHistory();
  test('Should show the create budget page', () => {
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <CreateBudget />
      </Router>,
    );

    expect(screen.getByText('Create budget:')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /budget limit/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /amount spent/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
  });
});
