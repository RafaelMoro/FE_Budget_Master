/* eslint-disable no-param-reassign */
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { BudgetsInitialState } from './budgets.interface';
import { budgetsApiSlice } from './budgets.api';

const budgetsInitialState: BudgetsInitialState = {
  budgets: null,
};

export const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: budgetsInitialState,
  reducers: {
    resetBudgets: (state) => {
      state.budgets = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isAnyOf(budgetsApiSlice.endpoints.fetchBudgets.matchFulfilled), (state, action) => {
      state.budgets = action.payload;
    });
  },
});

export const { resetBudgets } = budgetsSlice.actions;
export default budgetsSlice.reducer;
