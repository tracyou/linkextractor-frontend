import {
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from "recoil";
import {
    activeAnnotationIdsState,
    activeTextNode,
    annotationState,
    editableAnnotation
} from "../../../recoil/AnnotationState";
import React from "react";
import styles from "../../EditArticle/EditArticle.module.css";
import {Button, Card, CardContent, FormHelperText, MenuItem, Select, TextField} from "@mui/material";
import useRemoveAnnotationFromState from "../../../hooks/useRemoveAnnotationFromState";
import {Editor, Transforms, Path} from "slate";
import {getMarkForAnnotationID, customFindPath} from "../../../utils/EditorAnnotationUtils";
import {ReactEditor} from "slate-react";
import {Annotation, Matter} from "../../../types";
import {useMutation, useQuery} from "@apollo/client";
import {
    DeleteLawDocument,
    DeleteLawMutation,
    MattersDocument,
    MattersQuery,

} from "../../../graphql/api-schema";
import {DarkBlue, LightBlue} from "../../../stylesheets/Colors";
import {UUID} from "node:crypto";

export default function AnnotationListItem(props: {
    id: string,
    editor: Editor,
    matterColors: any
}) {
    const [annotation, setAnnotation] = useRecoilState(annotationState(props.id));
    const removeAnnotation = useRemoveAnnotationFromState();
    const setActiveAnnotationIds = useSetRecoilState(activeAnnotationIdsState);
    const [editable, setEditableAnnotation] = useRecoilState<Annotation | undefined>(editableAnnotation);
    const textNode = useRecoilValue(activeTextNode);
    const {data} = useQuery<MattersQuery>(MattersDocument)
    const [matter, setMatter] = React.useState<Matter>({title: annotation!.matter.title, color: annotation!.matter.color});
    const [definition, setDefinition] = React.useState(annotation!.definition);
    const [comment, setComment] = React.useState(annotation!.comment);

    const removeMarkAtPath = (editor: Editor, path: Path, markKey: string) => {
        Transforms.unsetNodes(editor, markKey, {at: path});
        ReactEditor.focus(editor);
    };

    const onRemoveAnnotation = () => {
        const path = customFindPath(props.editor, textNode!);
        if (path) {
            Transforms.select(props.editor, path);
            removeMarkAtPath(props.editor, path, getMarkForAnnotationID(props.id));
        }

        console.log(typeof props.id)

        deleteLaw({
            variables: {
                input: {
                    id: props.id,
                },
            },
        }).then((result) => {
            if (result) {
                Editor.removeMark(props.editor, getMarkForAnnotationID(props.id));
                setActiveAnnotationIds((prev) => new Set([...prev].filter(id => id !== props.id)));
                removeAnnotation(props.id);
            }
        });


    }

    const onBack = () => {
        setEditableAnnotation(undefined);
    }

    const onEditAnnotation = () => {
        setEditableAnnotation(annotation);
    }

    const onUpdateAnnotation = () => {
        setAnnotation((prev) => {
            if (!prev) {
                throw new Error("Unexpected undefined value for 'prev'");
            }
            const anno: Annotation = {...prev};
            anno.matter = matter;
            anno.definition = definition;
            anno.comment = comment;
            return anno;
        });
        onBack();
    }

    const [deleteLaw, {loading, error}] = useMutation<DeleteLawMutation>(
    DeleteLawDocument);

    return (
        <Card variant={"outlined"} style={{marginBottom: "5%",}}>
            <CardContent style={{display: annotation?.id == editable?.id ? 'none' : 'flex', flexDirection: 'column'}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h4 style={{marginBottom: 0}}>{annotation?.matter.title}</h4>
                    <span>{annotation?.definition}</span>
                    <span>{annotation?.comment}</span>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: "2%", marginTop: "5%"}}>
                    <Button onClick={onEditAnnotation} variant="contained" style={{backgroundColor: DarkBlue}}>Bewerk</Button>
                    <Button onClick={onRemoveAnnotation} variant="text" style={{backgroundColor: LightBlue, color: "#000"}}>Verwijder</Button>
                </div>
            </CardContent>
            <CardContent style={{display: annotation?.id == editable?.id ? 'flex' : 'none', flexDirection: 'column'}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Select
                        className={styles.inputMargin}
                        label={"Begrip"}
                        id="demo-simple-select"
                        value={matter.title}
                        onChange={(e) => setMatter({
                            title: e.target.value.toString(),
                            color: props.matterColors[e.target.value.toString()]
                        })}
                        fullWidth
                    >{
                        data?.matters.map(matter =>
                            <MenuItem key={matter.id} value={matter.name}>
                                {matter.name}
                            </MenuItem>)
                    }
                    </Select>
                    <FormHelperText>Koppel een begrip aan de geselecteerde tekst</FormHelperText>
                    <TextField
                        style={{marginTop: '1rem'}}
                        id="outlined-basic"
                        value={definition}
                        onChange={(e) => setDefinition(e.target.value)}
                        label="Definitie"
                        fullWidth/>
                    <FormHelperText>Definieer de context</FormHelperText>
                    <TextField
                        style={{marginTop: '1rem'}}
                        id="outlined-basic"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        label="Commentaar"
                        fullWidth/>
                    <FormHelperText>Optioneel commentaar betreft annotatie</FormHelperText>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: "2%", marginTop: "5%"}}>
                    <Button onClick={onUpdateAnnotation} variant="contained" style={{backgroundColor: DarkBlue}}>Opslaan</Button>
                    <Button onClick={onBack} variant="contained" style={{backgroundColor: LightBlue, color: "#000"}}>Terug</Button>
                </div>
            </CardContent>
        </Card>
    )
}
