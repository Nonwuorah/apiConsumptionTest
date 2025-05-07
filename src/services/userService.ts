import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_URL}/users`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};