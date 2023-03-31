export const getMeasureValue = (string: string) => {
  const regExp = /((?:\d*\.)?\d+)(\D+)/
  const [, numberValue, measureValue] = string.match(regExp)

  return {
    numberValue: Number(numberValue) || 0,
    measureValue: measureValue || ""
  }
}
