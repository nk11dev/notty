import { Editor } from '@tiptap/core';
import { EditorState } from 'prosemirror-state';

// Prose mirror parse options
const PM_PARSE_OPTIONS = {
  preserveWhitespace: true
};

export function setEditorState(editor: Editor, newContent: string | null) {

  // Set intial content
  editor.commands.setContent(newContent, false, PM_PARSE_OPTIONS)

  // Create a new editor state for clearing the changes history and preserving the old selection
  const newEditorState = EditorState.create({
    doc: editor.state.doc,
    schema: editor.state.schema,
    plugins: editor.state.plugins,
    selection: editor.state.selection,
  });

  // Set cursor position at the start on content (only for empty content)
  if (newContent === null) {
    editor.commands.focus('start');
  }

  // Update the editor state
  editor.view.updateState(newEditorState);
}