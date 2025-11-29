import { wordLists } from '../data/wordLists';

export function getTodaysLesson(language = 'es') {
  const list = wordLists[language] || wordLists.es;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const lesson = list[dayOfYear % list.length];
  return { ...lesson, date: new Date().toISOString().split('T')[0] };
}
