import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';
import React from 'react';

export interface IPopupFooterActionsProps {
	sx?: SxProps<Theme>;
	buttons: Array<React.ReactElement>;
}
