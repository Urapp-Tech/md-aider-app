import { environment } from './environment';

export const API_PATHS = {
  loginUser() {
    const url = new URL(
      `/api/v1/admin/back-office-user/login`,
      environment.baseURL
    );
    return url.toString();
  },

  getDashboardActivity() {
    const url = new URL(
      `/api/v1/admin/dashboard/activity`,
      environment.baseURL
    );
    return url.toString();
  },

  getCabins(page = 0, size = 10, search = '') {
    const url = new URL(`/api/v1/admin/cabin/list`, environment.baseURL);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    if (search) url.searchParams.append('search', search.toString());
    return url.toString();
  },

  addCabin() {
    const url = new URL(`/api/v1/admin/cabin/create`, environment.baseURL);
    return url.toString();
  },

  editCabin(cabinId: string) {
    const url = new URL(
      `/api/v1/admin/cabin/update/${cabinId}`,
      environment.baseURL
    );
    return url.toString();
  },

  deleteCabin(cabinId: string) {
    const url = new URL(
      `/api/v1/admin/cabin/delete/${cabinId}`,
      environment.baseURL
    );
    return url.toString();
  },

  assignCabin() {
    const url = new URL(`/api/v1/admin/cabin/assign`, environment.baseURL);
    return url.toString();
  },

  getBackOfficeUsers(page = 0, size = 10, search = '') {
    const url = new URL(
      `/api/v1/admin/back-office-user/list`,
      environment.baseURL
    );
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    if (search) url.searchParams.append('search', search.toString());
    return url.toString();
  },

  createBackOfficeUser() {
    const url = new URL(
      `/api/v1/admin/back-office-user/create`,
      environment.baseURL
    );
    return url.toString();
  },

  getEmployees(page = 0, size = 10, search = '') {
    const url = new URL(`/api/v1/admin/employee/list`, environment.baseURL);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    if (search) url.searchParams.append('search', search.toString());
    return url.toString();
  },

  getEmployeeCabinHistory(
    cabinId: string,
    employeeId: string,
    startDate: string,
    endDate: string,
    page = 0,
    size = 10
  ) {
    const url = new URL(`/api/v1/admin/cabin/history`, environment.baseURL);
    url.searchParams.append('cabin', cabinId);
    url.searchParams.append('employee', employeeId);
    url.searchParams.append('startDate', startDate);
    url.searchParams.append('endDate', endDate);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    return url.toString();
  },

  createEmployee() {
    const url = new URL(`/api/v1/admin/employee/create`, environment.baseURL);
    return url.toString();
  },

  getOperationCategories(page = 0, size = 10, search = '') {
    const url = new URL(
      `/api/v1/admin/operation-category/list`,
      environment.baseURL
    );
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    if (search) url.searchParams.append('search', search.toString());
    return url.toString();
  },

  getOperationCategoryItems(
    categoryId: string,
    page = 0,
    size = 10,
    search = ''
  ) {
    const url = new URL(
      `/api/v1/admin/operation-category-item/list`,
      environment.baseURL
    );
    url.searchParams.append('operationCategory', categoryId);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('size', size.toString());
    if (search) url.searchParams.append('search', search.toString());
    return url.toString();
  },

  createOperationReport() {
    const url = new URL(
      `/api/v1/admin/operation-report/create`,
      environment.baseURL
    );
    return url.toString();
  },
};
