/**
 * Determines if a value is numeric
 *
 * It can be converted to a finite number
 */
export function isNumeric(value: string) {
  return !Number.isNaN(Number.parseFloat(value)) && Number.isFinite(value)
}
