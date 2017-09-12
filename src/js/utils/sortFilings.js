const sortFilings = (filingA, filingB) => {
  const idA = filingA.filing.institutionId.toUpperCase()
  const idB = filingB.filing.institutionId.toUpperCase()

  if (idA < idB) {
    return -1
  }
  if (idA > idB) {
    return 1
  }

  return 0
}

export default sortFilings
