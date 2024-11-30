/// <reference types="vite/client" />

import type { Component } from 'vue'

export const mashiroModules = import.meta.glob<Record<string, Promise<Component>>>('./*.vue')
