const delay = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export {
  delay
}
