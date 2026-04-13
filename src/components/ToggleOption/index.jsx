/**
 * ToggleOption
 *
 * Individual option component for the Toggle.
 * Adapted from react-boilerplate for MUI.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import { MenuItem } from '@mui/material';

function ToggleOption({ value, message }) {
  const intl = useIntl();

  return (
    <MenuItem value={value}>
      {message ? intl.formatMessage(message) : value}
    </MenuItem>
  );
}

ToggleOption.propTypes = {
  value: PropTypes.string.isRequired,
  message: PropTypes.object,
};

export default ToggleOption;
