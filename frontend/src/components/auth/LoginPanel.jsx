
import { AppProvider, SignInPage } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import axios from 'axios'


const providers = [{ id: 'credentials', name: 'Email and Password' }];

const signIn = async (provider, formData) => {
  // Extract email and password from the formData
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    // Send a POST request to your Django backend for authentication
    const response = await axios.post('http://127.0.0.1:8000/api/v1/auth/login/', {
      email,
      password,
    });

    // If successful, store tokens (refresh and access) in localStorage
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    localStorage.setItem('first_name', response.data.first_name);
    localStorage.setItem('last_name', response.data.last_name);
    localStorage.setItem('email', response.data.email)

    // Optionally: Redirect the user to the dashboard or another page
    window.location.href = '/app'; // Or use useNavigate() for navigation in React Router
  } catch (error) {
    alert('Home failed. Please check your email and password.  Error: ' + error);
  }
};

export default function LoginPanel() {
  const theme = useTheme();

  return (
    <AppProvider theme={theme}>
      <SignInPage signIn={signIn} providers={providers} />
    </AppProvider>
  );
}