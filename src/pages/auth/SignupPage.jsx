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

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email format.';
    if (!password) return 'Password is required.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (!/[A-Z]/.test(password)) return 'Password must include at least one uppercase letter.';
    if (!/[a-z]/.test(password)) return 'Password must include at least one lowercase letter.';
    if (!/[0-9]/.test(password)) return 'Password must include at least one number.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const data = await signUp({ email, password });
      if (data.user && !data.session) {
        setSuccess('Check your email for a confirmation link.');
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Failed to create account.');
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
          Create your account
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          Start your learning journey today.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
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
          autoComplete="new-password"
          helperText="Min 8 chars, 1 uppercase, 1 lowercase, 1 number"
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          autoComplete="new-password"
          sx={{ mb: 3 }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ mb: 2, py: 1.2 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : 'Sign Up'}
        </Button>

        <Typography variant="body2" align="center" sx={{ color: 'text.secondary' }}>
          Already have an account?{' '}
          <Link component={RouterLink} to="/auth/login" underline="hover">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
