/**
 * Toggle
 *
 * A select-based toggle component for switching between options.
 * Used for locale switching and other toggles.
 * Adapted from react-boilerplate for MUI.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem } from '@mui/material';

function Toggle({ value, values, messages, onToggle }) {
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

Toggle.propTypes = {
  onToggle: PropTypes.func,
  values: PropTypes.array,
  value: PropTypes.string,
  messages: PropTypes.object,
};

export default Toggle;
