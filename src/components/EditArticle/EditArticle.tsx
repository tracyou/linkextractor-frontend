import React from "react";
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import {Card, CardContent, InputLabel, MenuItem, Select} from "@mui/material";
import {Blue, DarkBlue, LightBlue} from "../../stylesheets/Colors";
import {init} from "@graphql-codegen/cli";
import {TextAnnotate} from "react-text-annotate-blend";

const EditArticle = () => {
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
    const [value, setValue] = React.useState(init);
    const [tag, setTag] = React.useState("Afleidingsregel");

    const handleChange = (value) => {
        setValue(value);
    };
    const TAG_COLORS: Record<string, string> = {
        'Afleidingsregel': LightBlue,
        'Rechtssubject': DarkBlue,
        'Rechtsbetrekking': Blue,
    };

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={5}>
                        <Grid xs>
                            <Card>
                                <CardContent>
                                    <InputLabel id="demo-simple-select-label">Wetgeving</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={tag}
                                        label="Wetgeving"
                                        fullWidth
                                        onChange={(e) => setTag(e.target.value)}
                                    >
                                        <MenuItem value={'Afleidingsregel'}>Afleidingsregel</MenuItem>
                                        <MenuItem value={'Rechtssubject'}>Rechtssubject</MenuItem>
                                        <MenuItem value={'Rechtbetrekking'}>Rechtsbetrekking</MenuItem>
                                    </Select>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid xs={5}>
                            <TextAnnotate
                                style={{
                                    fontSize: "1.2rem",
                                }}
                                content={text}
                                onChange={handleChange}
                                value={value}
                                getSpan={(span) => ({
                                    ...span,
                                    tag: tag,
                                    color: TAG_COLORS[tag],
                                })}
                            />
                            {/*Testing the value*/}

                        </Grid>
                        <Grid xs></Grid>
            </Grid>
        </Box>
    );
};

export default EditArticle;
