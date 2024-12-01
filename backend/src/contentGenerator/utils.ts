export function truncateText(text: string, maxLength: number = 7000): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
} 
