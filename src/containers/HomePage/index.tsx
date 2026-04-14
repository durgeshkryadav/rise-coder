import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import navigation from '@/config/navigation';
import { Blind75CubeTile } from './components/Blind75CubeTile';
import { TopicCardTile } from './components/TopicCardTile';

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
                (() => {
                  const sectionColor = section.color ?? '#6ab4d4';
                  return section.id === 'dsa' && child.id === 'dsa-blind75' ? (
                    <Blind75CubeTile
                      key={child.id}
                      title={child.label}
                      description={child.desc}
                      accentColor={sectionColor}
                      onOpen={() => navigate(child.path)}
                    />
                  ) : (
                    <TopicCardTile
                      key={child.id}
                      title={child.label}
                      description={child.desc}
                      accentColor={sectionColor}
                      onView={() => navigate(child.path)}
                      onPractice={() => navigate(child.path)}
                    />
                  );
                })()
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </article>
  );
}
