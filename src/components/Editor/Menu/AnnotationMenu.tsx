import {Button, Card, CardContent, FormHelperText, MenuItem, Select, Stack, TextField} from "@mui/material";
import {DarkBlue, LightBlue} from "../../../stylesheets/Colors";
import Grid from "@mui/material/Unstable_Grid2";
import styles from "../../EditArticle/EditArticle.module.css";
import React, {Dispatch, SetStateAction, useCallback} from "react";
import {Matter} from "../../../types";
import {useSlateStatic} from "slate-react";
import useAddAnnotationToState from "../../../hooks/useAddAnnotationToState";
import {customFindPath, insertAnnotation} from "../../../utils/EditorAnnotationUtils";
import {BaseSelection, Node, Transforms} from "slate";
import {MattersDocument, MattersQuery} from "../../../graphql/api-schema";
import {useQuery} from "@apollo/client";
import {useRecoilState, useRecoilValue} from "recoil";
import {activeAnnotationIdsState, activeTextNode} from "../../../recoil/AnnotationState";
import AnnotationListItem from "./AnnotationListItem";

interface AnnotationProps {
    selection: BaseSelection,
    setSelection: (newSelection: BaseSelection) => any,
    matter: Matter,
    setMatter: Dispatch<SetStateAction<Matter>>
    definition: string,
    setDefinition: Dispatch<SetStateAction<string>>
    comment: string
    setComment: Dispatch<SetStateAction<string>>
    matterColors: any
}

const AnnotationMenu: React.FC<AnnotationProps> = ({
                                                       selection,
                                                       setSelection,
                                                       matter,
                                                       setMatter,
                                                       definition,
                                                       setDefinition,
                                                       comment,
                                                       setComment,
                                                       matterColors
                                                   }) => {
    const editor = useSlateStatic();
    const addAnnotation = useAddAnnotationToState();
    const {data} = useQuery<MattersQuery>(MattersDocument)
    const [activeAnnotationIds, setActiveAnnotationIds] = useRecoilState<Set<string>>(activeAnnotationIdsState);
    const activeNode = useRecoilValue<Node | null>(activeTextNode);
    const onBack = () => {
        setActiveAnnotationIds(new Set<string>([]));
    }

    const onAddAnnotation = () => {
        const path = customFindPath(editor, activeNode!);
        if (path) {
            Transforms.select(editor, path);
        }
        onBack();
    }

    const onInsertAnnotation = useCallback(() => {
        insertAnnotation(editor, addAnnotation, {matter: matter, definition: definition, comment: comment});
        onClearForm();
    }, [editor, addAnnotation, matter, definition, comment]);

    const onClearForm = () => {
        setComment("");
        setDefinition("");
        editor.selection = null;
        setSelection(null);
    }

    return (
        <Card
            style={{borderColor: LightBlue}}
            variant="outlined"
        >
            <CardContent>
                <div style={{
                    display: selection && (selection.focus.offset - selection.anchor.offset >= 2 || selection.anchor.offset - selection.focus.offset >= 2) && activeAnnotationIds.size <= 0 ? "flex" : "none",
                    flexDirection: "column"
                }}>
                    <Grid
                        alignItems="left"
                        justifyContent="left"
                        container
                        flexDirection={"column"}
                    >
                        <h2>Annotatie toevoegen</h2>
                    </Grid>
                    <Select
                        className={styles.inputMargin}
                        label={"Begrip"}
                        id="demo-simple-select"
                        value={matter.title}
                        fullWidth
                        onChange={(e) => setMatter({
                            title: e.target.value.toString(),
                            color: matterColors[e.target.value.toString()]
                        })}
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
                    <Stack
                        direction="row"
                        spacing={8}
                        className={styles.inputMargin}
                        alignItems="center"
                        justifyContent="space-between">
                        <Button variant="contained" style={{backgroundColor: DarkBlue}} onClick={onInsertAnnotation}>
                            Toevoegen
                        </Button>
                        <Button variant="contained" style={{backgroundColor: LightBlue, color: "#000"}}
                                onClick={onClearForm}>
                            Terug
                        </Button>
                    </Stack>
                </div>
                <div
                    style={{display: selection && (selection.focus.offset - selection.anchor.offset >= 2 || selection.anchor.offset - selection.focus.offset >= 2) || activeAnnotationIds.size > 0 ? "none" : "flex"}}>
                    <Grid
                        alignItems="left"
                        justifyContent="left"
                        container
                        flexDirection={"column"}
                    >
                        <h2>Annotatie toevoegen</h2>
                        Selecteer een woord om een annotatie toe te voegen

                    </Grid>
                </div>
                {activeAnnotationIds.size > 0 && activeNode && (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <h2>Annotaties op &apos;{Object.values(activeNode)[0].toString()}&apos;</h2>
                        {Array.from(activeAnnotationIds).map((id) => (
                            <AnnotationListItem
                                key={id}
                                id={id}
                                editor={editor}
                                matterColors={matterColors}
                            />
                        ))}
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                            <Button variant="contained" style={{backgroundColor: DarkBlue, color: "#fff"}}
                                    onClick={onAddAnnotation}>
                                Toevoegen
                            </Button>
                            <Button variant="contained" style={{backgroundColor: LightBlue, color: "#000"}}
                                    onClick={onBack}>
                                Terug
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AnnotationMenu;
