export enum LetterGroup {
  Letter = 0,
  Vowel = 1,
  Consonant = 2
}

export const LetterGroupRegex: Record<LetterGroup, RegExp> = {
  [LetterGroup.Letter]: /^[a-z]$/,
  [LetterGroup.Vowel]: /^[aeiou]$/,
  [LetterGroup.Consonant]: /^[b-df-hj-np-tv-z]$/
};
