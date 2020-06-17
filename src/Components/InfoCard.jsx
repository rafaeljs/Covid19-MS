import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        color: '#FFF',
        padding: '15px 15px 0 15px',
        height: '100%',
        boxSizing: 'border-box'
    },
    icon: {
        fontSize: 50,
        color: 'rgba(0,0,0,.15)'
    },
    valor: {
        color:'#FFF',
        fontWeight: 'bold',
        marginBottom: 20
    },
    alinhamento: {
        alignSelf: 'center'
    },
    textos: {
        paddingBottom: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }
}));


const InfoCard = ({titulo, background, icon, valor}) => {
    const classes = useStyles();

    React.useEffect(() => {
        const node = loadCSS(
          'https://use.fontawesome.com/releases/v5.13.0/css/all.css',
          document.querySelector('#font-awesome-css'),
        );
    
        return () => {
          node.parentNode.removeChild(node);
        };
      }, []);
    
    return (
            <Paper elevation={5} className={classes.container} style={{backgroundColor:background}}>
            <div className={classes.textos}>
                <Typography variant="h4" className={classes.valor}>
                    {valor}
                </Typography>
                <Typography variant="subtitle1" className={classes.texto} style={{bottom: 0}}>
                    {titulo}
                </Typography>
            </div>
            <div className={classes.alinhamento}>
                <Icon className={icon + ' ' + classes.icon} />
            </div>
        </Paper>
    );
}

export default InfoCard;