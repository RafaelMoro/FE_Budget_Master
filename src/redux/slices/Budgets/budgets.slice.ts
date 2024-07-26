import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { BudgetsInitialState } from './budgets.interface';
import { budgetsApiSlice } from './budgets.api';

const budgetsInitialState: BudgetsInitialState = {
  budgets: null,
};

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: budgetsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(budgetsApiSlice.endpoints.fetchBudgets.matchFulfilled), (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.budgets = action.payload;
    });
  },
});

export default budgetsSlice.reducer;
