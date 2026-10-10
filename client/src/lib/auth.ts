interface User {
  id: number;
  email: string;
}

interface AuthResponse {
  user: User | null;
  error?: string;
}

class AuthService {
  private user: User | null = null;
  private listeners: ((user: User | null) => void)[] = [];

  async signUp(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { user: null, error: data.error };
      }

      this.user = data.user;
      this.notifyListeners();
      return { user: data.user };
    } catch (error) {
      return { user: null, error: 'Network error' };
    }
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { user: null, error: data.error };
      }

      this.user = data.user;
      this.notifyListeners();
      return { user: data.user };
    } catch (error) {
      return { user: null, error: 'Network error' };
    }
  }

  async signOut(): Promise<void> {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
      });

      this.user = null;
      this.notifyListeners();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  async getSession(): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/session');
      const data = await response.json();

      this.user = data.user;
      return { user: data.user };
    } catch (error) {
      return { user: null, error: 'Network error' };
    }
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    this.listeners.push(callback);
    
    // Call immediately with current state
    callback(this.user);

    // Return unsubscribe function
    return {
      unsubscribe: () => {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      }
    };
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.user));
  }
}

export const auth = new AuthService();
export type { User, AuthResponse };