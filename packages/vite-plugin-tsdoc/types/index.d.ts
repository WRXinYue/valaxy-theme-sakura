export * from './global'

export interface ResolvedType { members?: MemberDocumentation[], types: string[] }

export interface MemberDocumentation {
  name: string
  types: string[]
  children?: MemberDocumentation[]
  optional: boolean
  jsDocTags?: { tagName: string, comment?: string }[]
  jsDocComments?: string[]
}
