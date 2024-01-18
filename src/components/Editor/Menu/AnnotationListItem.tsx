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
import {useQuery} from "@apollo/client";
import {
    MattersDocument,
    MattersQuery,
    SimpleAnnotationFragment,
    SimpleMatterFragment
} from "../../../graphql/api-schema";
import {DarkBlue, LightBlue} from "../../../stylesheets/Colors";
import useUpdateAnnotation from "../../../hooks/useUpdateAnnotationInState";

interface AnnotationListItemProps {
    id: string,
    editor: Editor,
    matterColors: any
}
const AnnotationListItem: React.FC<AnnotationListItemProps> = ({id, editor, matterColors}) => {

    //Remove mark (wrapper containing id and providing style to annotation)
    const removeMarkAtPath = (editor: Editor, path: Path, markKey: string) => {
        Transforms.unsetNodes(editor, markKey, {at: path});
        ReactEditor.focus(editor);
    };

    const textNode = useRecoilValue(activeTextNode);

    //Find path of active (clicked) textnode and select it in the editor
    const selectAnnotatedWord = () => {
        const path = customFindPath(editor, textNode!);
        if (path) {
            Transforms.select(editor, path);
            removeMarkAtPath(editor, path, getMarkForAnnotationID(id));
        }
    }

    const removeAnnotation = useRemoveAnnotationFromState();
    const setActiveAnnotationIds = useSetRecoilState(activeAnnotationIdsState);

    //Remove annotation from selected word and from global state
    const onRemoveAnnotation = () => {
        selectAnnotatedWord();
        Editor.removeMark(editor, getMarkForAnnotationID(id));

        setActiveAnnotationIds((prev) =>
            new Set([...prev].filter(id => id !== id)));

        removeAnnotation(id, editor).catch(error => {
            console.error("Error removing annotation from state", error);
        });
    }

    const [editable, setEditableAnnotation] =
        useRecoilState<SimpleAnnotationFragment | undefined>(editableAnnotation);

    const onBack = () => {
        setEditableAnnotation(undefined);
    }

    const annotation = useRecoilValue(annotationState(id))!;
    const [definition, setDefinition]
        = React.useState(annotation?.definition);
    const [comment, setComment]
        = React.useState(annotation?.comment);
    const [matter, setMatter]
        = React.useState<SimpleMatterFragment>({
        id: annotation.matter.id,
        name: annotation.matter.name,
        color: annotation.matter.color
    });

    const onEditAnnotation = () => {
        setEditableAnnotation(annotation);
    }

    const updateAnnotation = useUpdateAnnotation();

    //Update annotation in state with new user input
    const onUpdateAnnotation = () => {
        selectAnnotatedWord();
        updateAnnotation(
            id, {
                text: annotation.text,
                id: id,
                matter: matter,
                definition: definition,
                comment: comment
            },
            editor)
        onBack();
    }

    const {data} = useQuery<MattersQuery>(MattersDocument)

    return (
        <Card variant={"outlined"} style={{marginBottom: "5%",}}>
            <CardContent style={{display: annotation?.id == editable?.id ? 'none' : 'flex', flexDirection: 'column'}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h4 style={{marginBottom: 0}}>{annotation?.matter.name}</h4>
                    <span>{annotation?.definition}</span>
                    <span>{annotation?.comment}</span>
                </div>
                <div style={{display: "flex", flexDirection: "row", gap: "2%", marginTop: "5%", }}>
                    <Button onClick={onEditAnnotation} variant="outlined" size={"small"} style={{color: "#000"}}>Bewerk</Button>
                    <Button onClick={onRemoveAnnotation} variant="text" size={"small"}>Verwijder</Button>
                </div>
            </CardContent>
            <CardContent style={{display: annotation?.id == editable?.id ? 'flex' : 'none', flexDirection: 'column'}}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <Select
                        className={styles.inputMargin}
                        label={"Begrip"}
                        id="demo-simple-select"
                        value={matter.name}
                        onChange={(e) => setMatter({
                            id: matterColors[e.target.value.toString()].id,
                            name: matterColors[e.target.value.toString()].name,
                            color: matterColors[e.target.value.toString()].color
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
                    <Button onClick={onUpdateAnnotation} variant="contained"
                            style={{backgroundColor: DarkBlue}}>Opslaan</Button>
                    <Button onClick={onBack} variant="contained"
                            style={{backgroundColor: LightBlue, color: "#000"}}>Terug</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default AnnotationListItem;
