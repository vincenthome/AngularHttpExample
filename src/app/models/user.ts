export interface Users {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        Data[];
}

export interface User {
  data: Data;
}

export interface Data {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}

