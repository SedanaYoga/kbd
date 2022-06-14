export const getPuppiesByPage = (puppies, currPage, shownPuppies) => {
  const start = (currPage - 1) * shownPuppies
  const end = shownPuppies * currPage
  return puppies.slice(start, end)
}

export const getMaxPages = (puppies, puppiesToDisplay) => {
  return Math.ceil(puppies.length / puppiesToDisplay)
}
