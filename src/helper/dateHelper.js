export const timeStampToDateString = (timestamp) => {
  return timestamp.toDate().toDateString()
}

export const diffTwoDateInMonths = (date1, date2) => {
  const dateOne = new Date(date1)
  const dateTwo = new Date(date2)
  const diffTime = Math.abs(dateTwo - dateOne)
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30))
}
