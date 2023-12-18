import React from 'react';
import './HomePage.css';
import '../../views/ImportXML.css'
import {Title} from "../../stylesheets/Fonts";
import Grid from '@mui/material/Grid';
import {Box, Button} from "@mui/material";

const handleClick = () => {
    window.location.href = '/import-xml';
};

const HomePage = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <Grid
                alignItems="center"
                justifyContent="center"
                container
                style={{marginBottom: '2rem'}}
            >
                <h1 style={Title}>Wat is de annotatietool</h1>
            </Grid>
            <Grid container spacing={5}>
                <Grid xs={8}
                      alignItems="center"
                      justifyContent="center"
                      container>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type
                    specimen book. It has survived not only five centuries, but also the leap into
                    electronic typesetting, remaining essentially unchanged. It was popularised in
                    the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                    and more recently with desktop publishing software like Aldus PageMaker
                    including versions of Lorem Ipsum.
                </Grid>
                <Grid xs={4}
                      alignItems="center"
                      justifyContent="center"
                      container>
                    <Button variant="contained" color="primary"
                            onClick={() => {
                                handleClick()
                            }}>
                        Breng mij naar de tool
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
};

export default HomePage;
