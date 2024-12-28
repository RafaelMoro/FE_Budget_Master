/** @jsxImportSource @emotion/react */
import { Routes, Route, Navigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Global } from '@emotion/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import {
  Login, ForgotPassword, Dashboard, ResetPassword, CreateAccount,
} from './pages/LoginModule';
import { CreateRecord } from './pages/Records/CreateRecords/CreateRecord';
import { GlobalStyles } from './styles/Global.styled';
import { EditRecord } from './pages/Records/EditRecords/EditRecord';
import { NotFound } from './pages/NotFound';
import { store } from './redux/store';
import { appTheme } from './styles/theme';
import {
  BUDGETS_ROUTE, BUDGET_EDITOR_PAGE_ROUTE, LOGIN_CHECKER_ROUTE, LOGIN_ROUTE, TRY_APP_ROUTE,
} from './pages/RoutesConstants';
import { BudgetsPage } from './pages/Budgets';
import { BudgetEditorPage } from './pages/Budgets/BudgetEditorPage/BudgetEditorPage';
import { TryApp } from './pages/TryAppPage';
import { LoginChecker } from './pages/LoginChecker';
import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Global styles={GlobalStyles} />
          <Routes>
            <Route path={LOGIN_CHECKER_ROUTE} element={<LoginChecker />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path={LOGIN_ROUTE} element={<Login />} />
            <Route path={TRY_APP_ROUTE} element={<TryApp />} />
            <Route path={BUDGETS_ROUTE} element={<BudgetsPage />} />
            <Route path={BUDGET_EDITOR_PAGE_ROUTE} element={<BudgetEditorPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-record" element={<CreateRecord />} />
            <Route path="/edit-record" element={<EditRecord />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
