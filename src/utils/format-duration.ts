/**
 * Formats a duration in seconds to a string.
 * @param duration The duration in seconds.
 * @returns The formatted duration.
 */

// use number format to ensure zeros follow each time interval
const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})
export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60

  if (hours) {
    return `${hours}:${LEADING_ZERO_FORMATTER.format(
      minutes
    )}:${LEADING_ZERO_FORMATTER.format(seconds)}`
  }
  return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds)}`
}
