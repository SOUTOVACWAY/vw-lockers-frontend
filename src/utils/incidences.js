export function getIncidenceCode(number) {
  const paddedNumber = number.toString().padStart(6, '0')

  return `INC-${paddedNumber}`
}
