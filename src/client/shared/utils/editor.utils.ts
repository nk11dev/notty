import { Editor } from '@tiptap/core';
import { EditorState } from 'prosemirror-state';

// Prose mirror parse options
const PM_PARSE_OPTIONS = {
  preserveWhitespace: true
};

export function resetEditorContent(editor: Editor, newContent: string | null) {
  editor.commands.setContent(newContent, false, PM_PARSE_OPTIONS);

  const newEditorState = EditorState.create({
    doc: editor.state.doc,
    plugins: editor.state.plugins,
    schema: editor.state.schema
  });

  editor.view.updateState(newEditorState);
}