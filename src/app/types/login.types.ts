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
  country: null;
  state: null;
  city: null;
  zipCode: null;
  role: Role;
  avatar: string;
  address: string;
  userType: string;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  gender: string;
  age: null;
  designation: string;
  expertise: string;
  boardCertification: string;
  college: string;
  university: string;
  fellowship: string;
  bio: string;
  experience: string[];
  skill: string[];
  languages: null;
  socialMedia: null;
  addDateTime: AddDateTime[];
  tenantConfig: TenantConfig;
  branch: string;
  token: string;
};

export type TenantConfig = {
  id: string;
  name: string;
  address: null;
  desc: null;
  logo: string;
  banner: string;
  media: Media;
};

export type Media = {
  twitter: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  whatsapp: string;
  instagram: string;
};

export type AddDateTime = {
  day: string;
  openTime: string;
  closeTime: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  id: string;
  name: string;
  permissionSequence: number;
  createdBy: string;
  updatedBy: string;
  permissionParent: string;
  desc: string;
  action: string;
  permissionType: null;
  showOnMenu: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
