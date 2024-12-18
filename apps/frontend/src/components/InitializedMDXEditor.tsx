'use client'

import React from 'react'
import type { ForwardedRef } from 'react'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps
} from '@mdxeditor/editor'

export default function InitializedMDXEditor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin()
      ]}
      {...props}
      ref={editorRef}
      className="w-full min-h-[200px] prose prose-slate max-w-none"
      contentEditableClassName="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
    />
  )
}
