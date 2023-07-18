export interface Transaction {
  id: string;
  account: Account;
  created_at: Date;
  category: string;
  subcategory: null;
  merchant: Merchant;
  type: string;
  amount: number;
  status: string;
  balance: number;
  currency: string;
  reference: string;
  value_date: Date;
  description: string;
  collected_at: Date;
  observations: null;
  accounting_date: Date;
  internal_identification: string;
}

export interface Account {
  id: string;
  link: string;
  institution: Institution;
  created_at: Date;
  collected_at: Date;
  currency: string;
  category: string;
  type: string;
  number: string;
  agency: string;
  bank_product_id: string;
  internal_identification: string;
  public_identification_name: string;
  public_identification_value: string;
  credit_data: CreditData;
  loan_data: null;
  name: string;
  balance: Balance;
  last_accessed_at: Date;
  balance_type: string;
}

export interface Balance {
  current: number;
  available: number;
}

export interface CreditData {
  collected_at: Date;
  credit_limit: number;
  cutting_date: Date;
  next_payment_date: Date;
  minimum_payment: number;
  monthly_payment: number;
  no_interest_payment: number;
  last_payment_date: Date;
  last_period_balance: number;
  interest_rate: number;
}

export interface Institution {
  name: string;
  type: string;
}

export interface Merchant {
  name: string;
  website: string;
  logo: string;
}
