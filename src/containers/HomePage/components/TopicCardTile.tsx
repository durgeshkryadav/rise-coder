import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { colors } from '@/design-system/tokens';

type TopicCardTileProps = {
  title: string;
  description?: string;
  accentColor: string;
  onView: () => void;
  onPractice: () => void;
};

export function TopicCardTile({
  title,
  description,
  accentColor,
  onView,
  onPractice,
}: TopicCardTileProps) {
  return (
    <Box
      sx={{
        bgcolor: colors.surface[200],
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        display: 'flex',
        minWidth: 220,
        flex: '1 1 220px',
        maxWidth: 320,
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          borderColor: accentColor,
        },
      }}
    >
      <Box sx={{ width: 4, minWidth: 4, bgcolor: accentColor }} />
      <Box
        sx={{
          p: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 800, color: 'text.primary', lineHeight: 1.3 }}>
          {title}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', lineHeight: 1.5, flex: 1 }}>
          {description ?? ''}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
          <Button
            size="small"
            onClick={onView}
            sx={{
              bgcolor: `${accentColor}22`,
              color: accentColor,
              fontWeight: 600,
              fontSize: '0.75rem',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              minWidth: 0,
              '&:hover': { bgcolor: `${accentColor}40` },
            }}
          >
            View
          </Button>
          <Button
            size="small"
            onClick={onPractice}
            sx={{
              bgcolor: `${accentColor}22`,
              color: accentColor,
              fontWeight: 600,
              fontSize: '0.75rem',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              minWidth: 0,
              '&:hover': { bgcolor: `${accentColor}40` },
            }}
          >
            Practice
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
