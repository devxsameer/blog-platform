import { Navigate } from 'react-router';
import LoginPage from './pages/Login';
import { loginAction, logoutAction, signupAction } from './auth.actions';
import AuthLayout from '@/layouts/AuthLayout';
import SignupPage from './pages/Signup';

export const authRoute = {
  path: 'auth',
  Component: AuthLayout,
  children: [
    { index: true, element: <Navigate to="login" replace /> },
    { path: 'login', Component: LoginPage, action: loginAction },
    { path: 'signup', Component: SignupPage, action: signupAction },
    { path: 'logout', action: logoutAction },
  ],
};
