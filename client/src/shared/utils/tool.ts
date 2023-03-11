export function truncateText(text: string, limit = 20) {
    if (text.length <= limit) return text.slice(text.length / 2);
    return text.slice(0, limit) + '...';
}