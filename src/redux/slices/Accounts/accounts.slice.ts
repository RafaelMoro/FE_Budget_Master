/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { AccountsInitialState } from './interface';
import {
  fetchAccountsFullfilled, fetchAccountsPending, fetchAccountsRejected,
  createAccountFulfilled, createAccountPending, createAccountRejected,
  deleteAccountFullfilled, deleteAccountPending, deleteAccountRejected,
  modifyAccountFulfilled, modifyAccountPending, modifyAccountRejected,
} from './actions';

const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: null,
  loading: false,
  error: false,
  errorMessage: '',
  // These loading and error states are launched on create, delete or update account.
  loadingOnAction: false,
  errorOnAction: false,
  errorMessageOnAction: '',
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState: accountsInitialState,
  reducers: {
    updateAccountsWithNewSelectedAccount: (state, action) => {
      state.accounts = action.payload;
    },
    updateSelectedAccount: (state, action) => {
      state.accountSelected = action.payload;
    },
    resetAccounts: (state) => {
      state.accounts = null;
    },
    resetSelectedAccount: (state) => {
      state.accountSelected = null;
    },
  },
  extraReducers: (builder) => {
    fetchAccountsPending(builder);
    fetchAccountsFullfilled(builder);
    fetchAccountsRejected(builder);

    deleteAccountPending(builder);
    deleteAccountFullfilled(builder);
    deleteAccountRejected(builder);

    createAccountPending(builder);
    createAccountFulfilled(builder);
    createAccountRejected(builder);

    modifyAccountPending(builder);
    modifyAccountFulfilled(builder);
    modifyAccountRejected(builder);
  },
});

export const {
  updateAccountsWithNewSelectedAccount, updateSelectedAccount, resetAccounts, resetSelectedAccount,
} = accountsSlice.actions;

export default accountsSlice.reducer;
