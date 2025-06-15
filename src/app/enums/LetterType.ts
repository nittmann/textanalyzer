export enum LetterType {
  Letter = 0,
  Vowel = 1,
  Consonant = 2
}

export const LetterTypeUtils = {
  regex: {
    [LetterType.Letter]: /^[a-z]$/,
    [LetterType.Vowel]: /^[aeiou]$/,
    [LetterType.Consonant]: /^[b-df-hj-np-tv-z]$/
  },

  getRegExByLetterType(letterType: LetterType): RegExp {
    return this.regex[letterType];
  }
};
