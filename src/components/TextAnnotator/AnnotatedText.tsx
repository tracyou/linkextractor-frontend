import React, {useState, useEffect} from 'react';

interface Annotation {
    start: number;
    end: number;
    text: string;
    tag: string;
    color: string;
    comment: string;
}

interface AnnotatedTextProps {
    text: string;
    annotations: Annotation[];
    handleSelection: (e: React.MouseEvent<HTMLDivElement>) => void;
    handleAnnotationClick: (annotation: Annotation) => void;
}

const AnnotatedText: React.FC<AnnotatedTextProps> = ({
                                                         text,
                                                         annotations,
                                                         handleSelection,
                                                         handleAnnotationClick,
                                                     }) => {
    const [annotatedComponents, setAnnotatedComponents] = useState<JSX.Element[]>([]);

    useEffect(() => {
        if (!text || !annotations.length) {
            setAnnotatedComponents([<span key="text">{text}</span>]);
            return;
        }

        const sortedAnnotations = [...annotations].sort((a, b) => a.start - b.start);
        const components: JSX.Element[] = [];
        let lastIndex = 0;

        sortedAnnotations.forEach((annotation, index) => {
            const start = annotation.start;
            const end = annotation.end;
            const tag = annotation.tag;

            // Add the text between the last index and the current annotation
            components.push(<span key={`text-${index}-${lastIndex}`}>{text.slice(lastIndex, start)}</span>);

            // Add the annotated text with the specified style
            components.push(
                <span
                    key={`annotation-${index}`}
                    style={{backgroundColor: annotation.color, cursor: 'pointer'}}
                    onClick={() => handleAnnotationClick(annotation)}
                >
          {text.slice(start, end)}
        </span>
            );

            // Update the last index to the end of the current annotation
            lastIndex = end;
        });

        // Add the remaining text after the last annotation
        components.push(<span key={`text-end`}>{text.slice(lastIndex)}</span>);

        setAnnotatedComponents(components);
    }, [text, annotations, handleAnnotationClick]);

    return <div onMouseUp={(e) => handleSelection(e)}>{annotatedComponents}</div>;
};
export default AnnotatedText;
