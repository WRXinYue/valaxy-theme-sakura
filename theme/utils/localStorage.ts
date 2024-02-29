export function getLocalStorageItem(key: string, defaultValue: number) {
  try {
    const value = localStorage.getItem(key)
    return value !== null ? Number(value) : defaultValue
  }
  catch (e) {
    console.error('Failed to read localStorage:', e)
  }
}

export function setLocalStorageItem(key: string, value: number) {
  try {
    localStorage.setItem(key, value.toString())
  }
  catch (e) {
    console.error('Failed to write to localStorage:', e)
  }
}
