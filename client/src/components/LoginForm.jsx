import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  // Student Login Handler
  const handleLogin = async () => {
    // Clear any previous errors
    setError('');
    
    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      // API call for student login
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save user ID to localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', 'student');
        
        // Navigate to student dashboard (you'll create this later)
        console.log('Student login successful! User ID:', data.userId);
        // navigate('/student-dashboard'); // Uncomment when you create student dashboard
        
      } else {
        // Show error message from backend
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  

  // Google Sign In Handler (placeholder for now)
  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    // You can implement Google OAuth later
  };



  // Admin Login Handler
  const handleAdminLogin = async () => {
    // Clear any previous errors
    setError('');
    
    // Validate inputs
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      // API call for admin login
      const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save admin ID to localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', 'admin');
        
        // Navigate to admin dashboard
        console.log('Admin login successful! User ID:', data.userId);
        navigate('/admin');
        
      } else {
        // Show error message from backend
        setError(data.message || 'Admin login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  // Signup Handler
  const handleSignup = async () => {
    // Clear any previous errors
    setError('');
    
    // Validate inputs
    if (!email || !password) {
      setError('Please enter both username and password to sign up');
      return;
    }

    setLoading(true);

    try {
      // API call for signup
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Signup successful
        localStorage.setItem('userId', data.userId);

        localStorage.setItem('userType', 'student');
        
        console.log('Signup successful! User ID:', data.id);
        
        // Show success message
        alert('Account created successfully!');
        
        // redirect to student dashboard once component is ready
        
      } else {
        // Signup failed
        setError(data.message || 'Signup failed. Username might already exist.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="bg-gray-100 p-8 w-full h-full flex flex-col justify-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back</h2>
          <p className="text-gray-600">Discover clubs and events at MITWPU.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email or Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="student@mitwpu.edu.in"
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pl-10 disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute left-3 top-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter your password"
                disabled={loading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all pl-10 pr-10 disabled:bg-gray-200 disabled:cursor-not-allowed"
              />
              <svg 
                className="w-5 h-5 text-gray-400 absolute left-3 top-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              disabled={loading}
            >
              Forgot password?
            </button>
          </div>

          {/* Log In Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 flex items-center">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-3 mb-3 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Sign in with Google
        </button>

        {/* Login as Admin */}
        <button
          onClick={handleAdminLogin}
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
          </svg>
          {loading ? 'Logging in...' : 'Login as Admin'}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?{' '}
          <button 
            onClick={handleSignup}
            disabled={loading}
            className="text-blue-600 hover:text-blue-700 font-semibold disabled:text-blue-400 disabled:cursor-not-allowed"
          >
            Sign up for free
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;