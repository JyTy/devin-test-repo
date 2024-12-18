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
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  BlockTypeSelect,
  CreateLink,
  InsertTable,
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
        markdownShortcutPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <CreateLink />
              <InsertTable />
            </>
          )
        })
      ]}
      {...props}
      ref={editorRef}
      className="w-full min-h-[200px] prose prose-slate max-w-none"
      contentEditableClassName="px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-blue-500"
    />
  )
}
