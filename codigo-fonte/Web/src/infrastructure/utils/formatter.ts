export class Formatter {
	static sexo(sexo: string): string {
		switch (sexo) {
			case 'M':
				return 'Masculino';
			case 'F':
				return 'Feminino';
			default:
				return 'Indefinido';
		}
	}

	static CPF(cpf: string): string {
		return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	}

	static RG(rg: string): string {
		return rg.replace(/(\d{2})(\d{3})(\d{3})([\dXx]{1})/, '$1.$2.$3-$4');
	}

	static phone(phone: string): string {
		return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
	}

	static CEP(cep: string): string {
		return cep.replace(/(\d{5})(\d{3})/, '$1-$2');
	}

	static idade(dataNascimento: string): string {
		const birthDate = new Date(dataNascimento);
		const currentDate = new Date();
		const age = currentDate.getFullYear() - birthDate.getFullYear();
		const month = currentDate.getMonth() - birthDate.getMonth();
		const finalAge =
			month < 0 ||
			(month === 0 && currentDate.getDate() < birthDate.getDate())
				? age - 1
				: age;
		return `${finalAge} Anos (${birthDate.getFullYear()})`;
	}
}
