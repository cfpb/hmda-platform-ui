import * as dates from '../constants/dates.js'

const months = 'January,February,March,April,May,June,July,August,September,October,November,December'
  .split(',')

export function nth(d) {
  if(d>3 && d<21) return 'th'
  switch (d % 10) {
    case 1:  return 'st'
    case 2:  return 'nd'
    case 3:  return 'rd'
    default: return 'th'
    }
}

export function padZero(n) {
  if(n > 9 || n < -9) return '' + n
  return n < 0
    ? '-0' + -n
    : '0' + n
}

export function ordinal(ts) {
  const d = new Date(ts)
  const month = months[d.getMonth()]
  const day = d.getDate()

  return `${month} ${day + nth(day)}, ${d.getFullYear()}`
}

export function ordinalHour(ts) {
  const d = new Date(ts)
  const mil = d.getHours()
  const period = mil > 11 ? 'PM' : 'AM'
  const hour = mil%12 ? mil%12 : 12
  const min = padZero(d.getMinutes())
  const sec = padZero(d.getSeconds())

  return `${ordinal(d)}, ${hour}:${min}:${sec} ${period}`
}

export function withinAWeekOfDeadline(year) {
  const deadline = +new Date(`${year}-${dates.FILING_DEADLINE}T23:59:59-0500`)
  const week = +new Date(`${year}-${dates.ONE_WEEK_TO_FILE}T00:00:00-0500`)
  if(!deadline || !week) throw new Error('Error calculating filing deadline status')
  const today = Date.now()
  return today >= week && today <= deadline
}

export function withinFilingPeriod(year) {
  const deadline = +new Date(`${year}-${dates.FILING_DEADLINE}T23:59:59-0500`)
  const start = +new Date(`${year}-${dates.FILING_START}T00:00:00-0500`)
  if(!deadline || !start) throw new Error('Error calculating filing deadline status')
  const today = Date.now()
  return today >= start && today <= deadline
}
