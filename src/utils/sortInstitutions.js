const sortInstitutions = (institutionA, institutionB) => {
  const idA = institutionA.id.toUpperCase()
  const idB = institutionB.id.toUpperCase()

  if (idA < idB) {
    return -1
  }
  if (idA > idB) {
    return 1
  }

  return 0
}

export default sortInstitutions
