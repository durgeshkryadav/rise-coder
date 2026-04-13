import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import H3 from '@/components/H3';
import { colors } from '@/design-system/tokens';

/**
 * TopicPage — Dynamic container for any section/topic.
 * Routes: /dsa/arrays, /react/hooks, etc.
 */
export default function TopicPage() {
  const { section, topic } = useParams();

  const sectionLabel = section?.replace(/-/g, ' ') ?? '';
  const topicLabel = topic?.replace(/-/g, ' ') ?? '';

  return (
    <article>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Chip
          label={sectionLabel}
          size="small"
          sx={{
            textTransform: 'capitalize',
            fontWeight: 600,
            backgroundColor: `${colors.brand[500]}18`,
            color: colors.brand[400],
            border: `1px solid ${colors.brand[500]}30`,
          }}
        />
      </Box>

      <H3 sx={{ textTransform: 'capitalize' }}>{topicLabel}</H3>

      <Typography variant="body1" sx={{ color: colors.neutral[600], maxWidth: 600, lineHeight: 1.8 }}>
        Content for <strong style={{ color: colors.neutral[800] }}>{topicLabel}</strong> will appear
        here. This container is ready for feature-specific content, queries, and state.
      </Typography>

      {/* Placeholder content area */}
      <Box
        sx={{
          mt: 4,
          p: 4,
          borderRadius: 3,
          backgroundColor: colors.surface[150],
          border: `1px solid ${colors.neutral[300]}`,
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" sx={{ color: colors.neutral[500] }}>
          Content module for{' '}
          <span style={{ color: colors.neutral[700], fontWeight: 600, textTransform: 'capitalize' }}>
            {sectionLabel} → {topicLabel}
          </span>
        </Typography>
      </Box>
    </article>
  );
}
