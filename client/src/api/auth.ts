import AxiosInstance from "utils/axios";

const loginApi = async ({ email, password }: any) => {
  const body = { email, password };
  return AxiosInstance.post("/auth/login", body);
};

const signupApi = async ({ firstName, lastName, email, password }: any) => {
  const body = { firstName, lastName, email, password };
  return AxiosInstance.post("/auth/register", body);
};

const updateProfileApi = async ({ firstName, lastName, imageUrl }: any) => {
  const body = { firstName, lastName, imageUrl };
  return AxiosInstance.put("auth/me", body);
};

const forgotPasswordApi = async ({ email }: any) => {
  const body = { email };
  return AxiosInstance.post("/auth/forgot-password", body);
};

const resetPasswordApi = async (
  { password }: any,
  resetToken: string | undefined,
) => {
  const body = { password };
  return AxiosInstance.put(`auth/reset-password/${resetToken}`, body);
};

export {
  loginApi,
  signupApi,
  updateProfileApi,
  forgotPasswordApi,
  resetPasswordApi,
};
