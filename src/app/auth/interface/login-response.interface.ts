export interface LoginResponseInterface {
  status: string;
  token:  string;
  user:   User;
}

export interface User {
  id:        number;
  email:     string;
  name:      string;
  phone:     number | null;
  photo_url: string | null;
  role:      string;
  active:    boolean;
  createdAt: Date;
  updatedAt: Date;
  totalPoints: number
}
