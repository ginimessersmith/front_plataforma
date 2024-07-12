export interface FindAllUsersInterface {
  totalItems:  number;
  totalPages:  number;
  currentPage: number;
  pageSize:    number;
  data:        Datum[];
}

export interface Datum {
  id:        number;
  email:     string;
  name:      string;
  phone:     number;
  photo_url: null | string;
  role:      string;
  active:    boolean;
  createdAt: Date;
  updatedAt: Date;
}
