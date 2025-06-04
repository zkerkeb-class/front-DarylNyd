const API_URL = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:5003/auth';

class AuthService {
    static async register({ username, email, password, phone }) {
        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ username, email, password, phone }),
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Registration failed');
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
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Login failed');
            }

            const data = await response.json();
            // Store the token in localStorage for persistence
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return data;
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    }

    static async logout() {
        try {
            const response = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Logout failed');
            }

            // Clear the token from localStorage
            localStorage.removeItem('token');
            return await response.json();
        } catch (error) {
            console.error('Error during logout:', error);
            // Clear token even if logout fails
            localStorage.removeItem('token');
            throw error;
        }
    }

    static async getCurrentUser() {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${API_URL}/me`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
            });

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expired or invalid, try to refresh
                    try {
                        await this.refreshToken();
                        // Retry the getCurrentUser request
                        return await this.getCurrentUser();
                    } catch (refreshError) {
                        localStorage.removeItem('token');
                        throw new Error('Session expired. Please login again.');
                    }
                }
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Failed to get current user');
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
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                credentials: 'include',
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Token refresh failed');
            }

            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            return data;
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
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Failed to send password reset email');
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
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ token, newPassword }),
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || 'Password reset failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    }
}

export default AuthService; 