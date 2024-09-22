export function getInitials(word1: string, word2: string) {
  const initial1 = word1.charAt(0).toUpperCase();
  const initial2 = word2.charAt(0).toUpperCase();
  return `${initial1}${initial2}`;
}
