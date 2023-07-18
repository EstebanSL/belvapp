export interface Link {
  id: string;
  institution: string;
  access_mode: string;
  status: string;
  refresh_rate: string;
  created_by: string;
  last_accessed_at: Date;
  external_id: string;
  created_at: Date;
  institution_user_id: string;
  credentials_storage: string;
  fetch_historical: boolean;
  fetch_resources: any[];
}
