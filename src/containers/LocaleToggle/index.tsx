/**
 * LocaleToggle
 *
 * Language toggle component for the footer.
 * Adapted from react-boilerplate for modern React hooks + MUI.
 */

import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

import Toggle from '@/components/Toggle';
import { appLocales } from '../../i18n';
import { changeLocale } from '../LanguageProvider/actions';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import messages from './messages';

export default function LocaleToggle() {
  const locale = useSelector(makeSelectLocale());
  const dispatch = useDispatch();

  const onLocaleToggle = (evt: SelectChangeEvent<string>) => {
    dispatch(changeLocale(evt.target.value));
  };

  return (
    <Box sx={{ p: '2px' }}>
      <Toggle
        value={locale}
        values={appLocales}
        messages={messages}
        onToggle={onLocaleToggle}
      />
    </Box>
  );
}
