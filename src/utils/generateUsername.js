export const generateUsername = (name) => {
  const cleanName = name.toLowerCase().replace(/\s/g, '')
  const randomNumber = Math.floor(Math.random() * 1000)
  return `${cleanName}${randomNumber}`
}