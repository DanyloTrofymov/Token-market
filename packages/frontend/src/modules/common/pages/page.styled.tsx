import { Box, styled } from '@mui/material';
import { COLORS, SPACES, BORDERS } from '../../theme';

export const StyledPageBox = styled(Box)`
  display: flex;
  flex-direction: column;
  border-bottom: ${BORDERS.borderBottom};
  border-radius: ${BORDERS.tableBorderRadius};
  box-shadow: ${BORDERS.boxShadow};
  align-items: center;
  margin: 0;
  height: 90vh;
  top: ${SPACES.l};
  background-color: ${COLORS.hoverBackground};
`;

export const StyledAuthPageBox = styled(StyledPageBox)`
  justify-content: center;
  align-items: center;
`;

export const StyledFormBox = styled(Box)`
  padding: ${SPACES.l};
  margin: ${SPACES.l};
  display: flex;
  top: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-height: 60vh;
  width: 40vw;
  min-width: 300px;
  border-bottom: ${BORDERS.borderBottom};
  border-radius: ${BORDERS.tableBorderRadius};
  box-shadow: ${BORDERS.boxShadow};
  background-color: ${COLORS.white};
  top: ${SPACES.l};
`;
