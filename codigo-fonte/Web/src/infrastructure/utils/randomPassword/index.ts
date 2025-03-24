export const randomPassword = (): string => {
	const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const specialCharacters = '@#$%&';

	let password = '';

	password += getRandomCharacter(uppercaseLetters);
	password += getRandomCharacter(lowercaseLetters);
	password += getRandomCharacter(lowercaseLetters);
	password += getRandomCharacter(specialCharacters);
	password += getRandomCharacter(numbers);
	password += getRandomCharacter(numbers);
	password += getRandomCharacter(uppercaseLetters);
	password += getRandomCharacter(lowercaseLetters);
	password += getRandomCharacter(lowercaseLetters);
	password += getRandomCharacter(uppercaseLetters);

	return password;
};

const getRandomCharacter = (characters: string): string => {
	const randomIndex = Math.floor(Math.random() * characters.length);
	return characters[randomIndex];
};
