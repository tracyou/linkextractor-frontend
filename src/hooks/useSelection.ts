import { BaseEditor, BaseSelection } from 'slate';
import { useCallback, useState } from 'react';
import { ReactEditor } from 'slate-react';
import areEqual from 'deep-equal';

export default function useSelection(
    editor: BaseEditor & ReactEditor
): [BaseSelection | null, (newSelection: BaseSelection | null) => any] {
    const [selection, setSelection] = useState<BaseSelection | null>(editor.selection);

    const setSelectionOptimized = useCallback(
        (newSelection: BaseSelection | null) => {
            if (areEqual(selection, newSelection)) {
                return;
            }
            setSelection(newSelection);
        },
        [setSelection, selection]
    );

    return [selection, setSelectionOptimized];
}
