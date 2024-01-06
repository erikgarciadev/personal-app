interface Finance {
  id: string;
  createdAt: any;
  updatedAt: any;
  frequency: string;
}

export interface DailyFinance extends Finance {
  amount: number;
  type: string;
  description: string;
  category: string;
}

export interface OmitDailyFinance
  extends Omit<DailyFinance, 'id' | 'updatedAt'> {}

export interface MonthlyFinance extends Finance {
  amount: number;
  dailiesFinance: OmitDailyFinance[];
  url: string;
  income: number;
  expense: number;
  transactionDate?: any;
}

export interface AnualFinance extends Finance {
  amount: number;
  income: number;
  expense: number;
  informationMontly: {
    url: string;
    month: any;
  }[];
}
