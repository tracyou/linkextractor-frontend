import React, {useState} from 'react';
import {Blue, DarkBlue, LightBlue} from "../../stylesheets/Colors";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Button,
    Card,
    CardContent,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, TextField
} from "@mui/material";
import AnnotatedText from './AnnotatedText';

interface Annotation {
    start: number;
    end: number;
    text: string;
    tag: string;
    color: string;
    comment: string;
}

const matters: Record<string, string> = {
    'Afleidingsregel': LightBlue,
    'Rechtssubject': DarkBlue,
    'Rechtsbetrekking': Blue,
};

const TextAnnotator = () => {
        const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum\n" +
            "                                has\n" +
            "                                been\n" +
            "                                the\n" +
            "                                industry&aposs standard dummy text ever since the 1500s, when an unknown printer took a\n" +
            "                                galley of\n" +
            "                                type and\n" +
            "                                scrambled it to make a type specimen book. It has survived not only five centuries, but\n" +
            "                                also\n" +
            "                                the\n" +
            "                                leap\n" +
            "                                into electronic typesetting, remaining essentially unchanged. It was popularised in the\n" +
            "                                1960s with\n" +
            "                                the\n" +
            "                                release of Letraset sheets containing Lorem Ipsum passages, and more recently with\n" +
            "                                desktop\n" +
            "                                publishing"
        const [annotations, setAnnotations] = useState<Annotation[]>([]);
        const [tag, setTag] = useState<string>('');
        const [isSelected, setIsSelected] = useState<boolean>(false);
        const [selectedAnnotation, setSelectedAnnotation] = useState<Annotation>();
        const [comment, setComment] = useState<string>('');

        const handleAnnotationClick = (annotation: Annotation) => {
            setSelectedAnnotation(annotation);
            setIsSelected(true);
        }

        const handleSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const selection = window.getSelection();

            const regex = new RegExp("[a-zA-Z]{2,}");
            if (selection && regex.test(selection.toString())) {
                console.log("text selected:" + selection.toString());
                const selectedText = selection.toString();
                const {anchorOffset, focusOffset} = selection;
                const start = Math.min(anchorOffset, focusOffset);
                const end = Math.max(anchorOffset, focusOffset);
                const newAnnotation: Annotation = {
                    start,
                    end,
                    text: selectedText,
                    tag: '',
                    color: '',
                    comment: '',
                };
                setIsSelected(true);
                setSelectedAnnotation(newAnnotation);
            } else console.log("selection must be at least two consecutive characters long")
        };

        const handleTagSelection = (e: SelectChangeEvent) => {
            setIsSelected(true);
            if (selectedAnnotation) {
                setTag(e.target.value);
                selectedAnnotation.color = matters[e.target.value];
                selectedAnnotation.tag = e.target.value;
                console.log(selectedAnnotation);
            }
        }

        const handleCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            if (selectedAnnotation) {
                setComment(e.target.value);
                selectedAnnotation.comment = e.target.value;
                console.log(selectedAnnotation);
            }
        }

        const handleAddAnnotation = () => {
            if (selectedAnnotation) {
                setAnnotations([...annotations, selectedAnnotation]);
                handleClose();
            }
        }

        const handleClose = () => {
            setIsSelected(false);
            setSelectedAnnotation(undefined);
            setTag('');
            setComment('');
        }

        return (
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={5}>
                    <Grid xs>
                        <Card
                            style={{backgroundColor: LightBlue, visibility: isSelected ? "visible" : "hidden"}}
                            variant="outlined"
                        >
                            <CardContent>
                                <h2>Annotatie</h2>
                                <span style={{fontWeight: "bold"}}>Geselecteerde tekst</span>
                                <p style={{marginTop: 0}}>{selectedAnnotation?.text}</p>
                                <InputLabel id="demo-simple-select-label">Begrip</InputLabel>
                                <Select
                                    style={{backgroundColor: '#ffffff', color: '#000'}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={tag}
                                    fullWidth
                                    onChange={(e) => handleTagSelection(e)}
                                >
                                    <MenuItem value={'Afleidingsregel'}>Afleidingsregel</MenuItem>
                                    <MenuItem value={'Rechtssubject'}>Rechtssubject</MenuItem>
                                    <MenuItem value={'Rechtsbetrekking'}>Rechtsbetrekking</MenuItem>
                                </Select>
                                <InputLabel>Commentaar</InputLabel>
                                <TextField style={{backgroundColor: '#ffffff', color: '#000'}}
                                           value={comment}
                                           fullWidth
                                           onChange={(e) => handleCommentInput(e)}/>
                                <div style={{display: "flex", flexDirection: "row", gap: "2em", marginTop: "2em"}}>
                                    <Button variant={"contained"} color={"success"} size={"large"}
                                            onClick={() => handleAddAnnotation()}>Toevoegen</Button>
                                    <Button variant={"outlined"} color={"error"} size={"large"}
                                            onClick={() => handleClose()}>Sluiten</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={5}>
                        <div>
                            {/* Render the AnnotatedText component with the required props */}
                            <AnnotatedText
                                text={text}
                                annotations={annotations}
                                handleSelection={handleSelection}
                                handleAnnotationClick={handleAnnotationClick}
                            />
                        </div>
                        {/*Testing the value*/}
                        <pre style={{fontSize: 12, lineHeight: 1.2}}>
                      {JSON.stringify(annotations, null, 2)}
                    </pre>
                    </Grid>
                    <Grid xs></Grid>
                </Grid>
            </Box>
        );
    }
;

export default TextAnnotator;
