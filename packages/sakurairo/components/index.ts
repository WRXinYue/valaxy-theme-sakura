/// <reference types="vite/client" />

import type { Component } from 'vue'

export const sakurairoModules = import.meta.glob<Record<string, Promise<Component>>>('./*.vue')
