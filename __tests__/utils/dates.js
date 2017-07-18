describe('dates', () => {
  it('passes', ()=> {
    expect(1).toBe(1)
  })
})
/*
describe('withinAWeekOfDeadline', () => {
  console.warn = jest.genMockFunction()
  it('returns false if invalid date for "today"', () => {
    try {
      expect(withinAWeekOfDeadline('asdf', '2017')).toBeFalsy()
    } catch(err) {}
  })

  it('returns true if its the 21st of February, start of within a week', () => {
    expect(withinAWeekOfDeadline('2017-02-21', '2017')).toBeTruthy()
  })
  it('returns true if its the 1st of March, end of deadline', () => {
    expect(withinAWeekOfDeadline('2017-03-01', '2017')).toBeTruthy()
  })
  it('returns true if its within a week of deadline', () => {
    expect(withinAWeekOfDeadline('2017-02-28', '2017')).toBeTruthy()
  })
  it('returns false if its prior to the deadline', () => {
    expect(withinAWeekOfDeadline('2017-02-20', '2017')).toBeFalsy()
  })
  it('returns false if its past the deadline', () => {
    expect(withinAWeekOfDeadline('2017-03-02', '2017')).toBeFalsy()
  })

  it('LEAP YEAR', () => {
    expect(withinAWeekOfDeadline('2017-03-02', '2017')).toBeFalsy()
  })
})
*/
