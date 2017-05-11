let polling = false

export function get() {
  return polling
}

export function set(isPolling) {
  return polling = isPolling
}
