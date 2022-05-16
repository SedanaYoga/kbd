export const capitalizeFirst = (str) => {
  const arr = str.split(' ')
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr.join(' ')
}

export const setBreedIcon = (breed) => {
  return breed === 'normal' ? '🥇' : breed === 'premium' ? '🥈' : '🥉'
}
