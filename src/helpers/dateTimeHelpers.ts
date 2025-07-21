/**
 * Global helper functions for formatting datetime strings from Laravel backend
 * into localized datetime formats based on configured locale
 */

/**
 * Gets the configured locale from environment variables
 * Falls back to 'de-DE' if not configured
 */
function getAppLocale(): string {
  return import.meta.env.VITE_APP_LOCALE || "de";
}

/**
 * Formats a datetime string from Laravel backend to localized format
 * @param dateString - ISO date string from Laravel backend
 * @param dateOnly - If true, returns only date, otherwise includes time
 * @returns Formatted date string based on configured locale
 */
export function formatDateTime(
  dateString: string | null | undefined,
  dateOnly: boolean = false,
): string {
  if (!dateString) {
    return "-";
  }

  try {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return "-";
    }

    const locale = getAppLocale();

    if (dateOnly) {
      // Format date only (e.g., "09.05.2025" for de-DE, "5/9/2025" for en-US)
      return date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else {
      // Format date and time (e.g., "09.05.2025 13:37" for de-DE)
      const dateFormatted = date.toLocaleDateString(locale, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      const timeFormatted = date.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false, // Force 24-hour format
      });

      return `${dateFormatted} ${timeFormatted}`;
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
}

/**
 * Formats a date string to only show the date part
 * @param dateString - ISO date string from Laravel backend
 * @returns Formatted date string based on configured locale (date only)
 */
export function formatDate(dateString: string | null | undefined): string {
  return formatDateTime(dateString, true);
}

/**
 * Gets the current configured locale
 * @returns The app locale (e.g., 'de-DE', 'en-US')
 */
export function getCurrentLocale(): string {
  return getAppLocale();
}
