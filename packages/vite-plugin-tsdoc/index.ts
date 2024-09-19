import { readFileSync } from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import ts from 'typescript'
import type { MemberDocumentation, ResolvedType } from './types'

function findInterfaceDeclaration(node: ts.Node, name: string): ts.InterfaceDeclaration | undefined {
  if (ts.isInterfaceDeclaration(node) && node.name.text === name) {
    return node
  }
  let result: ts.InterfaceDeclaration | undefined
  node.forEachChild((child) => {
    if (!result) {
      result = findInterfaceDeclaration(child, name)
    }
  })
  return result
}

const resolvedTypes = new Map<string, ResolvedType>()
const ignoredTypes = ['string', 'number', 'boolean', 'any', 'unknown']

function resolveType(typeNode: ts.TypeNode, sourceFile: ts.SourceFile): ResolvedType {
  if (ts.isTypeReferenceNode(typeNode)) {
    const typeName = typeNode.typeName.getText()

    if (typeName === 'Partial') {
      // Handle Partial<T>
      const typeArguments = typeNode.typeArguments
      if (typeArguments && typeArguments.length === 1) {
        const resolvedType = resolveType(typeArguments[0], sourceFile)
        // Make all properties optional in Partial<T>
        if (typeof resolvedType === 'object' && resolvedType.members) {
          resolvedType.members = resolvedType.members.map(member => ({
            ...member,
            optional: true,
          }))
        }
        return { types: resolvedType.types, members: resolvedType.members }
      }
    }

    const interfaceDeclaration = findInterfaceDeclaration(sourceFile, typeName)

    if (interfaceDeclaration) {
      return {
        types: [typeName],
        members: buildInterfaceDocumentation(interfaceDeclaration, sourceFile),
      }
    }
  }
  else if (ts.isArrayTypeNode(typeNode) && !ignoredTypes.includes(typeNode.getText().slice(0, -2))) {
    const typeName = typeNode.elementType.getText()

    if (resolvedTypes.has(typeName)) {
      return {
        types: [`${resolvedTypes.get(typeName)!.types}[]`],
        members: resolvedTypes.get(typeName)!.members,
      }
    }

    resolvedTypes.set(typeName, { types: [typeName] })

    const interfaceDeclaration = findInterfaceDeclaration(sourceFile, typeName)
    if (interfaceDeclaration) {
      const members = buildInterfaceDocumentation(interfaceDeclaration, sourceFile)
      const resolvedType: ResolvedType = { types: [typeName], members }
      resolvedTypes.set(typeName, resolvedType)
      return {
        types: [`${typeName}[]`],
        members,
      }
    }
  }
  else if (ts.isTypeLiteralNode(typeNode)) {
    // Handle inline object types
    const inlineType: ResolvedType = { members: [], types: ['object'] }
    typeNode.members.forEach((member) => {
      if (ts.isPropertySignature(member)) {
        const name = member.name.getText()
        const memberType = resolveType(member.type!, sourceFile)

        const memberDoc: MemberDocumentation = {
          name,
          types: memberType.types,
          optional: !!member.questionToken,
        }

        inlineType.members!.push(memberDoc)
      }
    })

    return inlineType
  }
  else if (ts.isUnionTypeNode(typeNode)) {
    // Handle union types
    return {
      types: typeNode.types.map(type => resolveType(type, sourceFile).types).flat(),
    }
  }

  return { types: [typeNode?.getText()] }
}

function buildInterfaceDocumentation(node: ts.InterfaceDeclaration, sourceFile: ts.SourceFile) {
  const documentation: MemberDocumentation[] = []

  node.members.forEach((member) => {
    if (ts.isPropertySignature(member)) {
      const memberType = resolveType(member.type!, sourceFile)

      const memberDoc: MemberDocumentation = {
        name: member.name.getText(),
        types: memberType.types,
        children: memberType.members,
        optional: Boolean(member.questionToken),
        jsDocTags: [] as { tagName: string, comment?: string }[],
        jsDocComments: [] as string[],
      }

      const jsDocTags = ts.getJSDocTags(member)
      jsDocTags.forEach((tag) => {
        memberDoc.jsDocTags?.push({
          tagName: tag.tagName.text,
          comment: tag.comment?.toString(),
        })
      })

      const jsDocComments = ts.getJSDocCommentsAndTags(member)
      jsDocComments.forEach((comment) => {
        if (ts.isJSDoc(comment)) {
          if (typeof comment.comment === 'string') {
            memberDoc.jsDocComments?.push(comment.comment)
          }
        }
      })

      documentation.push(memberDoc)
    }
  })

  return documentation
}

function getThemeConfigDocumentation(sourceFile: ts.SourceFile) {
  const themeConfigNode = findInterfaceDeclaration(sourceFile, 'ThemeConfig')
  if (themeConfigNode) {
    return buildInterfaceDocumentation(themeConfigNode, sourceFile)
  }
  else {
    console.warn('ThemeConfig not found')
  }
}

export default function tsdocPlugin(options: { theme: string }) {
  const virtualModuleId = 'virtual:tsdoc-module'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`
  let documentation: any

  return <Plugin>{
    name: 'vite-plugin-tsdoc',

    buildStart() {
      // eslint-disable-next-line node/prefer-global/process
      const typesPath = path.resolve(process.cwd(), `./node_modules/valaxy-theme-${options.theme}/types/index.d.ts`)
      const source = readFileSync(typesPath, 'utf-8')
      const sourceFile = ts.createSourceFile('example.ts', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

      documentation = JSON.stringify(getThemeConfigDocumentation(sourceFile))
    },

    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export const members = ${documentation}`
      }
    },
  }
}
