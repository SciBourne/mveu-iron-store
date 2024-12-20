function postfixMaker(num: number): string {
  const lastDigit = num.toString().slice(-1)
  const preLastDigit = num.toString().at(-2)

  if (preLastDigit === "1") {
    return "oв"

  } else if (["2", "3", "4"].includes(lastDigit)) {
    return "а"

  } else if (["0", "5", "6", "7", "8", "9"].includes(lastDigit)) {
    return "ов"

  } else {
    return ""
  }
}




export { postfixMaker }
