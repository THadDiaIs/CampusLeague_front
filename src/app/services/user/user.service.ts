import { User } from '../../types/user';
import { Get, Post } from '../api/api.generic';

export class UserService {
    // Get user by ID
    static getUserById(id: number) {
        return Get<User>(`/usuario/${id}`, {}, true);
    }

    // Update user
    static updateUser(id: number, userData: any) {
        return Post<User>(`/usuario/${id}`, userData, true);
    }

    // Delete user
    static deleteUser(id: number) {
        return Post<User>(`/usuario/${id}`, {}, true);
    }
}
