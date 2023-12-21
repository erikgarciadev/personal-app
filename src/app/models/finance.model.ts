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
}

export interface MonthlyFinance extends Finance {
  amount: number;
  dailiesFinance: DailyFinance[];
  url: string;
  income: number;
  expense: number;
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
