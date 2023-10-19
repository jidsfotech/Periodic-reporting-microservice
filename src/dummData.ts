import { IReportData } from './types/types';

const dummyData: IReportData[] = [
  {
    transactions: [
      {
        product: 'Solid oak work table',
        price: '$800',
        quantity: '5',
        date: '03/15/2014',
        status: 'successfull',
      },
      {
        product: 'ball',
        price: '$700',
        quantity: '20',
        date: '03/15/2014',
        status: 'successfull',
      },
      {
        product: 'Books',
        price: '$200',
        quantity: '5',
        date: '03/15/2014',
        status: 'successfull',
      },
      {
        product: 'Light Bulb',
        price: '$300',
        quantity: '21',
        date: '03/15/2014',
        status: 'successfull',
      },
      {
        product: 'Phone',
        price: '$800',
        quantity: '1',
        date: '03/15/2014',
        status: 'successfull',
      },
    ],
    user: {
      email: 'jidsfotech@gmail.com',
      company: 'jidsfotech LTD',
      address: 'No5 Nas crop way',
    },
  },
];

export default dummyData;
