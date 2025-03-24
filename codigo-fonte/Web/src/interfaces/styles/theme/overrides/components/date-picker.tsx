import { buttonClasses } from '@mui/material/Button';
import { Theme } from '@mui/material/styles';
import { Icon } from '../../../../components/icon';

const dateList = [
	'DatePicker',
	'DateTimePicker',
	'StaticDatePicker',
	'DesktopDatePicker',
	'DesktopDateTimePicker',
	//
	'MobileDatePicker',
	'MobileDateTimePicker',
];

const timeList = [
	'TimePicker',
	'MobileTimePicker',
	'StaticTimePicker',
	'DesktopTimePicker',
];

const switchIcon = () => (
	<Icon icon='chevron-down' type='regular' size='1.25x' />
);

const leftIcon = () => <Icon icon='arrow-left' type='regular' size='1.25x' />;

const rightIcon = () => <Icon icon='arrow-right' type='regular' size='1.25x' />;

const calendarIcon = () => (
	<Icon icon='calendar-day' type='regular' size='1.25x' />
);

const clockIcon = () => <Icon icon='clock' type='regular' size='1.25x' />;

const desktopTypes = dateList.reduce(
	(result: Record<string, any>, currentValue) => {
		result[`Mui${currentValue}`] = {
			defaultProps: {
				slots: {
					openPickerIcon: calendarIcon,
					leftArrowIcon: leftIcon,
					rightArrowIcon: rightIcon,
					switchViewIcon: switchIcon,
				},
			},
		};

		return result;
	},
	{},
);

const timeTypes = timeList.reduce(
	(result: Record<string, any>, currentValue) => {
		result[`Mui${currentValue}`] = {
			defaultProps: {
				slots: {
					openPickerIcon: clockIcon,
					rightArrowIcon: rightIcon,
					switchViewIcon: switchIcon,
				},
			},
		};

		return result;
	},
	{},
);

export function datePicker(theme: Theme) {
	return {
		MuiPickersLayout: {
			styleOverrides: {
				root: {
					'& .MuiPickersLayout-actionBar': {
						[`& .${buttonClasses.root}:last-of-type`]: {
							backgroundColor: theme.palette.text.primary,
							color:
								theme.palette.mode === 'light'
									? theme.palette.common.white
									: theme.palette.grey[800],
						},
					},
				},
			},
		},

		// Date
		...desktopTypes,

		// Time
		...timeTypes,
	};
}
