import "./AnnotatedText.css";
import React from "react";
import classNames from "classnames";

export default function AnnotatedText(props: any) {
    const {annotations, mostRecent, textNode, ...otherProps } = props;
    const annotationCount = Object.keys(textNode).filter((s) => {return s.includes('annotation_')});
    return (
        <span
            {...otherProps}
            className={classNames({
                comment: true,
            })}
            style={{backgroundColor: annotationCount.length > 1 ? "darkblue" : "lightblue", color: annotationCount.length > 1 ? "#fff" : "000"}}
        >
      {props.children}
    </span>
    );
}
