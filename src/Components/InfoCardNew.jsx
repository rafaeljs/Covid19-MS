import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    container: {
        padding: '15px 15px 0 15px',
        display: 'flex',
        justifyContent: 'space-between',
        color: '#FFF',
        height: '100%',
        boxSizing: 'border-box'
    },
    titulo: {
        textAlign: 'center',
    },
    espacamento: {
        paddingBottom: 15
    }
}));


const InfoCardNew = ({titulo, background, valor, campo}) => {
    const classes = useStyles();
    
    return (
        <Paper elevation={5} className={classes.container} style={{backgroundColor:background}}>
           <Grid container className={classes.espacamento}>
                <Grid item md={12} sm={12} xs={12} className={classes.titulo}>
                    <Typography variant="h4" >
                        {valor.some(item => item[campo] > 0) ? titulo : `Não há ${titulo}`}
                    </Typography>
                </Grid>
                {valor.map(item => (
                    item[campo] > 0 ?
                    <Grid item md={6} sm={6} xs={12} key={item.city} >
                        <Typography variant="h6">
                            {item.city}: {item[campo]}
                        </Typography>
                    </Grid> : null
                ))}
           </Grid>
        </Paper>
    );
}

export default InfoCardNew;