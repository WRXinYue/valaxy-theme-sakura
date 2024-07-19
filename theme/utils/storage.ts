import { isNumeric } from './number'

function getStorageItem(storage: Storage, key: string): any {
  try {
    const value = storage.getItem(key)
    if (value === null)
      return null
    if (isNumeric(value))
      return Number(value)
    if (value === 'true')
      return true
    if (value === 'false')
      return false
    return value
  }
  catch (e) {
    console.error('Failed to read from storage:', e)
    return null
  }
}

function setStorageItem(storage: Storage, key: string, value: number | boolean | string): void {
  try {
    storage.setItem(key, value.toString())
  }
  catch (e) {
    console.error('Failed to write to storage:', e)
  }
}

export function getLocalStorageItem(key: string): any {
  return getStorageItem(localStorage, key)
}

export function setLocalStorageItem(key: string, value: number | boolean | string): void {
  setStorageItem(localStorage, key, value)
}

export function getSessionStorageItem(key: string): any {
  return getStorageItem(sessionStorage, key)
}

export function setSessionStorageItem(key: string, value: number | boolean | string): void {
  setStorageItem(sessionStorage, key, value)
}
