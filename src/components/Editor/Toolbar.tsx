import React, {MouseEventHandler, useCallback} from "react";
import { Button } from "react-bootstrap";
import {ReactElement} from "react";
import {Selection} from "slate";
import {useSlateStatic} from "slate-react";
import useAddAnnotationToState from "../../utils/hooks/useAddAnnotationToState";
import {insertAnnotation} from "../../utils/EditorAnnotationUtils";
import {Matter} from "../../types";
interface ToolbarProps {
    selection: Selection,
    previousSelection?: Selection,
    matter: Matter
    description: string
    comment: string
}

const Toolbar: React.FC<ToolbarProps> = ({matter, description, comment }) => {
    const editor = useSlateStatic();
    const addAnnotation = useAddAnnotationToState();

    const onInsertAnnotation = useCallback(() => {
        insertAnnotation(editor, addAnnotation, {matter: matter, description: description, comment: comment});
    }, [editor, addAnnotation, matter, description, comment]);

    return (
        <div className="toolbar">
                <ToolBarButton
                    icon={<i className="bi bi-marker-tip"></i>}
                    isActive={false}
                    onMouseDown={onInsertAnnotation}
                />
        </div>
    );
}
function ToolBarButton(props: {icon: ReactElement, isActive: boolean, onMouseDown: MouseEventHandler}) {
    const { icon, isActive, ...otherProps } = props;
    return (
        <Button
            variant="outline-primary"
            className="toolbar-btn"
            active={isActive}
            {...otherProps}
        >
            Annotate {icon}
        </Button>
    );
}

export default Toolbar;
