export const apis = {
  sanctum: `/sanctum/csrf-cookie`,
  login: `/api/login`,
  register: `/api/register`,
  logout: `/api/logout`,
  userData: `/api/user`,
  updateProfile: `/api/user/profile-information?_method=PUT`,
  changePassword: `/api/user/password`,

  verifyOtp: `/api/verify-otp`,
  verifyEmail: `/api/verify-email`,

  resetPassword: `/api/forgot-password`,
  setNewPassword: `/api/reset-password`,
  dashboardnotifications: (userRef: string)=> `/api/dashboard-notifications/${userRef}`,

};

