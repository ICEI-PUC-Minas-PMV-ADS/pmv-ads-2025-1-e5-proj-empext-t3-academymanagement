export interface IMeta {
	total: number;
	lastPage: number;
	currentPage: number;
	perPage: number;
	prev?: number;
	next?: number;
}

export interface IPagination<T> {
	data?: Array<T>;
	message: string;
	meta?: IMeta;
}
