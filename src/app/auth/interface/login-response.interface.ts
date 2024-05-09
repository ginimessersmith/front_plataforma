export interface LoginResponseInterface {
  status: string;
  token:  string;
  user:   User;
}

export interface User {
  id:        number;
  email:     string;
  name:      string;
  phone:     null;
  photo_url: null;
  role:      string;
  active:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
