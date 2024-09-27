type PrismaErrorMeta = {
  modelName?: string;
  target?: string[];
};
export type PrismaError = {
  code: string;
  meta?: PrismaErrorMeta;
};

export type SuccessResponse<T> = {
  success: true;
  message: string;
  code: number;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  code: number;
  errors: PrismaError | any;
};
