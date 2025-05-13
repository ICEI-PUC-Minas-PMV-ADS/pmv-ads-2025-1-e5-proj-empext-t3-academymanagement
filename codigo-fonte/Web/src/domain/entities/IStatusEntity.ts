export interface IStatusCountEntity {
	classe: number;
	frequency: number;
	subscription: number;
	user: number;
}

export interface IBmiProgress {
	date: string;
	weight: number;
	bmi: number;
}

export interface IFinancialManagement {
	date: string;
	cost: number;
}

export interface IStudentAttendance {
	date: string;
	user_name: string;
}
