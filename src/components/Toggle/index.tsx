/**
 * Toggle
 *
 * A select-based toggle component for switching between options.
 * Used for locale switching and other toggles.
 * Adapted from react-boilerplate for MUI.
 */

import { Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface ToggleProps {
  value: string;
  values?: string[];
  messages?: Record<string, { defaultMessage?: string }>;
  onToggle: (event: SelectChangeEvent<string>) => void;
}

function Toggle({ value, values, messages, onToggle }: ToggleProps) {
  return (
    <Select
      value={value}
      onChange={onToggle}
      size="small"
      variant="standard"
      sx={{
        backgroundColor: 'transparent',
        borderStyle: 'none',
        fontSize: '0.875rem',
        color: 'text.secondary',
      }}
    >
      {values
        ? values.map((val) => (
            <MenuItem key={val} value={val}>
              {messages && messages[val]
                ? messages[val].defaultMessage || val
                : val}
            </MenuItem>
          ))
        : <MenuItem value="">--</MenuItem>
      }
    </Select>
  );
}

export default Toggle;
