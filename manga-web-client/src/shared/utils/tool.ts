export function truncateText(text: string, limit = 20) {
    if (text.length <= limit) return text.slice(text.length / 2);
    return text.slice(0, limit) + '...';
}
export const getChapterComicRoute = (comicId: string | string[] | undefined, chapterId: string) => {
    return `/comic/${comicId}/view/${chapterId}`;
}
export const getComicRoute = (comicId: string) => {
    return `/comic/${comicId}`;
}