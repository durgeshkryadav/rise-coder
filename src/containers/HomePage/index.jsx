import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * HomePage — Landing container.
 * Pattern: containers hold page-level logic, compose dumb components.
 */
export default function HomePage() {
  return (
    <article>
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
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              textDecoration: 'none',
              transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: 'primary.dark',
                transform: 'translateY(-2px)',
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{ color: 'text.primary', mb: 0.75, fontWeight: 600 }}
            >
              {card.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {card.desc}
            </Typography>
          </Box>
        ))}
      </Box>
    </article>
  );
}
