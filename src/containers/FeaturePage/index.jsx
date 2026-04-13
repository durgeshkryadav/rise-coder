/**
 * FeaturePage
 *
 * List all the features of RiseCoders platform
 * Adapted from react-boilerplate for MUI + react-intl
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { Box, Typography, List, ListItem, Paper } from '@mui/material';

import H1 from '@/components/H1';
import messages from './messages';

export default function FeaturePage() {
  return (
    <Box sx={{ p: 3 }}>
      <Helmet>
        <title>Features | RiseCoders</title>
        <meta name="description" content="Features of the RiseCoders platform" />
      </Helmet>
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <List sx={{ pl: 2 }}>
        <ListItem sx={{ display: 'list-item', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <FormattedMessage {...messages.dsaHeader} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FormattedMessage {...messages.dsaMessage} />
          </Typography>
        </ListItem>

        <ListItem sx={{ display: 'list-item', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <FormattedMessage {...messages.systemDesignHeader} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FormattedMessage {...messages.systemDesignMessage} />
          </Typography>
        </ListItem>

        <ListItem sx={{ display: 'list-item', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <FormattedMessage {...messages.reactHeader} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FormattedMessage {...messages.reactMessage} />
          </Typography>
        </ListItem>

        <ListItem sx={{ display: 'list-item', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <FormattedMessage {...messages.javascriptHeader} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FormattedMessage {...messages.javascriptMessage} />
          </Typography>
        </ListItem>

        <ListItem sx={{ display: 'list-item', mb: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            <FormattedMessage {...messages.intlHeader} />
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <FormattedMessage {...messages.intlMessage} />
          </Typography>
        </ListItem>
      </List>
    </Box>
  );
}
