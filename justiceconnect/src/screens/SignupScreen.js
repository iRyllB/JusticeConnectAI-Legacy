import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { createLocalUser } from '../localdb/userDB';
import SignupScreenUI from '../components/ui/SignupScreenUI';

export default function SignupScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [overlayVisible, setOverlayVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^\d{10,15}$/.test(phone);

  const handleSignup = async () => {
    let hasError = false;
    let errors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!username) {
      errors.username = 'Username required';
      hasError = true;
    }

    if (!email) {
      errors.email = 'Email or phone required';
      hasError = true;
    } else if (!validateEmail(email) && !validatePhone(email)) {
      errors.email = 'Enter valid email or phone number';
      hasError = true;
    }

    if (!password) {
      errors.password = 'Password required';
      hasError = true;
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      hasError = true;
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password required';
      hasError = true;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      hasError = true;
    }

    setErrorMessage(errors);
    if (hasError) return;

    try {
      await createLocalUser({ username, email, password });
      setOverlayVisible(true);
    } catch (err) {
      setErrorMessage({ ...errors, email: err.message });
    }
  };

  const closeOverlay = () => {
    setOverlayVisible(false);
    navigation.replace('Login');
  };

  return (
    <SignupScreenUI
      username={username}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      showConfirmPassword={showConfirmPassword}
      errorMessage={errorMessage}
      overlayVisible={overlayVisible}

      onUsernameChange={setUsername}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onConfirmPasswordChange={setConfirmPassword}
      onToggleShowConfirmPassword={() => setShowConfirmPassword((prev) => !prev)}

      onSignup={handleSignup}
      onBack={() => navigation.goBack()}
      onLogin={() => navigation.navigate('Login')}
      onOverlayClose={closeOverlay}
    />
  );
}
