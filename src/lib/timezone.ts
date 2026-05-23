/**
 * Utility functions for Indian Standard Time (IST - UTC+5:30)
 */

export function getISTDateString(date: Date = new Date()): string {
  // Returns 'YYYY-MM-DD' in Asia/Kolkata time zone
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
}

export function getSecondsUntilNextISTMidnight(): number {
  const now = new Date();
  
  // Get current date string in IST, e.g. "2026-05-24"
  const todayStr = getISTDateString(now);
  
  // Calculate today's midnight in IST
  const midnightISTToday = new Date(`${todayStr}T00:00:00+05:30`);
  
  // Calculate tomorrow's midnight in IST
  const midnightISTTomorrow = new Date(midnightISTToday.getTime() + 24 * 3600 * 1000);
  
  const diffMs = midnightISTTomorrow.getTime() - now.getTime();
  return Math.max(0, Math.floor(diffMs / 1000));
}

export function getISTWeekStartDateString(date: Date = new Date()): string {
  // Format the date using Asia/Kolkata timezone components
  const istDateString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(date); // e.g. "5/24/2026"
  
  const [mStr, dStr, yStr] = istDateString.split('/');
  const istDate = new Date(Number(yStr), Number(mStr) - 1, Number(dStr));
  
  // getDay() gives 0 for Sunday, 1 for Monday, etc.
  const day = istDate.getDay();
  // We want to find the Monday of this week.
  // If day is Sunday (0), we go back 6 days.
  // If day is Monday (1), we go back 0 days.
  // If day is Tuesday (2), we go back 1 day, and so on.
  const daysToSubtract = day === 0 ? 6 : day - 1;
  
  const monday = new Date(istDate);
  monday.setDate(istDate.getDate() - daysToSubtract);
  
  const year = monday.getFullYear();
  const month = String(monday.getMonth() + 1).padStart(2, '0');
  const dayOfMonth = String(monday.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${dayOfMonth}`;
}
