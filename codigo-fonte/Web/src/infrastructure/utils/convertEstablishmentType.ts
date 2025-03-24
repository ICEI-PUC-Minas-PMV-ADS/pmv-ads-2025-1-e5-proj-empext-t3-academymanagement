export const convertEstablishmentType = (
	accommodation_type?: 'CONDOMINIUM' | 'CHALET',
) => {
	const data = {
		CONDOMINIUM: 'Condomínio',
		CHALET: 'Chalé',
	};

	return accommodation_type ? data[accommodation_type] : 'Não Informado';
};
