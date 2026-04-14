import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import LaunchIcon from '@mui/icons-material/Launch';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import blind75Data, { type Blind75Problem } from '@/data/blind75';
import ProgressService, { type ProblemProgress } from '@/services/progressService';
import { colors } from '@/design-system/tokens';

/* ─── Difficulty colour map ───────────────────────────── */
const difficultyColor: Record<string, string> = {
  Easy: '#00b8a3',
  Medium: '#ffc01e',
  Hard: '#ff375f',
};
const problem3DRoutes: Record<string, string> = {
  'b75-1': '/dsa/blind-75/contains-duplicate-3d',
  'b75-2': '/dsa/blind-75/valid-anagram-3d',
  'b75-3': '/dsa/blind-75/two-sum-3d',
  'b75-4': '/dsa/blind-75/group-anagrams-3d',
  'b75-5': '/dsa/blind-75/top-k-frequent-3d',
  'b75-6': '/dsa/blind-75/encode-decode-3d',
  'b75-7': '/dsa/blind-75/product-except-self-3d',
  'b75-8': '/dsa/blind-75/longest-consecutive-3d',
};

/* ─── localStorage helpers ────────────────────────────── */
const STORAGE_KEY = 'blind75_progress';

function loadLocal(): Record<string, ProblemProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocal(map: Record<string, ProblemProgress>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch { /* quota exceeded — ignore */ }
}

export default function Blind75Page() {
  const navigate = useNavigate();
  const [progressMap, setProgressMap] = useState<Record<string, ProblemProgress>>(loadLocal);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(progressMap);
  mapRef.current = progressMap;

  /* ── Merge remote progress on mount (Supabase wins for newer data) */
  useEffect(() => {
    ProgressService.fetchAll()
      .then((rows) => {
        if (rows.length === 0) return;
        const remote: Record<string, ProblemProgress> = {};
        rows.forEach((r) => { remote[r.problem_id] = r; });
        setProgressMap((prev) => {
          const merged = { ...prev, ...remote };
          saveLocal(merged);
          return merged;
        });
      })
      .catch(() => { /* Supabase unavailable — local data still works */ })
      .finally(() => setLoading(false));
  }, []);

  /* ── Helper: update map, persist locally, fire-and-forget to Supabase */
  const updateProgress = useCallback(
    (problemId: string, patch: Partial<ProblemProgress>) => {
      setProgressMap((prev) => {
        const existing = prev[problemId] ?? { problem_id: problemId, completed: false, starred: false };
        const updated = { ...existing, ...patch, problem_id: problemId };
        const next = { ...prev, [problemId]: updated };
        saveLocal(next);
        return next;
      });
    },
    [],
  );

  /* ── Toggle completed ───────────────────────────────── */
  const handleToggleCompleted = useCallback((problemId: string) => {
    const next = !(mapRef.current[problemId]?.completed ?? false);
    updateProgress(problemId, { completed: next });
    // fire-and-forget remote sync — no rollback
    ProgressService.toggleCompleted(problemId, next).catch(() => {});
  }, [updateProgress]);

  /* ── Toggle starred ─────────────────────────────────── */
  const handleToggleStar = useCallback((problemId: string) => {
    const next = !(mapRef.current[problemId]?.starred ?? false);
    updateProgress(problemId, { starred: next });
    ProgressService.toggleStarred(problemId, next).catch(() => {});
  }, [updateProgress]);

  /* ── Compute totals ─────────────────────────────────── */
  const allProblems = blind75Data.flatMap((w) => w.problems);
  const totalProblems = allProblems.length;
  const completedCount = allProblems.filter((p) => progressMap[p.id]?.completed).length;
  const progressPct = totalProblems ? (completedCount / totalProblems) * 100 : 0;

  return (
    <article>
      {/* ── Header ───────────────────────────────────── */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
            Blind 75
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {completedCount} / {totalProblems}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={progressPct}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: colors.surface[200],
            '& .MuiLinearProgress-bar': { bgcolor: colors.semantic.success, borderRadius: 4 },
          }}
        />
      </Box>

      {/* ── Week sections ────────────────────────────── */}
      {blind75Data.map((week) => {
        const weekCompleted = week.problems.filter((p) => progressMap[p.id]?.completed).length;

        return (
          <Box key={week.week} sx={{ mb: 5 }}>
            {/* Week title + progress */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {week.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {weekCompleted} / {week.problems.length}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={week.problems.length ? (weekCompleted / week.problems.length) * 100 : 0}
                  sx={{
                    width: 100,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: colors.surface[200],
                    '& .MuiLinearProgress-bar': { bgcolor: '#6c63ff', borderRadius: 3 },
                  }}
                />
              </Box>
            </Box>

            {/* Table */}
            <TableContainer
              sx={{
                bgcolor: colors.surface[100],
                borderRadius: 2,
                border: '1px solid',
                borderColor: colors.neutral[400],
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow
                    sx={{
                      '& th': {
                        color: colors.neutral[700],
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        borderBottom: `1px solid ${colors.neutral[400]}`,
                        py: 1.2,
                      },
                    }}
                  >
                    <TableCell width={70} align="center">Status</TableCell>
                    <TableCell width={60} align="center">Star</TableCell>
                    <TableCell>Problem</TableCell>
                    <TableCell width={110} align="center">Difficulty</TableCell>
                    <TableCell width={80} align="center">Solution</TableCell>
                    <TableCell width={100} align="center">3D Solution</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {week.problems.map((problem) => {
                    const isCompleted = progressMap[problem.id]?.completed ?? false;
                    const isStarred = progressMap[problem.id]?.starred ?? false;

                    return (
                      <TableRow
                        key={problem.id}
                        sx={{
                          bgcolor: isCompleted ? 'rgba(52, 211, 153, 0.10)' : 'transparent',
                          transition: 'background-color 250ms ease',
                          '&:hover': {
                            bgcolor: isCompleted ? 'rgba(52, 211, 153, 0.18)' : colors.surface[200],
                          },
                          '& td': {
                            borderBottom: `1px solid ${colors.neutral[300]}`,
                            py: 1.3,
                          },
                        }}
                      >
                        {/* Status checkbox */}
                        <TableCell align="center">
                          <Checkbox
                            checked={isCompleted}
                            onChange={() => handleToggleCompleted(problem.id)}
                            size="small"
                            disabled={loading}
                            sx={{
                              color: colors.neutral[500],
                              '&.Mui-checked': { color: colors.semantic.success },
                            }}
                          />
                        </TableCell>

                        {/* Star */}
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            onClick={() => handleToggleStar(problem.id)}
                            disabled={loading}
                            sx={{ color: isStarred ? '#fbbf24' : colors.neutral[500] }}
                          >
                            {isStarred ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
                          </IconButton>
                        </TableCell>

                        {/* Problem — name + link + tag */}
                        <TableCell>
                          <ProblemCell problem={problem} />
                        </TableCell>

                        {/* Difficulty */}
                        <TableCell align="center">
                          <Chip
                            label={problem.difficulty}
                            size="small"
                            sx={{
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              bgcolor: `${difficultyColor[problem.difficulty]}18`,
                              color: difficultyColor[problem.difficulty],
                              border: `1px solid ${difficultyColor[problem.difficulty]}40`,
                              height: 24,
                            }}
                          />
                        </TableCell>

                        {/* Solution */}
                        <TableCell align="center">
                          <IconButton size="small" sx={{ color: colors.neutral[600] }}>
                            <DescriptionOutlinedIcon fontSize="small" />
                          </IconButton>
                        </TableCell>

                        {/* 3D Solution */}
                        <TableCell align="center">
                          <IconButton
                            size="small"
                            sx={{ color: colors.neutral[600] }}
                            disabled={!problem3DRoutes[problem.id]}
                            onClick={() => {
                              const route = problem3DRoutes[problem.id];
                              if (route) navigate(route);
                            }}
                          >
                            <ViewInArIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      })}
    </article>
  );
}

/* ─── Sub-components ──────────────────────────────────── */

function ProblemCell({ problem }: { problem: Blind75Problem }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Box
        component="a"
        href={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          fontSize: '0.88rem',
          textDecoration: 'none',
          '&:hover': { color: '#6c63ff', textDecoration: 'underline' },
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {problem.title}
        <LaunchIcon sx={{ fontSize: '0.85rem', opacity: 0.5 }} />
      </Box>

      <Chip
        label={problem.tag}
        size="small"
        sx={{
          ml: 1,
          fontWeight: 600,
          fontSize: '0.68rem',
          height: 20,
          bgcolor: `${colors.brand[400]}18`,
          color: colors.brand[400],
          border: `1px solid ${colors.brand[400]}30`,
        }}
      />

      <Typography variant="caption" sx={{ color: colors.neutral[500], ml: 0.5 }}>
        {problem.time} min
      </Typography>
    </Box>
  );
}
