import "./AnnotatedText.css";
import React from "react";
import classNames from "classnames";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {getAnnotationIdFromMark, getAnnotationsOnTextNode} from "../../../utils/EditorAnnotationUtils";
import {activeAnnotationIdsState, activeTextNode, annotationState} from "../../../recoil/AnnotationState";
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

    const firstAnnotation = useRecoilValue(annotationState(getAnnotationIdFromMark(annotationCount[0])));

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
            style={{backgroundColor: firstAnnotation ? firstAnnotation.matter.color : "lightblue"}}
            onClick={onClick}
        >
      {props.children}<sup>{annotationCount.length}</sup>
    </span>
    );
}
