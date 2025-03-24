import { useEffect, useState } from 'react';

/**
 * Hook customizado para debounce de um valor.
 * Este hook retorna um valor debounced que é atualizado após um atraso especificado.
 *
 * @template T O tipo do valor que está sendo debounced.
 * @param {T} value O valor a ser debounced.
 * @param {number} [delay=1000] O tempo de atraso em milissegundos. O valor padrão é 1000ms.
 * @returns {T} O valor debounced.
 */
export const useDebounce = <T>(value: T, delay: number = 1000): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};
