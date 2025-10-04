import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword as firebaseSignIn, 
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendEmailVerification
} from "firebase/auth";
import { auth } from "./config";

// Sign up with email and password
export const signUpWithEmailAndPassword = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update user profile with name
    await updateProfile(user, {
      displayName: `${firstName} ${lastName}`
    });
    
    // Send email verification using the current user
    await sendEmailVerification(auth.currentUser);
    
    // Sign out the user immediately after account creation
    await auth.signOut();
    
    return { user, error: null, message: 'Account created successfully! Please check your email to verify your account before signing in.' };
  } catch (error) {
    return { user: null, error: error.message, message: null };
  }
};

// Sign in with email and password
export const signInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await firebaseSignIn(auth, email, password);
    const user = userCredential.user;
    
    // Check if email is verified using your specified method
    if (!auth.currentUser.emailVerified) {
      alert("Please verify your email before continuing.");
      await auth.signOut();
      return { 
        user: null, 
        error: 'Please verify your email before signing in. Check your inbox for the verification link.',
        needsVerification: true 
      };
    }
    
    return { user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

// Sign out
export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged(callback);
};

// Resend email verification
export const resendEmailVerification = async () => {
  try {
    if (auth.currentUser) {
      await sendEmailVerification(auth.currentUser);
      return { error: null, message: 'Verification email sent successfully!' };
    } else {
      return { error: 'No user is currently signed in.', message: null };
    }
  } catch (error) {
    return { error: error.message, message: null };
  }
};