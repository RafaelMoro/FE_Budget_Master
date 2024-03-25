import { AnyRecord } from '../../../../globalInterface';

export const backgroundColorDefault = 'green';

export const expenseSample: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Uber home to gym.',
  typeOfRecord: 'expense',
  description: 'Paying Uber to go to smartfit on Solesta',
  category: {
    _id: '123-456-789',
    categoryName: 'Transport',
    icon: 'transportation',
    __v: 0,
    subCategories: ['Didi'],
  },
  date: new Date(),
  account: 'account1',
  subCategory: 'Uber/Didi',
  tag: ['Important'],
  indebtedPeople: [],
  transferId: '',
  budgets: ['Transport'],
  formattedTime: '17:16pm',
  fullDate: 'May 14',
  amount: 109.95,
  amountFormatted: '$109.95',
  isPaid: false,
};

export const expenseSampleWithLongShortName: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  // eslint-disable-next-line max-len
  shortName: "McDonald's didi food 2 combos of $99 each. Rob owes me at Jan 31. Putting more words to see how does the short name behaves in this component. ",
  description: 'Paying Uber to go to a bar.',
  typeOfRecord: 'expense',
  category: {
    _id: '123-456-789',
    categoryName: 'Food',
    icon: 'foodAndDrink',
    __v: 0,
    subCategories: ['Fast Food'],
  },
  subCategory: 'Groceries',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Food'],
  transferId: '',
  formattedTime: '05:21pm',
  fullDate: 'Feb 10',
  amount: 67.43,
  amountFormatted: '$67.43',
  isPaid: false,
  date: new Date(),
  account: 'account1',
};

export const expenseSampleWithLongDescription: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  date: new Date(),
  account: 'account1',
  shortName: 'Groceries for the week.',
  typeOfRecord: 'expense',
  // eslint-disable-next-line max-len
  description: 'Eggs $42.5, Meat $182.8, Bananas $17.2, Avocado $36.34, Six Beers $116.31, Coca-cola $45, Mineral water $36, Chips $63, Erics juice $17, Cheese for two weeeks $230, fried chicken for the family $184.29',
  category: {
    _id: '123-456-789',
    categoryName: 'Food',
    icon: 'foodAndDrink',
    __v: 0,
    subCategories: ['Fast Food'],
  },
  subCategory: 'Groceries',
  tag: ['Important'],
  indebtedPeople: [],
  budgets: ['Food'],
  transferId: '',
  formattedTime: '15:31pm',
  fullDate: 'May 19',
  amount: 970.44,
  amountFormatted: '$970.44',
  isPaid: false,
};

export const ExpenseSampleWithoutTagsAndBudgets: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: '2 Mcdonalds ',
  typeOfRecord: 'expense',
  description: "Mine and Eric's",
  category: {
    _id: '123-456-789',
    categoryName: 'Food',
    icon: 'foodAndDrink',
    __v: 0,
    subCategories: ['Fast Food'],
  },
  subCategory: 'Groceries',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  transferId: '',
  formattedTime: '08:45pm',
  fullDate: 'March 26',
  amount: 156,
  amountFormatted: '$156.00',
  isPaid: false,
  date: new Date(),
  account: 'account1',
};

export const ExpenseSampleWithManyBudgets: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Imagine Dragons concert ',
  typeOfRecord: 'expense',
  description: 'CDMX Concert',
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure',
    icon: 'leisure',
    __v: 0,
    subCategories: ['Concert'],
  },
  subCategory: 'Outdoors',
  tag: [],
  indebtedPeople: [],
  transferId: '',
  budgets: ['Leisure', 'Debt', 'AMEX', 'Transport'],
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: 2256,
  amountFormatted: '$2,256.00',
  isPaid: false,
  date: new Date(),
  account: 'account1',
};

export const ExpenseSampleWithManyBudgetsAndLongNameBudget: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Imagine Dragons concert ',
  typeOfRecord: 'expense',
  description: 'CDMX Concert',
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure',
    icon: 'leisure',
    __v: 0,
    subCategories: ['Concert'],
  },
  subCategory: 'Outdoors',
  tag: [],
  indebtedPeople: [],
  budgets: ['A very long name', 'Debt', 'AMEX', 'Transport', 'Other Budget', 'New Budget'],
  formattedTime: '21:11pm',
  transferId: '',
  fullDate: 'May 10',
  amount: 2256,
  amountFormatted: '$2,256.00',
  isPaid: false,
  date: new Date(),
  account: 'account1',
};

export const ExpenseSampleWithManyBudgetsAndTags: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Imagine Dragons concert ',
  typeOfRecord: 'expense',
  description: 'CDMX Concert',
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure',
    icon: 'leisure',
    __v: 0,
    subCategories: ['Concert'],
  },
  subCategory: 'Outdoors',
  tag: ['Pending', 'Important', 'Beto', 'Other tag'],
  indebtedPeople: [],
  budgets: ['A very long name', 'Debt', 'AMEX', 'Transport', 'Other Budget', 'New Budget'],
  transferId: '',
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: 2256,
  amountFormatted: '$2,256.00',
  isPaid: false,
  date: new Date(),
  account: 'account1',
};

export const ExpenseSampleWithNoBudgetsAndManyTags: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Imagine Dragons concert ',
  typeOfRecord: 'expense',
  description: 'CDMX Concert',
  category: {
    _id: '123-456-789',
    categoryName: 'Leisure',
    icon: 'leisure',
    __v: 0,
    subCategories: ['Concert'],
  },
  subCategory: 'Outdoors',
  tag: ['Pending', 'Important', 'Beto', 'Other tag'],
  indebtedPeople: [],
  budgets: [],
  transferId: '',
  formattedTime: '21:11pm',
  fullDate: 'May 10',
  amount: 2256,
  amountFormatted: '$2,256.00',
  isPaid: false,
  date: new Date(),
  account: 'account1',
};

export const IncomeSample: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Payment to credit card',
  typeOfRecord: 'income',
  description: 'From May 12th to May 19th',
  category: {
    _id: '123-456-789',
    categoryName: 'Payment',
    icon: 'payment',
    __v: 0,
    subCategories: ['Credit Card'],
  },
  subCategory: 'Credit Card',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  transferId: '',
  formattedTime: '21:18pm',
  fullDate: 'June 10',
  amount: 2256,
  amountFormatted: '$2,256.00',
  expensesPaid: [],
  date: new Date(),
  account: 'account1',
};

export const IncomeSampleWithExpensesPaid: AnyRecord = {
  _id: '456-789',
  userId: '987-654',
  shortName: 'Payment to credit card',
  typeOfRecord: 'income',
  description: 'From May 12th to May 19th',
  category: {
    _id: '123-456-789',
    __v: 0,
    categoryName: 'Payment',
    icon: 'payment',
    subCategories: ['Credit Card'],
  },
  subCategory: 'Credit Card',
  tag: [],
  indebtedPeople: [],
  budgets: [],
  transferId: '',
  formattedTime: '21:18pm',
  fullDate: 'June 10',
  amount: 2256,
  amountFormatted: '$2,256.00',
  expensesPaid: [
    {
      _id: '64600b8f2bb57b9d17843d87',
      shortName: 'Chilaquiles',
      amount: 96.03,
      amountFormatted: '$96.03',
      formattedTime: '16:03',
      fullDate: 'May 20',
      isPaid: false,
    },
    {
      _id: '64600b8f2bb57b9d17843d87',
      shortName: 'Chilaquiles',
      amount: 96.03,
      amountFormatted: '$96.03',
      formattedTime: '16:03',
      fullDate: 'May 20',
      isPaid: true,
    },
  ],
  date: new Date(),
  account: 'account1',
};
