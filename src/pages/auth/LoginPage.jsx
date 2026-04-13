import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Link from '@mui/material/Link';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '@/contexts/AuthContext';
import { colors } from '@/design-system/tokens';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format.';
    if (!password) return 'Password is required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await signIn({ email, password });
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100dvh',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 5,
          borderRadius: 3,
          border: `1px solid`,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        {/* Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '6px',
              background: `linear-gradient(135deg, ${colors.brand[400]}, ${colors.brand[600]})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 800,
              fontSize: '0.875rem',
              boxShadow: `0 0 16px ${colors.brand[400]}50`,
            }}
          >
            R
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            RiseCoders
          </Typography>
        </Box>

        <Typography variant="h5" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
          Welcome back
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Sign in to your account to continue.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          sx={{ mb: 1 }}
        />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
          <Link component={RouterLink} to="/auth/forgot-password" variant="body2" underline="hover">
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mb: 2, py: 1.2 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign In'}
        </Button>

        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
          Don&apos;t have an account?{' '}
          <Link component={RouterLink} to="/auth/signup" underline="hover">
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
