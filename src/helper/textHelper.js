export const capitalizeFirst = (str) => {
  const arr = str.split(' ')
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ')
}

export const camelToNormalUpperCase = (str) => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (str) {
    return str.toUpperCase()
  })
}

export const setBreedIcon = (breed) => {
  return breed === 'normal' ? '🥇' : breed === 'premium' ? '🥈' : '🥉'
}

export const strToCurrency = (string) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  })
  return formatter.format(string)
}
