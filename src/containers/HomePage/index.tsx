import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navigation from '@/config/navigation';
import { colors } from '@/design-system/tokens';

/**
 * HomePage — Each section is a full-width banner row
 * with its sub-topic cards inside.
 */
export default function HomePage() {
  const navigate = useNavigate();
  const { section } = useParams<{ section?: string }>();

  const visibleSections = section
    ? navigation.filter((s) => s.basePath === `/${section}`)
    : navigation;

  return (
    <article>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {visibleSections.map((section) => (
          <Box
            key={section.id}
            sx={{
              width: '100%',
              minHeight: 220,
              bgcolor: `${section.color}0d`,
              border: '1px solid',
              borderColor: `${section.color}30`,
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            {/* Section header bar */}
            <Box
              onClick={() => navigate(section.basePath)}
              sx={{
                px: 3,
                py: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1.5,
                cursor: 'pointer',
                borderBottom: '1px solid',
                borderColor: `${section.color}30`,
                bgcolor: `${section.color}18`,
                '&:hover': { bgcolor: `${section.color}28` },
                transition: 'background-color 200ms ease',
              }}
            >
              <FontAwesomeIcon
                icon={section.icon}
                style={{ fontSize: '1.3rem', color: section.color }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: section.color }}
              >
                {section.label}
              </Typography>
            </Box>

            {/* Sub-topic cards inside banner */}
            <Box
              sx={{
                px: 3,
                py: 3,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              {section.children.map((child) => (
                <Box
                  key={child.id}
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
                      boxShadow: `0 6px 20px rgba(0,0,0,0.35)`,
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
                    }}
                  />
                  {/* Card content */}
                  <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center', textAlign: 'center' }}>
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
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, justifyContent: 'center' }}>
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
