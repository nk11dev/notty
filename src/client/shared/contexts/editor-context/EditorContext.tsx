import { createContext } from 'react';

import type { NullableEditor } from '@/shared/types';

const EditorContext = createContext<NullableEditor>(null);

export default EditorContext;