import { hash } from 'bcrypt';

export const getPasswordHash = (password) => {
  return hash(password, 10);
};
