export interface Institution {
  id: number;
  name: string;
  type: ResultType;
  code: null | string;
  website: null;
  display_name: string;
  country_code: CountryCode;
  country_codes: CountryCode[];
  primary_color: PrimaryColor;
  logo: null | string;
  icon_logo: null | string;
  text_logo: null | string;
  form_fields: FormField[];
  customization: null;
  features: Feature[];
  integration_type: IntegrationType;
  status: Status;
  resources: string[];
  openbanking_information: null;
}

export enum CountryCode {
  Br = "BR",
  Co = "CO",
  MX = "MX",
}

export interface Feature {
  name: string;
  description: string;
}

export interface FormField {
  name: Name;
  type: FormFieldType;
  label?: string;
  validation?: Validation;
  placeholder?: string;
  validation_message?: string;
  length?: string;
  optional?: boolean;
  values?: Value[];
  pre_selected?: number;
  value?: string;
}

export enum Name {
  Password = "password",
  Password2 = "password2",
  Token = "token",
  Username = "username",
  Username2 = "username2",
  UsernameType = "username_type",
}

export enum FormFieldType {
  Hidden = "hidden",
  Number = "number",
  Password = "password",
  Select = "select",
  Text = "text",
}

export enum Validation {
  AZ4096AZ6AZ092$ = "^([A-Z]{4})([0-9]{6})([A-Z]{6})([A-Z0-9]{2})$",
  AZAZ09_116$ = "^[a-zA-Z0-9_]{1,16}$",
  D6$ = "^\\d{6}$",
  The09115$ = "^[0-9]{1,15}$",
  The0916$ = "^[0-9]{1,6}$",
  The1$ = "^.{1,}$",
}

export interface Value {
  code: string;
  label: string;
  validation: Validation;
  validation_message: string;
  placeholder: string;
}

export enum IntegrationType {
  Credentials = "credentials",
}

export enum PrimaryColor {
  The056Dae = "#056dae",
  The0Ab0D8 = "#0AB0D8",
}

export enum Status {
  Healthy = "healthy",
}

export enum ResultType {
  Bank = "bank",
  Employment = "employment",
  Fiscal = "fiscal",
}
