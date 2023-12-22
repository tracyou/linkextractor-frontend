import "./AnnotatedText.css";
import React from "react";
import classNames from "classnames";
import {useSetRecoilState} from "recoil";
import {getAnnotationsOnTextNode} from "../../../utils/EditorAnnotationUtils";
import {activeAnnotationIdsState, activeTextNode} from "../../../recoil/AnnotationState";
import {Node} from 'slate';

export default function AnnotatedText(props: {
    textNode: Node,
    children: any
}) {
    const setActiveAnnotationIds = useSetRecoilState<Set<string>>(activeAnnotationIdsState);
    const setActiveTextNode = useSetRecoilState<Node | null>(activeTextNode);

    const annotationCount = Object.keys(props.textNode).filter((s) => {
        return s.includes('annotation_')
    });
    const onClick = () => {
        setActiveTextNode(
            props.textNode
        )
        setActiveAnnotationIds(
            getAnnotationsOnTextNode(props.textNode)
        );
    };

    return (
        <span
            className={classNames({
                annotation: true,
            })}
            style={{backgroundColor: annotationCount.length > 1 ? "darkblue" : "lightblue", color: annotationCount.length > 1 ? "#fff" : "#000"}}
            onClick={onClick}
        >
      {props.children}
    </span>
    );
}
