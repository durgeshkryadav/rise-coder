import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import H2 from '@/components/H2';
import { colors } from '@/design-system/tokens';

/**
 * HomePage — Landing container.
 * Pattern: containers hold page-level logic, compose dumb components.
 */
export default function HomePage() {
  return (
    <article>
      <Box sx={{ mb: 6 }}>
        <Chip
          icon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />}
          label="Welcome"
          size="small"
          sx={{
            mb: 3,
            backgroundColor: `${colors.brand[500]}18`,
            color: colors.brand[400],
            fontWeight: 600,
            border: `1px solid ${colors.brand[500]}30`,
          }}
        />

        <H2>
          Master the craft of{' '}
          <span style={{ color: colors.brand[400] }}>software engineering</span>
        </H2>

        <Typography
          variant="body1"
          sx={{ color: colors.neutral[600], maxWidth: 560, lineHeight: 1.8 }}
        >
          Structured learning paths for DSA, System Design, React, and JavaScript.
          Built for developers who want depth, not shortcuts.
        </Typography>
      </Box>

      {/* Feature cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 2.5 }}>
        {[
          { title: 'DSA', desc: 'Arrays, Trees, Graphs, DP — pattern-first approach', path: '/dsa/arrays' },
          { title: 'System Design', desc: 'HLD, LLD, and real-world case studies', path: '/system-design/fundamentals' },
          { title: 'React', desc: 'Hooks, patterns, performance — production-grade', path: '/react/fundamentals' },
          { title: 'JavaScript', desc: 'Closures, async, ES6+ — deep understanding', path: '/javascript/core' },
        ].map((card) => (
          <Box
            key={card.title}
            component="a"
            href={card.path}
            sx={{
              display: 'block',
              p: 3,
              borderRadius: 3,
              backgroundColor: colors.surface[150],
              border: `1px solid ${colors.neutral[300]}`,
              textDecoration: 'none',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                backgroundColor: colors.surface[200],
                borderColor: colors.brand[500] + '60',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: colors.neutral[900], mb: 0.75, fontWeight: 600 }}
            >
              {card.title}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
              {card.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </article>
  );
}
