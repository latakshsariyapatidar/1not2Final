import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../Static/Background';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import { signInWithGoogle } from '../../../firebase/auth';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (formData.confirmPassword && formData.password) {
      setPasswordMatch(formData.password === formData.confirmPassword);
    }
  }, [formData.password, formData.confirmPassword]);

  const validateGmailEmail = (email) => {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return gmailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate email for Gmail only
    if (name === 'email') {
      if (value && !validateGmailEmail(value)) {
        setEmailError('For now, we accept only valid Gmail addresses');
      } else {
        setEmailError('');
      }
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // Validate Gmail before submission
    if (!validateGmailEmail(formData.email)) {
      setEmailError('For now, we accept only valid Gmail addresses');
      return;
    }
    
    setIsLoading(true);
    setAuthError('');
    setSuccessMessage('');
    
    try {
      // Step 1: Create user account
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email, 
        formData.password
      );
      
      const user = userCredential.user;
      
      // Step 2: Update user profile with name
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`
      });
      
      // Step 3: Send email verification
      await sendEmailVerification(auth.currentUser);
      
      // Step 4: Sign out the user immediately
      await signOut(auth);
      
      // Step 5: Show success message and redirect
      setSuccessMessage('Account created successfully! Please check your email to verify your account before signing in.');
      console.log('Account created, verification email sent');
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);
      
    } catch (error) {
      setAuthError(error.message);
      console.error('Sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      const result = await signInWithGoogle();
      
      if (result.error) {
        setAuthError(result.error);
      } else {
        // Successfully signed in with Google
        console.log('User signed up with Google:', result.user);
        navigate('/'); // Redirect to home page
      }
    } catch (error) {
      setAuthError('Failed to sign up with Google. Please try again.');
      console.error('Google sign up error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="w-full min-h-screen relative overflow-hidden bg-zinc-800">
      {/* Font Loading */}
      <style>{`
        @font-face {
          font-family: 'Compressa';
          src: url('https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2') format('woff2');
          font-style: normal;
          font-weight: 100 900;
          font-display: swap;
        }
      `}</style>
      
      {/* Background */}
      <Background />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center text-[#B0B0B0] p-4">
        {/* Main Content Container */}
        <div className={`w-full max-w-md transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Header */}
          <div className="text-center mb-8 relative">
            <div className="mb-4">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-300 uppercase tracking-wider leading-tightest"
                style={{ 
                  fontFamily: 'Compressa, sans-serif',
                }}
              >
                JOIN US
              </h1>
            </div>
            <p className="text-lg text-gray-500 animate-pulse">Create your account</p>
          </div>

          {/* Interactive Sign Up Form */}
          <div className={`bg-black/20 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8 shadow-2xl hover:shadow-black/20 transition-all duration-500 transform ${isVisible ? 'scale-100' : 'scale-95'}`}>
            {/* Auth Error Display */}
            {authError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400 text-sm text-center">{authError}</p>
              </div>
            )}
            
            {/* Success Message Display */}
            {successMessage && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-sm text-center">{successMessage}</p>
                <p className="text-green-300 text-xs text-center mt-2">Redirecting to login page in 3 seconds...</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Disable form when success message is shown */}
              <fieldset disabled={!!successMessage} className={successMessage ? 'opacity-50 pointer-events-none' : ''}>
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 group">
                  <label 
                    htmlFor="firstName" 
                    className={`block text-sm font-medium transition-colors duration-300 ${
                      focusedField === 'firstName' ? 'text-[#5227FF]' : 'text-gray-500'
                    }`}
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onFocus={() => handleFocus('firstName')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-3 py-3 bg-black/30 border border-gray-700/50 rounded-lg text-gray-300 placeholder-gray-600 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:border-transparent ${
                        focusedField === 'firstName' 
                          ? 'focus:ring-[#5227FF] shadow-lg shadow-[#5227FF]/20' 
                          : 'focus:ring-[#B19EEF]'
                      }`}
                      placeholder="First"
                    />
                    {focusedField === 'firstName' && (
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#5227FF] to-[#B19EEF] animate-pulse"></div>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2 group">
                  <label 
                    htmlFor="lastName" 
                    className={`block text-sm font-medium transition-colors duration-300 ${
                      focusedField === 'lastName' ? 'text-[#FF9FFC]' : 'text-gray-500'
                    }`}
                  >
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onFocus={() => handleFocus('lastName')}
                      onBlur={handleBlur}
                      required
                      className={`w-full px-3 py-3 bg-black/30 border border-gray-700/50 rounded-lg text-gray-300 placeholder-gray-600 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:border-transparent ${
                        focusedField === 'lastName' 
                          ? 'focus:ring-[#FF9FFC] shadow-lg shadow-[#FF9FFC]/20' 
                          : 'focus:ring-[#B19EEF]'
                      }`}
                      placeholder="Last"
                    />
                    {focusedField === 'lastName' && (
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF9FFC] to-[#B19EEF] animate-pulse"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2 group">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium transition-colors duration-300 ${
                    focusedField === 'email' ? 'text-[#B19EEF]' : 'text-gray-500'
                  }`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-gray-300 placeholder-gray-600 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:border-transparent ${
                      emailError
                        ? 'border-red-500/50 focus:ring-red-500/50'
                        : focusedField === 'email' 
                        ? 'border-gray-700/50 focus:ring-[#B19EEF] shadow-lg shadow-[#B19EEF]/20' 
                        : 'border-gray-700/50 focus:ring-[#B19EEF]'
                    }`}
                    placeholder="Enter your Gmail address"
                  />
                  {focusedField === 'email' && !emailError && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#B19EEF] to-[#5227FF] animate-pulse"></div>
                  )}
                  {emailError && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-500 animate-pulse"></div>
                  )}
                </div>
                {emailError && (
                  <p className="text-red-400 text-xs mt-1 animate-pulse">{emailError}</p>
                )}
              </div>

              {/* Password Fields */}
              <div className="space-y-2 group">
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium transition-colors duration-300 ${
                    focusedField === 'password' ? 'text-[#FF9FFC]' : 'text-gray-500'
                  }`}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => handleFocus('password')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 pr-12 bg-black/30 border border-gray-700/50 rounded-lg text-gray-300 placeholder-gray-600 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:border-transparent ${
                      focusedField === 'password' 
                        ? 'focus:ring-[#FF9FFC] shadow-lg shadow-[#FF9FFC]/20' 
                        : 'focus:ring-[#B19EEF]'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {focusedField === 'password' && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#FF9FFC] to-[#B19EEF] animate-pulse"></div>
                  )}
                </div>
              </div>

              <div className="space-y-2 group">
                <label 
                  htmlFor="confirmPassword" 
                  className={`block text-sm font-medium transition-colors duration-300 ${
                    focusedField === 'confirmPassword' ? 'text-[#5227FF]' : 'text-gray-500'
                  }`}
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => handleFocus('confirmPassword')}
                    onBlur={handleBlur}
                    required
                    className={`w-full px-4 py-3 pr-12 bg-black/30 border border-gray-700/50 rounded-lg text-gray-300 placeholder-gray-600 transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-2 focus:border-transparent ${
                      focusedField === 'confirmPassword' 
                        ? `focus:ring-[#5227FF] shadow-lg shadow-[#5227FF]/20 ${!passwordMatch ? 'border-red-500/50' : ''}` 
                        : 'focus:ring-[#B19EEF]'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                  {focusedField === 'confirmPassword' && (
                    <div className={`absolute -bottom-1 left-0 w-full h-0.5 ${passwordMatch ? 'bg-gradient-to-r from-[#5227FF] to-[#B19EEF]' : 'bg-red-500'} animate-pulse`}></div>
                  )}
                  {!passwordMatch && formData.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3 group">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 w-4 h-4 text-[#FF9FFC] bg-black/30 border border-gray-700/50 rounded focus:ring-[#FF9FFC] focus:ring-2 transition-all duration-300"
                />
                <label htmlFor="terms" className="text-sm text-gray-600 group-hover:text-gray-500 transition-colors duration-300">
                  I agree to the{' '}
                  <a href="#" className="text-[#6B46C1] hover:text-gray-400 transition-colors duration-300">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#6B46C1] hover:text-gray-400 transition-colors duration-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || !passwordMatch || emailError || successMessage}
                className="w-full bg-black/20 hover:bg-black/40 border border-gray-700/50 text-gray-300 font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF9FFC]/10 via-[#B19EEF]/10 to-[#5227FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-gray-500/50 border-t-gray-300 rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : successMessage ? (
                    'Account Created!'
                  ) : (
                    'Create Account'
                  )}
                </div>
              </button>
              </fieldset>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
              <span className="px-4 text-sm text-gray-600">or</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-700/50 to-transparent"></div>
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
              className="w-full bg-black/10 hover:bg-black/30 border border-gray-700/50 text-gray-300 font-semibold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 flex items-center justify-center space-x-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-red-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 flex items-center space-x-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign up with Google</span>
              </div>
            </button>

            {/* Sign In Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#6B46C1] hover:text-gray-400 font-semibold transition-all duration-300 transform hover:scale-105 inline-block"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-400 transition-all duration-300 transform hover:scale-105 hover:translate-x-1"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;