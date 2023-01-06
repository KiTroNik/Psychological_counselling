interface IPaginatedResponse<T> {
  items: T;
  total: number;
  page: number;
  size: number;
}

export default IPaginatedResponse;
