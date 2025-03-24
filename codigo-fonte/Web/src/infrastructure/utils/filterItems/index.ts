import * as fuzzysort from 'fuzzysort';
import { stemmer } from 'stemmer';

const removeSpecialChars = (text: string): string =>
	text.replace(/[^\w\s]/g, '').toLowerCase();

const tokenizeAndStem = (text: string): string[] => {
	return removeSpecialChars(text)
		.split(/\s+/)
		.map((word) => stemmer(word))
		.filter((word) => word.length > 2);
};

const countKeywordMatches = (text: string, keywords: string[]): number => {
	const fieldKeywords = tokenizeAndStem(text);
	return keywords.reduce((count, keyword) => {
		return (
			count +
			fieldKeywords.filter(
				(fieldKeyword) =>
					fuzzysort.single(keyword, fieldKeyword) !== null,
			).length
		);
	}, 0);
};

export const filterItems = <T>(searchText: string, items: T[]): T[] => {
	const keywords = tokenizeAndStem(searchText);

	if (keywords.length === 0) return [];

	const itemScores = items.map((item) => {
		// @ts-ignore
		const itemText = Object.values(item)
			.filter((value): value is string => typeof value === 'string')
			.join(' ');

		const matchCount = countKeywordMatches(itemText, keywords);

		return { item, matchCount };
	});

	const maxMatchCount = Math.max(
		...itemScores.map(({ matchCount }) => matchCount),
	);

	const acceptableRange = maxMatchCount * 0.7;

	const relevantItems = itemScores
		.filter(({ matchCount }) => matchCount >= acceptableRange)
		.sort((a, b) => b.matchCount - a.matchCount)
		.map(({ item }) => item);

	if (relevantItems.length > 0) {
		return relevantItems;
	}

	return [];
};
