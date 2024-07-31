import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/User/user.slice';
import accountsReducer from './slices/Accounts/accounts.slice';
import userInterfaceReducer from './slices/userInterface.slice';
import recordsReducer from './slices/Records/records.slice';
import categoriesReducer from './slices/Categories/categories.slice';
import budgetsReducer from './slices/Budgets/budgets.slice';
import { budgetMasterApi } from './budgetMaster.api';

export const store = configureStore({
  reducer: {
    [budgetMasterApi.reducerPath]: budgetMasterApi.reducer,
    user: userReducer,
    accounts: accountsReducer,
    records: recordsReducer,
    budgets: budgetsReducer,
    categories: categoriesReducer,
    userInterface: userInterfaceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(budgetMasterApi.middleware),
});

// Add rootReducer and setupStore for testing.
const rootReducer = combineReducers({
  [budgetMasterApi.reducerPath]: budgetMasterApi.reducer,
  user: userReducer,
  accounts: accountsReducer,
  records: recordsReducer,
  budgets: budgetsReducer,
  categories: categoriesReducer,
  userInterface: userInterfaceReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ immutableCheck: false, serializableCheck: false }).concat(budgetMasterApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
