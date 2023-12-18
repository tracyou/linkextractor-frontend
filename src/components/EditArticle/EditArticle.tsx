import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import {Button, Card, CardContent, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Blue, DarkBlue, LightBlue} from "../../stylesheets/Colors";
import {AnnotateTag, TextAnnotate} from "react-text-annotate-blend";
import {Title} from "../../stylesheets/Fonts";
import styles from "./EditArticle.module.css";
import {useQuery} from "@apollo/client";
import {MattersDocument, MattersQuery} from "../../graphql/api-schema";

const EditArticle = () => {
    const init: AnnotateTag[] = [];
    const {data, loading} = useQuery<MattersQuery>(MattersDocument)

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
    const [value, setValue] = React.useState<AnnotateTag[]>(init);
    const [tag, setTag] = React.useState("Afleidingsregel");

    const handleChange = (value: AnnotateTag[]) => {
        setValue(value);
    };
    const TAG_COLORS = data?.matters.map(matter => (
        <pre key={matter.id}>
            {matter.name}: {matter.color}
        </pre>
    ));
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
                                value={tag}
                                fullWidth
                                onChange={(e) => setTag(e.target.value)}
                            >{
                                data?.matters.map(matter =>
                                    <MenuItem key={matter.id} value={matter.name}> {matter.name}</MenuItem>
                                )
                            }
                            </Select>
                            <TextField
                                style={{marginTop: '1rem'}}
                                id="outlined-basic"
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
                    <TextAnnotate
                        style={{
                            lineHeight: 1.5,
                        }}
                        content={text}
                        value={value!}
                        onChange={handleChange}
                        getSpan={(span) => ({
                            ...span,
                            tag: tag,
                            color: TAG_COLORS ? TAG_COLORS : [tag],
                        })}/>
                    {/*Testing the value*/}
                    {/*              <pre style={{fontSize: 12, lineHeight: 1.2}}>*/}
                    {/*  {JSON.stringify(value, null, 2)}*/}
                    {/*</pre>*/}
                </Grid>
            </Grid>
        </Box>
    );
};

export default EditArticle;
