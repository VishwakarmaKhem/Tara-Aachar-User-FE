const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tara-aachar-admin-be.onrender.com';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload {
  email: string;
  password: string;
  phoneNumber: number;
}

export interface AuthUser {
  email: string;
  userType: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface ApiAuthData {
  token: string;
  email: string;
  userType: string;
}

interface ApiResponse<T> {
  message: string;
  success: boolean;
  data: T;
}

export const loginApi = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json: ApiResponse<ApiAuthData> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Login failed');
  }

  return {
    token: json.data.token,
    user: {
      email: json.data.email,
      userType: json.data.userType,
    },
  };
};

export const signupApi = async (payload: SignupPayload): Promise<AuthResponse> => {
  const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const json: ApiResponse<ApiAuthData> = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Registration failed');
  }

  return {
    token: json.data.token,
    user: {
      email: json.data.email,
      userType: json.data.userType,
    },
  };
};
