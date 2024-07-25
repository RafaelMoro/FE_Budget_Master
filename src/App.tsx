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
import { LandingPage } from './pages/LandingPage';
import { store } from './redux/store';
import { appTheme } from './styles/theme';
import { BUDGETS_ROUTE, CREATE_BUDGET_ROUTE, EDIT_CREATE_BUDGET_ROUTE } from './pages/RoutesConstants';
import { BudgetsPage } from './pages/Budgets';
import { CreateBudget } from './pages/Budgets/CreateBudget';
import { EditBudget } from './pages/Budgets/EditBudget/EditBudget';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Global styles={GlobalStyles} />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path={BUDGETS_ROUTE} element={<BudgetsPage />} />
            <Route path={CREATE_BUDGET_ROUTE} element={<CreateBudget />} />
            <Route path={EDIT_CREATE_BUDGET_ROUTE} element={<EditBudget />} />
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
