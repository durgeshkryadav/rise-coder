import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes } from '@mui/system';

type Blind75CubeTileProps = {
  title: string;
  description?: string;
  accentColor: string;
  onOpen: () => void;
};

const cubeSpin = keyframes`
  0% {
    transform: rotateX(-18deg) rotateY(0deg);
  }
  50% {
    transform: rotateX(18deg) rotateY(180deg);
  }
  100% {
    transform: rotateX(-18deg) rotateY(360deg);
  }
`;

export function Blind75CubeTile({
  title,
  description,
  accentColor,
  onOpen,
}: Blind75CubeTileProps) {
  const cubeSize = 138;
  const depth = cubeSize / 2;
  const faceBase = {
    position: 'absolute',
    width: cubeSize,
    height: cubeSize,
    border: `2px solid ${accentColor}`,
    background:
      'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(34,46,85,0.7))',
    boxShadow: `0 0 20px ${accentColor}44, inset 0 0 10px rgba(255,255,255,0.18)`,
    borderRadius: '8px',
    display: 'grid',
    placeItems: 'center',
    color: '#eef3ff',
    fontWeight: 800,
    fontSize: '0.88rem',
    letterSpacing: '0.03em',
    textTransform: 'uppercase',
    textShadow: '0 1px 8px rgba(0,0,0,0.5)',
  };

  return (
    <Box
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      sx={{
        width: 360,
        height: 360,
        flex: '0 0 360px',
        maxWidth: '100%',
        borderRadius: 2,
        border: `1px solid ${accentColor}66`,
        bgcolor: '#0f1324',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        cursor: 'pointer',
        transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
        boxShadow: `0 14px 32px rgba(0,0,0,0.5), 0 0 24px ${accentColor}30`,
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: `${accentColor}aa`,
          boxShadow: `0 18px 36px rgba(0,0,0,0.56), 0 0 34px ${accentColor}48`,
        },
      }}
    >
      <Box
        sx={{
          width: 250,
          height: 250,
          perspective: 840,
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: cubeSize,
            height: cubeSize,
            transformStyle: 'preserve-3d',
            animation: `${cubeSpin} 7s linear infinite`,
          }}
        >
          <Box sx={{ ...faceBase, transform: `translateZ(${depth}px)` }}>{title}</Box>
          <Box sx={{ ...faceBase, transform: `rotateY(180deg) translateZ(${depth}px)` }}>{title}</Box>
          <Box sx={{ ...faceBase, transform: `rotateY(90deg) translateZ(${depth}px)` }}>{title}</Box>
          <Box sx={{ ...faceBase, transform: `rotateY(-90deg) translateZ(${depth}px)` }}>{title}</Box>
          <Box sx={{ ...faceBase, transform: `rotateX(90deg) translateZ(${depth}px)` }}>{title}</Box>
          <Box sx={{ ...faceBase, transform: `rotateX(-90deg) translateZ(${depth}px)` }}>{title}</Box>
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: '#eef3ff',
          fontWeight: 800,
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
      >
        3D Solution
      </Typography>
      <Typography
        variant="caption"
        sx={{
          color: 'rgba(230,236,255,0.82)',
          lineHeight: 1.5,
          textAlign: 'center',
          minHeight: 38,
        }}
      >
        {description ?? ''}
      </Typography>
    </Box>
  );
}
