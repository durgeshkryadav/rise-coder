import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navigation from '@/config/navigation';
import { colors } from '@/design-system/tokens';

/**
 * HomePage — Categories + sub-topic cards layout.
 * Matches reference design: large icon category cards + accent-bordered sub-cards.
 */
export default function HomePage() {
  const navigate = useNavigate();

  return (
    <article>
      {/* ── Categories row ── */}
      <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary', mb: 3 }}>
        Categories
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 2,
          mb: 6,
        }}
      >
        {navigation.map((section) => (
          <Box
            key={section.id}
            onClick={() => navigate(section.basePath)}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: colors.surface[100],
              border: '1px solid',
              borderColor: 'divider',
              cursor: 'pointer',
              transition: 'transform 200ms ease, box-shadow 200ms ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: `0 8px 24px ${section.color}30`,
              },
            }}
          >
            {/* Colored icon area */}
            <Box
              sx={{
                bgcolor: `${section.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: 4,
                borderBottom: '1px solid',
                borderColor: `${section.color}30`,
              }}
            >
              <FontAwesomeIcon
                icon={section.icon}
                style={{ fontSize: '2.5rem', color: section.color }}
              />
            </Box>
            {/* Label */}
            <Box sx={{ px: 2, py: 1.5, textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: 'text.primary' }}
              >
                {section.label}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* ── Per-section sub-cards ── */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {navigation.map((section) => (
          <Box key={section.id}>
            {/* Section heading */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: 'text.primary', mb: 2 }}
            >
              {section.label}
            </Typography>

            {/* Sub-topic cards grid */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                gap: 2,
              }}
            >
              {section.children.map((child) => (
                <Box
                  key={child.id}
                  sx={{
                    bgcolor: colors.surface[100],
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    overflow: 'hidden',
                    display: 'flex',
                    transition: 'transform 200ms ease, box-shadow 200ms ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 6px 20px rgba(0,0,0,0.3)`,
                      borderColor: section.color,
                    },
                  }}
                >
                  {/* Left accent bar */}
                  <Box
                    sx={{
                      width: 4,
                      minWidth: 4,
                      bgcolor: section.color,
                      borderRadius: '0 0 0 0',
                    }}
                  />
                  {/* Card content */}
                  <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}
                    >
                      {child.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', lineHeight: 1.5, flex: 1 }}
                    >
                      {child.desc}
                    </Typography>
                    {/* Action buttons */}
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Button
                        size="small"
                        onClick={() => navigate(child.path)}
                        sx={{
                          bgcolor: `${section.color}22`,
                          color: section.color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          minWidth: 0,
                          '&:hover': { bgcolor: `${section.color}40` },
                        }}
                      >
                        View
                      </Button>
                      <Button
                        size="small"
                        onClick={() => navigate(child.path)}
                        sx={{
                          bgcolor: `${section.color}22`,
                          color: section.color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          minWidth: 0,
                          '&:hover': { bgcolor: `${section.color}40` },
                        }}
                      >
                        Practice
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </article>
  );
}
