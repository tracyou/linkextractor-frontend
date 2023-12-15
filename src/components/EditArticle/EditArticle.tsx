import React, {useState} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import {Button, Card, CardContent, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Blue, DarkBlue, LightBlue} from "../../stylesheets/Colors";
import {Title} from "../../stylesheets/Fonts";
import styles from "./EditArticle.module.css";
import Editor from "../Editor/Editor";
import {Descendant} from "slate";
import {Matter} from "../../types";

const EditArticle = () => {

    const MATTER_COLORS: Record<string, string> = {
        'Afleidingsregel': LightBlue,
        'Rechtssubject': DarkBlue,
        'Rechtsbetrekking': Blue,
    };
    const [matter, setMatter] = React.useState<Matter>({title: "Afleidingsregel", color: MATTER_COLORS['Afleidingsregel']});
    const [description, setDescription] = React.useState("");
    const [comment, setComment] = React.useState("");

    const ExampleDocument: Descendant[] = [
        {
            type: "h1",
            children: [{ text: "Heading 1" }],
        },
        {
            type: "h2",
            children: [{ text: "Heading 2" }],
        },
        {
            type: "paragraph",
            children: [
                { text: "Hello World! This is my paragraph inside a sample document." },
                { text: "Bold text.", bold: true },
                { text: "Italic text.", italic: true },
                { text: "Bold and underlined text.", bold: true, underline: true },
                { text: "variableFoo", code: true },
            ],
        },
    ]

    const [document, setDocument] = useState<Descendant[]>(ExampleDocument);
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                alignItems="center"
                justifyContent="center"
                container
            >
                <h1 style={Title}>Artikel 80</h1>
            </Grid>
            <Grid container spacing={5}>
                <Grid xs={4}>
                    <Card
                        style={{borderColor: LightBlue}}
                        variant="outlined"
                    >
                        <CardContent>
                            <Grid
                                alignItems="center"
                                justifyContent="center"
                                container
                            >
                            <InputLabel id="demo-simple-select-label">Begrip</InputLabel>
                            </Grid>
                            <Select
                                className={styles.inputMargin}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={matter.title}
                                fullWidth
                                onChange={(e) => setMatter({title: e.target.value.toString(), color: MATTER_COLORS[e.target.value.toString()]})}
                            >
                                <MenuItem value={'Afleidingsregel'}>Afleidingsregel</MenuItem>
                                <MenuItem value={'Rechtssubject'}>Rechtssubject</MenuItem>
                                <MenuItem value={'Rechtsbetrekking'}>Rechtsbetrekking</MenuItem>
                            </Select>
                            <TextField
                                style={{marginTop: '1rem'}}
                                id="outlined-basic"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                label="Definitie"
                                fullWidth/>
                            <TextField
                                style={{marginTop: '1rem'}}
                                id="outlined-basic"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                label="Commentaar"
                                fullWidth/>
                            <Stack
                                direction="row"
                                spacing={8}
                                className={styles.inputMargin}
                                alignItems="center"
                                justifyContent="center">
                                <Button variant="contained" color="error">
                                    Annuleren
                                </Button>
                                <Button variant="contained" color="success">
                                    Toevoegen
                                </Button>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid xs={8}>
                    <Editor document={document} onChange={setDocument} matter={matter} description={description} comment={comment}/>
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditArticle;
