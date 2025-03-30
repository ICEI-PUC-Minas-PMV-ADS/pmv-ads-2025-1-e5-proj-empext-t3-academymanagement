export const Routes = {
	home: '/',
	auth: '/auth/login',
	refreshPassword: '/auth/refresh',
	user: '/dashboard/user/',
	userEdit: (id: string) => `/dashboard/user/${id}`,
	userCreate: `/dashboard/user/form`,
	notFound: '/error/404',
	forbidden: '/error/403',
	unauthorized: '/error/401',
	internalServerError: '/error/500',
	patientNotFound: '/error/patient/404',
};
