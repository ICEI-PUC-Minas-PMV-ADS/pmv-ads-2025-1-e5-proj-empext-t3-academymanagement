import { useCallback, useState } from 'react';
import { IUsePopoverProps } from './types';

export const usePopover = (): IUsePopoverProps => {
	const [open, setOpen] = useState<HTMLElement | null>(null);

	const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
		setOpen(event.currentTarget);
	}, []);

	const onClose = useCallback(() => {
		setOpen(null);
	}, []);

	return {
		open,
		onOpen,
		onClose,
		setOpen,
	};
};
