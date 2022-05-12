export const capitalizeFirst = (str) => {
  const arr = str.split(' ')
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ')
}
export const diffTwoDateInMonths = (date1, date2) => {
  const dateOne = new Date(date1)
  const dateTwo = new Date(date2)
  const diffTime = Math.abs(dateTwo - dateOne)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
}
