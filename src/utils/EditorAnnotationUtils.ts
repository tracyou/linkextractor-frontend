import {v4 as uuidv4} from 'uuid';
import {Editor, NodeEntry, Path} from "slate";
import {Annotation, ArticleNode} from "../types";
import {Node} from 'slate';

const ANNOTATION_PREFIX = "annotation_";

export function getMarkForAnnotationID(annotationID: string) {
    return `${ANNOTATION_PREFIX}${annotationID}`;
}

export function getAnnotationsOnTextNode(textNode: Node): Set<string> {
    if (textNode == null) {
        debugger;
    }
    return new Set(
        Object.keys(textNode)
            .filter(isAnnotationIDMark)
            .map(getAnnotationIdFromMark)
    );
}

export function getAnnotationIdFromMark(mark: any) {
    if (!isAnnotationIDMark(mark)) {
        throw new Error("Expected mark to be of an annotation");
    }
    return mark.replace(ANNOTATION_PREFIX, "");
}

function isAnnotationIDMark(possibleAnnotation: any) {
    return possibleAnnotation.indexOf(ANNOTATION_PREFIX) === 0;
}

export function insertAnnotation(editor: Editor, addAnnotationToState: any, annotation: Annotation) {
    annotation.id = uuidv4();
    addAnnotationToState(annotation.id, annotation);
    Editor.addMark(editor, getMarkForAnnotationID(annotation.id), true);
    return annotation.id;
}

export const customFindPath = (editor: Editor, targetNode: Node) => {
    const findNode = (node: Node, path: Path): Path | null => {

        if (JSON.stringify(node) === JSON.stringify(targetNode)) {
            return path;
        }

        if (Editor.isEditor(node)) {
            for (const [child, childPath] of Node.children(editor, path)) {
                const result = findNode(child, childPath);
                if (result) {
                    return result;
                }
            }
        } else if (Array.isArray("children" in node && node.children)) {
            for (let i = 0; "children" in node && i < node.children.length; i++) {
                const childPath = path.concat(i);
                let result = null;
                if ("children" in node) {
                    result = findNode(node.children[i], childPath);
                }
                if (result) {
                    return result;
                }
            }
        }

        return null;
    };

    return findNode(editor, []);
};

// Recursive function to find the ancestor with a specific type
export const findAncestorWithType = (
    editor: Editor,
    path: Path | null,
    type: string
): ArticleNode | null => {
    if (!path) return null;

    const [node, nodePath] = Editor.node(editor, path) as NodeEntry<ArticleNode>;

    if (node && node.type && node.type === type) {
        return node;
    }

    return findAncestorWithType(editor, Path.parent(nodePath), type);
};

