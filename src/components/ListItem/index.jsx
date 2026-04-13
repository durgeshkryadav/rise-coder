import React from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';

const Wrapper = styled('li')(({ theme }) => ({
  width: '100%',
  height: '3em',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  borderTop: `1px solid ${theme.palette.divider}`,
  '&:first-of-type': {
    borderTop: 'none',
  },
}));

const Item = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '100%',
  alignItems: 'center',
});

function ListItem({ item }) {
  return (
    <Wrapper>
      <Item>{item}</Item>
    </Wrapper>
  );
}

ListItem.propTypes = {
  item: PropTypes.any,
};

export default ListItem;
