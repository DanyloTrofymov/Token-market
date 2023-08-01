import { Box } from '@mui/material';
import styled from 'styled-components';
import { FONTS } from '../theme';

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-size: ${FONTS.SIZES.xl};
  font-weight: ${FONTS.WEIGHTS.bold};
`;
