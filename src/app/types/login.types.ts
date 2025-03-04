export type LoginUserPayload = {
  identifier: string;
  password: string;
};

export type LoginUserResponse = {
  success: boolean;
  code: number;
  message: string;
  data: UserData;
};

export type UserData = {
  id: string;
  tenant: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phone: string;
  country: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  role: string | null;
  avatar: string | null;
  address: string;
  userType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  branch: string;
  token: string;
};
