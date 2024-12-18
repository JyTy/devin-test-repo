'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { forwardRef } from 'react'
import { type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor'

const Editor = dynamic(() => import('./InitializedMDXEditor'), {
  ssr: false
})

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>(
  (props, ref) => <Editor {...props} editorRef={ref} />
)

ForwardRefEditor.displayName = 'ForwardRefEditor'
