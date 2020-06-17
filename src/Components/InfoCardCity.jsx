import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment'

const useStyles = makeStyles(() => ({
    container: {
        padding: 15,
        display: 'flex',
        justifyContent: 'space-between',
        color: '#FFF',
        backgroundColor: '#0f4631',
    },
    titulo: {
        textAlign: 'center',
        marginTop: 10
    }
}));

const InforCardCity = ({cidade}) => {
    const classes = useStyles();
    return (
    <Paper elevation={2} className={classes.container}>
        <Grid container spacing={5}>
            <Grid item md={12} sm={12} xs={12} className={classes.titulo}>
                <Typography variant="h4" className={classes.valor}>
                    {cidade.city}
                </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h5" className={classes.texto}>
                    Número de Casos: {cidade.last_available_confirmed}
                </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h5" className={classes.texto}>
                    Número de Mortes: {cidade.last_available_deaths}
                </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h5" className={classes.texto}>
                    Data de Atualização: {Moment(cidade.date).format('DD/MM/YYYY')}
                </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h5" className={classes.texto}>
                    Novos casos: {cidade.new_confirmed}
                </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h5" className={classes.texto}>
                    Novas Mortes: {cidade.new_deaths}
                </Typography>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
                <Typography variant="h5" className={classes.texto}>
                    Pop. Estimada 2019: {cidade.estimated_population_2019.toLocaleString()}
                </Typography>
            </Grid>
        </Grid>
    </Paper>
  );
}

export default InforCardCity;