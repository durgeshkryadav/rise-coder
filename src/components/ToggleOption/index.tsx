/**
 * ToggleOption
 *
 * Individual option component for the Toggle.
 * Adapted from react-boilerplate for MUI.
 */

import { useIntl } from 'react-intl';
import type { MessageDescriptor } from 'react-intl';
import { MenuItem } from '@mui/material';

interface ToggleOptionProps {
  value: string;
  message?: MessageDescriptor;
}

function ToggleOption({ value, message }: ToggleOptionProps) {
  const intl = useIntl();

  return (
    <MenuItem value={value}>
      {message ? intl.formatMessage(message) : value}
    </MenuItem>
  );
}

export default ToggleOption;
