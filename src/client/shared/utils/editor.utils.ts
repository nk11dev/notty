import { Editor } from '@tiptap/core';

// Prose mirror parse options
const PM_PARSE_OPTIONS = {
  preserveWhitespace: true
};

export function updateEditor(editor: Editor, newContent: string | null) {
  const { from, to } = editor.state.selection;

  editor
    .chain()
    .setContent(newContent, false, PM_PARSE_OPTIONS)
    .setTextSelection({ from, to })
    .run();
}