export interface IUsePopoverProps {
	onClose: VoidFunction;
	open: HTMLElement | null;
	onOpen: (event: React.MouseEvent<HTMLElement>) => void;
	setOpen: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}
