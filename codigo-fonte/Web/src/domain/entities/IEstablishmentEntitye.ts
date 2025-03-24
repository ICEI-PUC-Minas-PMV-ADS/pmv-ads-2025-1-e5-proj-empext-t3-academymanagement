export interface IEstablishmentEntitye {
	id?: string;
	name?: string;
	accommodation_type?: 'CONDOMINIUM' | 'CHALET';
	max_capacity?: number;
	privacy_level?: number;
	has_balcony?: boolean;
	company_id?: string;
	created_at?: string;
	updated_at?: string;
}
