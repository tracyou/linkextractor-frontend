import React from "react";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Box from '@mui/material/Box';
import {Badge, Card, CardContent, InputLabel, MenuItem, Select, Typography} from "@mui/material";

const EditArticle = () => {
    const [law, setLaw] = React.useState<string>("");
    const [selectedText, setSelectedText] = React.useState<string>("");
    const [referenceElement, setReferenceElement] = React.useState<
        HTMLElement | NullableVirtualElement | undefined | null
    >(null);

    type NullableVirtualElement = {
        getBoundingClientRect: () => DOMRect | null;
    };
    const selectionChange = React.useCallback(() => {
        const selection = window.getSelection();
        if (selection) {
            const selectedText = selection.toString();
            if (selection.isCollapsed || !selectedText.length) {
                setSelectedText('');
            }
            setSelectedText(selectedText);
        }
        const virtualReference: NullableVirtualElement = {
            getBoundingClientRect: () => {
                return window
                    .getSelection()
                    ?.getRangeAt(0)
                    .getBoundingClientRect() as DOMRect | null;
            }
        };
        setReferenceElement(virtualReference);
    }, [setSelectedText]);
    document.onselectionchange = () => {
        selectionChange();
    }
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={5}>
                <Grid xs>
                    {selectedText &&
                        //TODO Make seperate component
                      <Card>
                        <CardContent>
                          <Typography sx={{fontSize: 18}}>
                            Te annoteren woord: {selectedText}
                          </Typography>
                          <InputLabel id="demo-simple-select-label">Wetgeving</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={law}
                            label="Wetgeving"
                            fullWidth
                            onChange={e => setLaw(e.target.value)}
                          >
                            <MenuItem value={1}>
                              <Badge
                                color={}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}>
                              </Badge> Afleidingsregel</MenuItem>
                            <MenuItem value={2}>Rechtssubject</MenuItem>
                            <MenuItem value={3}>Rechtsbetrekking</MenuItem>
                          </Select>
                        </CardContent>
                      </Card>}
                </Grid>
                <Grid xs={5}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the
                    industry&aposs standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and
                    scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap
                    into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                    the
                    release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing
                </Grid>
                <Grid xs>
                </Grid>
            </Grid>
        </Box>
    )
}
export default EditArticle;
