export interface CommonResponse<T> {
  data: T;
  status: number;
  message: string;
}
