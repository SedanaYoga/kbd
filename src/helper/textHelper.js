const dogSpecs = {
  color: {
    black: 'H',
    white: 'P',
    brown: 'C',
    bridle: 'A',
  },
  breedQuality: {
    normal: 'N',
    premium: 'P',
    champion: 'C',
  },
  sex: {
    male: 'M',
    female: 'F',
  },
}

export const capitalizeFirst = (str) => {
  const arr = str?.split(' ')
  for (var i = 0; i < arr?.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
  }
  return arr?.join(' ')
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

export const displayIdGenerator = (puppyObject) => {
  const { breedQuality, color, dob, sex } = puppyObject
  const dobToText = new Date(dob)
    .toISOString()
    .split('T')[0]
    .split('-')
    .reverse()
    .join('')
  const sexText = dogSpecs['sex'][sex]
  const colorText = dogSpecs['color'][color]
  const breedQualityText = dogSpecs['breedQuality'][breedQuality]
  return `${breedQualityText}${colorText}${dobToText}${sexText}`
}
