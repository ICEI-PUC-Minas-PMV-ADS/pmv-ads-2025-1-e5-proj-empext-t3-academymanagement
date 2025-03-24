export interface IClientEntitye {
	id?: string;
	name?: string;
	birth_date?: string;
	birth_place?: string;
	occupation?: string;
	income?: string;
	children_number?: string;
	email?: string;
	phone?: string;
	primary_document?: string;
	company_id?: string;
	person_type?: 'INDIVIDUAL' | 'LEGAL_ENTITY';
	marital_status?:
		| 'SINGLE'
		| 'MARRIED'
		| 'DIVORCED'
		| 'WIDOWED'
		| 'SEPARATED'
		| 'CIVIL_UNION'
		| 'DOMESTIC_PARTNERSHIP';
	created_at?: string;
	updated_at?: string;
}
