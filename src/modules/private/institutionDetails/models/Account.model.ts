export interface AccountDetails {
  id: string;
  link: string;
  institution: Institution;
  created_at: Date;
  collected_at: Date;
  currency: string;
  category: string;
  type: string;
  number: string;
  agency: null;
  bank_product_id: string;
  internal_identification: string;
  public_identification_name: string;
  public_identification_value: string;
  credit_data: null;
  loan_data: null;
  name: string;
  balance: Balance;
  last_accessed_at: Date;
  funds_data: FundsDatum[];
  balance_type: string;
}

export interface Balance {
  current: number;
  available: number;
}

export interface FundsDatum {
  collected_at: Date;
  name: string;
  type: Type;
  public_identifications: PublicIdentification[];
  balance: number;
  percentage: number;
}

export interface PublicIdentification {
  name: Name;
  value: string;
}

export enum Name {
  Cnpj = "CNPJ",
  Susep = "SUSEP",
}

export enum Type {
  Pgbl = "PGBL",
}

export interface Institution {
  name: string;
  type: string;
}
