export interface UserInterface {
  id:        number;
  email:     string;
  name:      string;
  phone?:     number;
  photo_url?: string;
  role:      string;
  active:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
