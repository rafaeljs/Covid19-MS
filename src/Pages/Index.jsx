import React, { useState, useEffect} from 'react';
import { find, aggregate } from '../DBClient';
import InforCard from '../Components/InfoCard'
import InforCardCity from '../Components/InfoCardCity'
import InforCardNew from '../Components/InfoCardNew'
import PaperChart from '../Components/PaperChart'
import PaperMap from '../Components/PaperMap'
import PaperLineChart from '../Components/PaperLineChart'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    textoTitulo: {
        [theme.breakpoints.down("sm")]: {
            fontSize: '5em'
        },
        [theme.breakpoints.down("xs")]: {
            fontSize: '3em'
        },
    },
    container: {
        padding: '20px 5%',
    },
    grid: {
        margin: '10px 0',
    },
    paper: {
        width: '100%',
        height: '100%',
        minHeight: 500
    },
    paperTitulo: {
        width:'100%',
        textAlign: 'center',
        backgroundColor: '#0f4631',
        color: '#FFF'
    },
    info: {
        padding: 15,
        textAlign: 'center',
        background:"#ff9a00",
        color: '#FFF'
    }
  }));

function Index() {
    const classes = useStyles();
    const [total,setTotal] = useState([]);
    const [confirmados,setConfirmados] = useState(0);
    const [mortes,setMortes] = useState(0);
    const [cidade,setCidade] = useState(null);
    const [dataCidade, setDataCidade] = useState([])
    const [MaiorMortes, setMaiorMortes] = useState({})
    const [MaiorCasos, setMaiorCasos] = useState({})
    const [estado, setEstado] = useState([]);

    useEffect(() => {
        async function chamada(){
            const result = await aggregate([
                { $sort: { date: 1} },
                {
                  $group:
                    {
                        _id: "$city_ibge_code",
                        last_available_confirmed: { $last: "$last_available_confirmed"},
                        last_available_deaths: { $last: "$last_available_deaths"},
                        city_ibge_code: { $last: "$city_ibge_code"},
                        city: { $last: "$city"},
                        new_confirmed: { $last: "$new_confirmed"},
                        new_deaths: { $last: "$new_deaths"},
                        estimated_population_2019: { $last: "$estimated_population_2019"},
                        date: { $last: "$date" }
                    }
                },
                { $sort: { city: -1} },
              ])
            const ultimo = result.pop();
            const confirmados = ultimo.last_available_confirmed;
            const mortes = ultimo.last_available_deaths;

            let max = 0;
            let cidade = {};
            result.map(item => {
                if(item.last_available_confirmed > max){
                    max = item.last_available_confirmed;
                    cidade = item;
                }
                return '';
            })
            setMaiorCasos(cidade);
            max = 0;
            cidade = {};
            result.map(item => {
                if(item.last_available_deaths > max){
                    max = item.last_available_deaths;
                    cidade = item;
                }
                return '';
            })
            setMaiorMortes(cidade);

            setTotal(result.sort((a,b) => (a.city > b.city) ? 1 : ((b.city > a.city) ? -1 : 0)));
            setConfirmados(confirmados);
            setMortes(mortes);
        }
        chamada();
    }, [])

    useEffect(() => {
        async function chamada(){
            const result = await find({'city_ibge_code': cidade.city_ibge_code},true);
            setDataCidade(result)
        }
        if(cidade)
            chamada();
    }, [cidade])

    useEffect(() => {
        async function chamada(){
            const result = await find({'city_ibge_code': 50},true);
            setEstado(result)
        }
        chamada();
    }, [])

    return (
        <Grid className={classes.container} container alignItems="stretch" alignContent="stretch">
            <Grid container justify="center" className={classes.grid} spacing={3} style={{marginBottom: 0}}>
                <Grid item xs={12} sm={12} md={12} style={{paddingBottom: 0}}>
                    <Paper className={classes.paperTitulo} elevation={5}>
                        <Typography variant='h1' className={classes.textoTitulo}>
                            Covid-19 MS
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} className={classes.grid} alignItems="stretch" alignContent="stretch">
                <Grid item md={12} sm={12} xs={12}>
                    <Paper className={classes.info}>
                        <Typography variant='h6' className={classes.textoTitulo}>
                            *Todos os dados apresentados são obtidos do <a rel="noopener noreferrer" target="_blank" href="https://brasil.io/dataset/covid19/caso_full/">Brasil.io</a>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <InforCard
                        valor={confirmados}
                        background="#17a2b8"
                        titulo="Total de Casos Confirmados"
                        icon="fas fa-virus"
                     />
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <InforCard
                        valor={confirmados - mortes}
                        background="#ff9a00"
                        titulo="Em Tratamento / Curados"
                        icon="fas fa-head-side-mask"
                     />
                </Grid>
                <Grid item xs={12} sm={12} md={4} >
                    <InforCard
                        valor={mortes}
                        background="#ff0d00"
                        titulo="Mortes"
                        icon="far fa-dizzy"
                     />
                </Grid>
                <Grid item xs={12} sm={12} md={6} >
                    <InforCard
                        valor={`${MaiorCasos.city ?? ''} - ${MaiorCasos.last_available_confirmed ? MaiorCasos.last_available_confirmed + ' Confirmados' : ''}`}
                        background="#17a2b8"
                        titulo="Maior Número de Casos Confirmados"
                        icon="fas fa-virus"
                     />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <InforCard
                        valor={`${MaiorMortes.city ?? ''} - ${MaiorMortes.last_available_deaths ? MaiorMortes.last_available_deaths + ' Mortos' : ''}`}
                        background="#ff0d00"
                        titulo="Maior Número de Mortes"
                        icon="far fa-dizzy"
                    />
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    {total && <InforCardNew valor={total} titulo="Novos Casos" campo="new_confirmed" background="#17a2b8" />}
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                    {total && <InforCardNew valor={total} titulo="Novas Mortes" campo="new_deaths" background="#ff0d00" />}
                </Grid>
                {cidade && <Grid item xs={12} sm={12} md={12} >
                    <InforCardCity cidade={cidade} />
                </Grid>}
                <Grid item xs={12} sm={12} md={6}  lg={6} xl={6}  >
                    <PaperMap 
                        total={total}
                        setCidade={(valor) => setCidade(valor)}
                        classePaper={classes.paper}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} >
                    <PaperChart
                        cidade={cidade}
                        dataCidade={dataCidade}
                        total={total}
                        setCidade={(valor) => setCidade(valor)}
                        classePaper={classes.paper}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <PaperLineChart 
                        estado={estado} 
                        classePaper={classes.paper}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Index;