const API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:5003/auth';

class AuthService {
    static async register({ username, email, password }) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }

    static async login({ email, password }) {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    static async logout() {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    }

    static async getCurrentUser() {
        try {
            const response = await fetch(`${API_URL}/me`, {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to get current user');
            }

            return await response.json();
        } catch (error) {
            console.error('Error getting current user:', error);
            throw error;
        }
    }

    static async refreshToken() {
        try {
            const response = await fetch(`${API_URL}/refresh-token`, {
                method: 'POST',
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

    static async forgotPassword(email) {
        try {
            const response = await fetch(`${API_URL}/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                throw new Error('Failed to send password reset email');
            }

            return await response.json();
        } catch (error) {
            console.error('Error in forgot password:', error);
            throw error;
        }
    }

    static async resetPassword(token, newPassword) {
        try {
            const response = await fetch(`${API_URL}/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                throw new Error('Password reset failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }
}

export default AuthService; 