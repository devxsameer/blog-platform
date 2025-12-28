import { z } from 'zod';
import { ApiEnvelope } from './api.schema';
import { ApiErrorSchema } from './error.schema';
import { UserSchema } from './user.schema';

export const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});
export const SignupInputSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z.string().min(8),
});

/* ---------- payloads ---------- */

export const AuthPayloadSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export const RefreshPayloadSchema = z.object({
  accessToken: z.string(),
});

export const MePayloadSchema = z.object({
  user: UserSchema,
});

/* ---------- responses ---------- */

export const LoginResponseSchema = z.union([
  ApiEnvelope(AuthPayloadSchema),
  ApiErrorSchema,
]);

export const SignupResponseSchema = LoginResponseSchema;

export const RefreshResponseSchema = z.union([
  ApiEnvelope(RefreshPayloadSchema),
  ApiErrorSchema,
]);

export const MeResponseSchema = z.union([
  ApiEnvelope(MePayloadSchema),
  ApiErrorSchema,
]);
