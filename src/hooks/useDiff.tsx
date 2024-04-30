export default function useDiff(dateStr1: string, dateStr2: string): number {
  if (dateStr1 !== null && dateStr2 !== null) {
    const date1: Date = new Date(dateStr1.replace(/\./g, "/"));
    const date2: Date = new Date(dateStr2.replace(/\./g, "/"));

    const diffMs = Math.abs(date1.getTime() - date2.getTime());

    const diffMinutes = Math.round(diffMs / 1000 / 60);
    return diffMinutes;
  }
  return 0;
}
