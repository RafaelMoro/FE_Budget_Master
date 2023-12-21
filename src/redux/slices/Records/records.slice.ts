/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { ZERO_CURRENCY } from '../../../constants';
import { RecordsInitialState, UpdateTotalExpenseIncomeAction } from './interface';
import {
  fetchCurrentMonthRecordsFullfilled, fetchCurrentMonthRecordsPending, fetchCurrentMonthRecordsRejected,
} from './actions/fetchCurrentMonthRecords';
import { fetchLastMonthRecordsFullfilled, fetchLastMonthRecordsPending, fetchLastMonthRecordsRejected } from './actions/fetchLastMonthRecords';
import {
  createExpenseFulfilled, createExpensePending, createExpenseRejected,
  createIncomeFulfilled, createIncomePending, createIncomeRejected,
  editExpenseFulfilled, editExpensePending, editExpenseRejected,
  editIncomeFulfilled, editIncomePending, editIncomeRejected,
  updateRelatedExpensesFulfilled,
  updateRelatedExpensesPending,
  updateRelatedExpensesRejected,
} from './actions';
import { deletRecordFulfilled, deleteRecordPending, deleteRecordRejected } from './actions/deleteRecords';

const recordsInitialState: RecordsInitialState = {
  loading: false,
  error: false,
  errorMessage: '',
  loadingOnAction: false,
  errorOnAction: false,
  errorMessageOnAction: '',
  recordToBeModified: null,
  allRecords: {
    currentMonth: null,
    lastMonth: null,
    olderRecords: null,
  },
  totalRecords: {
    currentMonth: {
      expenseTotal: ZERO_CURRENCY,
      incomeTotal: ZERO_CURRENCY,
    },
    lastMonth: {
      expenseTotal: ZERO_CURRENCY,
      incomeTotal: ZERO_CURRENCY,
    },
  },
};

export const recordsSlice = createSlice({
  name: 'records',
  initialState: recordsInitialState,
  reducers: {
    setRecordToBeModified: (state, action) => {
      state.recordToBeModified = action.payload;
    },
    resetRecordsAndTotal: (state) => {
      state.allRecords.currentMonth = [];
      state.allRecords.lastMonth = [];
      state.allRecords.olderRecords = [];

      state.totalRecords.currentMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.currentMonth.incomeTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.expenseTotal = ZERO_CURRENCY;
      state.totalRecords.lastMonth.incomeTotal = ZERO_CURRENCY;
    },
    resetAllRecords: (state) => {
      state.allRecords.currentMonth = [];
      state.allRecords.lastMonth = [];
      state.allRecords.olderRecords = [];
    },
    updateTotalExpense: (state, action: UpdateTotalExpenseIncomeAction) => {
      const { recordAgeCategory, newAmount } = action.payload;
      if (recordAgeCategory === 'Current Month') {
        state.totalRecords.currentMonth.expenseTotal = newAmount;
        return;
      }
      state.totalRecords.lastMonth.expenseTotal = newAmount;
    },
    updateTotalIncome: (state, action: UpdateTotalExpenseIncomeAction) => {
      const { recordAgeCategory, newAmount } = action.payload;
      if (recordAgeCategory === 'Current Month') {
        state.totalRecords.currentMonth.incomeTotal = newAmount;
        return;
      }
      state.totalRecords.lastMonth.incomeTotal = newAmount;
    },
  },
  extraReducers: (builder) => {
    fetchCurrentMonthRecordsPending(builder);
    fetchCurrentMonthRecordsRejected(builder);
    fetchCurrentMonthRecordsFullfilled(builder);

    fetchLastMonthRecordsFullfilled(builder);
    fetchLastMonthRecordsPending(builder);
    fetchLastMonthRecordsRejected(builder);

    createExpenseFulfilled(builder);
    createExpensePending(builder);
    createExpenseRejected(builder);

    createIncomeFulfilled(builder);
    createIncomePending(builder);
    createIncomeRejected(builder);

    editExpenseFulfilled(builder);
    editExpensePending(builder);
    editExpenseRejected(builder);

    editIncomeFulfilled(builder);
    editIncomePending(builder);
    editIncomeRejected(builder);

    updateRelatedExpensesFulfilled(builder);
    updateRelatedExpensesPending(builder);
    updateRelatedExpensesRejected(builder);

    deleteRecordPending(builder);
    deleteRecordRejected(builder);
    deletRecordFulfilled(builder);
  },
});

export const {
  resetRecordsAndTotal, setRecordToBeModified, updateTotalExpense, updateTotalIncome, resetAllRecords,
} = recordsSlice.actions;

export default recordsSlice.reducer;
