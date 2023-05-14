import dayjs from 'dayjs';
export function truncateText(text: string, limit = 20) {
    if (text.length <= limit) return text.slice(text.length / 2);
    return text.slice(0, limit) + '...';
}
export const getChapterComicRoute = (comicId: string | string[] | undefined, chapterId: string) => {
    return `/comic/${comicId}/chapter/${chapterId}`;
}
export const getComicRoute = (comicId: string | string[] | undefined) => {
    return `/comic/${comicId}`;
}

export function getNowFormattedTime() {
    const now = dayjs();
    return now.toISOString();
}
export function getFormattedTime(dateString: string) {
    return dayjs(dateString).format('DD-MM-YYYY');
}