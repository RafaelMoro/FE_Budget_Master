import { AnyRecord, Category, IndebtedPeople } from '../../../globalInterface';
import { AccountsInitialState, AccountsState } from '../../../redux/slices/Accounts/interface';
import { CategoriesInitialState } from '../../../redux/slices/Categories/interface';
import { UserInitialState } from '../../../redux/slices/User/interface';
import { AccountUI } from '../Account/Account.interface';
import { getMockBudget } from '../Budget/Budget.mocks';
import { GetMockExpenseProps } from './interface';

export const mockRecords: AnyRecord[] = [];

export const mockExpense: AnyRecord = {
  _id: '123-456',
  userId: '987-654',
  shortName: 'Casa a solesta gym',
  typeOfRecord: 'expense',
  // eslint-disable-next-line max-len
  description: 'Esta es una descripcion muy larga para darme una idea de cuanto debo de cortar aproximadamente para la vista corta y la vista larga',
  category: {
    _id: '123-456-789',
    __v: 0,
    categoryName: 'Category dummy',
    icon: 'dummy',
    subCategories: ['foo', 'var'],
  },
  subCategory: 'Didi/Uber',
  tag: [],
  date: new Date(),
  indebtedPeople: [
    {
      name: 'Beto',
      amount: '30',
      amountPaid: '0',
      isPaid: false,
    },
    {
      name: 'George',
      amount: '70',
      amountPaid: '50',
      isPaid: false,
    },
    {
      name: 'Dad',
      amount: '150',
      amountPaid: '150',
      isPaid: true,
    },
  ],
  budgets: [],
  formattedTime: '12:34pm',
  fullDate: 'May 20',
  amount: 150.09,
  amountFormatted: '$150.09',
  account: '123-456-789',
  isPaid: false,
};

export const getMockExpense = ({
  paidStatus = false, budgets = [], tag = [], shortName = '', hasLinkedBudgets = false,
}
: GetMockExpenseProps): AnyRecord => {
  if (hasLinkedBudgets) {
    const budget = getMockBudget();
    return {
      ...mockExpense,
      shortName,
      budgets,
      tag,
      isPaid: paidStatus,
      linkedBudgets: [budget],
    };
  }
  return {
    ...mockExpense,
    shortName,
    budgets,
    tag,
    isPaid: paidStatus,
  };
};

export const creditAccountMock: AccountUI = {
  _id: '2',
  __v: 0,
  title: 'Bank account 2',
  amount: 30000,
  amountFormatted: '$30,000.00',
  accountType: 'Credit',
  backgroundColor: 'blue',
  color: 'white',
  backgroundColorUI: { name: 'blue', color: 'blue' },
  colorUI: { name: 'white', color: 'white' },
  selected: false,
};

export const accountsIniitalState: AccountsInitialState = {
  accounts: [creditAccountMock],
  accountSelected: creditAccountMock,
  accountsLocalStorage: null,
  accountsFetchStatus: 'success',
};

export const mockIncome: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Solesta gym a casa',
  typeOfRecord: 'income',
  description: 'Didi para ir a casa',
  date: new Date(),
  category: {
    _id: '123-456-789',
    __v: 0,
    categoryName: 'Category dummy',
    icon: 'dummy',
    subCategories: ['foo', 'var'],
  },
  subCategory: 'Didi/Uber',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  formattedTime: '1:50pm',
  fullDate: 'May 21',
  amount: 110.24,
  amountFormatted: '$110.24',
  account: '123-456-789',
  expensesPaid: [
    {
      _id: '64600b8f2bb57b9d17843d87',
      shortName: 'Chilaquiles',
      amount: 96.03,
      amountFormatted: '$96.03',
      fullDate: 'May 20',
      formattedTime: '16:03',
      date: new Date('2024-05-20T16:03:00.000Z'),
      isPaid: true,
    },
    {
      _id: '64600b8f2bb57b9d17843d879',
      shortName: 'Bodega despensa',
      amountFormatted: '$370.83',
      amount: 370.83,
      formattedTime: '16:08',
      fullDate: 'May 20',
      date: new Date('2024-05-20T16:03:00.000Z'),
      isPaid: false,
    },
  ],
};

export const mockExpenseTransfer: AnyRecord = {
  transferRecord: {
    transferId: '665c91a10',
    account: '5678',
  },
  _id: '665c91a1094',
  userId: '123-456-789',
  shortName: 'Payment',
  typeOfRecord: 'transfer',
  description: 'Payment to credit card',
  amount: 76,
  amountFormatted: '$76.00',
  date: new Date(),
  fullDate: 'Sat, Jun 29',
  formattedTime: '10:25pm',
  category: {
    _id: '65f3b41b7c46232bf19e7bda',
    categoryName: 'Financial Expenses',
    icon: 'debtAndLoans',
    subCategories: ['Credit card debt'],
    __v: 0,
  },
  subCategory: 'Credit card debt',
  tag: [],
  indebtedPeople: [],
  account: '1234',
  budgets: [],
  isPaid: true,
};

export const mockIncomeTransfer: AnyRecord = {
  transferRecord: {
    transferId: '665c91a10',
    account: '1234',
  },
  _id: '665c91a1094',
  userId: '123-456-789',
  shortName: 'Payment',
  typeOfRecord: 'transfer',
  description: 'Payment to credit card',
  amount: 76,
  amountFormatted: '$76.00',
  date: new Date(),
  fullDate: 'Sat, Jun 29',
  formattedTime: '10:25pm',
  category: {
    _id: '65f3b41b7c',
    categoryName: 'Financial Expenses',
    icon: 'debtAndLoans',
    subCategories: ['Credit card debt'],
    __v: 0,
  },
  subCategory: 'Credit card debt',
  tag: [],
  indebtedPeople: [],
  account: '5678',
  budgets: [],
  expensesPaid: [
    {
      _id: '456-789-7831-4685',
      shortName: 'Netflix',
      amount: 15.49,
      isPaid: true,
      amountFormatted: '$15.49',
      fullDate: 'Fri, Jun 28',
      formattedTime: '12:34pm',
      date: new Date('2024-06-28'),
    },
  ],
};

export const userInitialState: UserInitialState = {
  userInfo: {
    bearerToken: 'The bearer token',
    accessToken: 'The access token',
    user: {
      email: 'email@email.com',
      firstName: 'John',
      lastName: 'Doe',
      middleName: '',
      sub: 'sub-user-id-123',
    },
  },
};

const selectedAccount: AccountUI = {
  _id: '2',
  __v: 0,
  title: 'Bank account 2',
  amount: 30000,
  amountFormatted: '$30,000.00',
  accountType: 'Credit',
  backgroundColor: 'blue',
  color: 'white',
  backgroundColorUI: { name: 'blue', color: 'blue' },
  colorUI: { name: 'white', color: 'white' },
  selected: false,
};

export const accountsInitialState: AccountsInitialState = {
  accounts: null,
  accountSelected: selectedAccount,
  accountsLocalStorage: null,
  // This flag will let know records if they can fetch and give feedback to the user
  accountsFetchStatus: 'isUninitialized',
};

export const getAccountsState = ({ state, accounts }: { state: AccountsState; accounts: AccountUI[] | null }) => ({
  ...accountsInitialState,
  accounts,
  accountsFetchStatus: state,
});

export const mockIndebtedPerson: IndebtedPeople = {
  name: 'John',
  amount: '100',
  amountPaid: '0',
  isPaid: false,
};

export const mockCategories: Category[] = [
  {
    _id: 'some id 1',
    categoryName: 'Food and Drink',
    icon: 'foodAndDrink',
    subCategories: ['Restaurants', 'Groceries'],
    __v: 0,
  },
  {
    _id: 'some id 2',
    categoryName: 'Savings',
    icon: 'savings',
    subCategories: ['Collectible', 'Retirement'],
    __v: 0,
  },
];

export const categoriesInitialState: CategoriesInitialState = {
  currentCategory: null,
  categoryNotSelected: true,
  categoriesLocalStorage: [],
};

export const modifyCategoryState: CategoriesInitialState = {
  ...categoriesInitialState, currentCategory: mockCategories[1], categoryNotSelected: false,
};

export const successfulResponseFetchCategories = {
  data: {
    categories: mockCategories,
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};
export const emptyCategoriesResponse = {
  data: {
    categories: [],
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};
export const createCategoriesResponse = {
  data: {
    categories: mockCategories,
  },
  error: null,
  message: 'New category created',
  success: true,
  version: '2.0.0',
};

export const olderRecordsResponseEmptyRecords = {
  data: {
    records: [],
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};

export const olderRecordsResponse = {
  data: {
    records: [mockExpense, mockIncome],
  },
  error: null,
  message: null,
  success: true,
  version: '2.0.0',
};
export const failedOlderRecordsResponse = {
  data: null,
  error: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  message: null,
  success: false,
  version: '2.0.0',
};
