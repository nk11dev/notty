import React, { useContext, useCallback } from 'react';
import { FaLink } from 'react-icons/fa6';

import { EditorContext } from '@/shared/contexts/editor-context';
import EditorButton from '@/shared/ui/editor/editor-button';

const EditorLinkButton = () => {
  const { editor } = useContext(EditorContext);

  const setLink = useCallback(() => {

    if (!editor) return;

    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run()

    } else {
      const previousUrl = editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        editor.chain().focus().extendMarkRange('link').unsetLink()
          .run()

        return
      }

      // update link
      editor.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    }

  }, [editor])

  if (!editor) {
    return null
  }

  return (
    <EditorButton
      tooltip="Link"
      icon={<FaLink size={34} />}
      onClick={setLink}
      isActive={editor.isActive('link')}
    />
  )
}
export default EditorLinkButton;