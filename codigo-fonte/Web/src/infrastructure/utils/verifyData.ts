export const hasData = (value: any): boolean => {
	// Verifica se o valor não é null, undefined ou vazio
	if (value === null || value == undefined || value === 'null') {
		return false;
	}

	// Verifica se é uma string e se está vazia
	if (typeof value === 'string' && value.trim() === '') {
		return false;
	}

	// Verifica se é um array e está vazio
	if (Array.isArray(value) && value.length === 0) {
		return false;
	}

	// Verifica se é um objeto e está vazio
	if (typeof value === 'object' && Object.keys(value).length === 0) {
		return false;
	}

	// Para outros tipos de dados (números, booleanos, etc.), apenas retorna true se for um valor válido
	return true;
};
