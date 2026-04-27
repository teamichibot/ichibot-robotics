'use client'

import dynamic from 'next/dynamic'
import '@uiw/react-markdown-preview/markdown.css'

const MDPreview = dynamic(() => import('@uiw/react-markdown-preview'), { ssr: false })

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div data-color-mode="dark">
      <MDPreview source={content} style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }} />
    </div>
  )
}
