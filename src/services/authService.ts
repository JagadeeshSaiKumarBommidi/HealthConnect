import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { User, LoginCredentials, SignupCredentials, AuthResponse } from '../types/auth';

const JWT_SECRET = 'your-secret-key-here'; // In production, use environment variable
const TOKEN_EXPIRY = '7d';

// Mock user database - In production, this would be a real database
let mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    provider: 'email',
    createdAt: new Date('2024-01-01')
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    name: 'Jane Smith',
    provider: 'email',
    createdAt: new Date('2024-01-02')
  },
  {
    id: '3',
    email: 'admin@company.com',
    name: 'Admin User',
    provider: 'email',
    createdAt: new Date('2024-01-03')
  }
];

// Mock password storage - In production, passwords should be hashed
const mockPasswords: Record<string, string> = {
  'john.doe@example.com': 'password123',
  'jane.smith@example.com': 'password123',
  'admin@company.com': 'admin123'
};

export const authService = {
  // Generate JWT token
  generateToken: (user: User): string => {
    return jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        provider: user.provider 
      },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );
  },

  // Verify JWT token
  verifyToken: (token: string): User | null => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        provider: decoded.provider,
        createdAt: new Date()
      };
    } catch (error) {
      return null;
    }
  },

  // Login with email and password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === credentials.email);
        const storedPassword = mockPasswords[credentials.email];

        if (user && storedPassword === credentials.password) {
          const token = authService.generateToken(user);
          Cookies.set('auth_token', token, { expires: 7 });
          resolve({
            success: true,
            user,
            token,
            message: 'Login successful'
          });
        } else {
          resolve({
            success: false,
            message: 'Invalid email or password'
          });
        }
      }, 1000);
    });
  },

  // Signup with email and password
  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user already exists
        const existingUser = mockUsers.find(u => u.email === credentials.email);
        if (existingUser) {
          resolve({
            success: false,
            message: 'User with this email already exists'
          });
          return;
        }

        // Create new user
        const newUser: User = {
          id: (mockUsers.length + 1).toString(),
          email: credentials.email,
          name: credentials.name,
          provider: 'email',
          createdAt: new Date()
        };

        mockUsers.push(newUser);
        mockPasswords[credentials.email] = credentials.password;

        const token = authService.generateToken(newUser);
        Cookies.set('auth_token', token, { expires: 7 });

        resolve({
          success: true,
          user: newUser,
          token,
          message: 'Account created successfully'
        });
      }, 1200);
    });
  },

  // Google OAuth login
  googleLogin: async (googleUser: any): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user exists
        let user = mockUsers.find(u => u.email === googleUser.email);
        
        if (!user) {
          // Create new user from Google data
          user = {
            id: (mockUsers.length + 1).toString(),
            email: googleUser.email,
            name: googleUser.name,
            avatar: googleUser.picture,
            provider: 'google',
            createdAt: new Date()
          };
          mockUsers.push(user);
        }

        const token = authService.generateToken(user);
        Cookies.set('auth_token', token, { expires: 7 });

        resolve({
          success: true,
          user,
          token,
          message: 'Google login successful'
        });
      }, 800);
    });
  },

  // Get current user from token
  getCurrentUser: (): User | null => {
    const token = Cookies.get('auth_token');
    if (!token) return null;
    return authService.verifyToken(token);
  },

  // Logout
  logout: (): void => {
    Cookies.remove('auth_token');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = Cookies.get('auth_token');
    if (!token) return false;
    return authService.verifyToken(token) !== null;
  }
};