import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { colors } from '@/design-system/tokens';

/**
 * TopicPage — Generic page for any section/topic combo.
 * Routes like /dsa/arrays, /react/hooks, etc. all render here.
 */
export default function TopicPage() {
  const { section, topic } = useParams();

  const sectionLabel = section?.replace(/-/g, ' ') ?? '';
  const topicLabel = topic?.replace(/-/g, ' ') ?? '';

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Chip
          label={sectionLabel}
          size="small"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 600,
            backgroundColor: `${colors.brand[500]}20`,
            color: colors.brand[400],
          }}
        />
      </Box>
      <Typography
        variant="h3"
        sx={{ mb: 2, textTransform: 'capitalize', letterSpacing: '-0.02em' }}
      >
        {topicLabel}
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600 }}>
        Content for <Box component="strong" sx={{ color: 'text.primary' }}>{topicLabel}</Box> will appear
        here. This page is ready for feature-specific content to be plugged in.
      </Typography>
    </Box>
  );
}
