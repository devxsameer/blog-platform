import { redirect } from 'react-router';
import { authStore } from './auth.store';

export async function loginLoader() {
  if (authStore.isAuthed()) {
    throw redirect('/');
  }
  return null;
}
