import React from 'react';
import { Paper, Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import Moment from 'moment'
import {
    BarChart, Bar, Brush, ReferenceLine, 
    XAxis, YAxis, CartesianGrid, Tooltip, 
    Legend, ResponsiveContainer
  } from 'recharts';

function PaperGraphic({cidade, total,dataCidade, setCidade,classePaper}) {
    return (
    <Paper className={classePaper} >
        <Typography variant="caption" display="block" gutterBottom >
            *Clique em uma cidade no mapa ou digite o nome da cidade.
        </Typography>
        <Autocomplete
            value={cidade}
            id="combo-box-demo"
            options={total}
            getOptionLabel={(option) => option.city}
            style={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Cidade" variant="outlined" />}
            onChange={(e,value) => setCidade(value)}
            loading
        />
        <ResponsiveContainer width="100%" height={500}>
            <BarChart
                data={cidade ? dataCidade: []}
                margin={{
                    top: 5, right: 20, left: 0, bottom: 5,
                }}
                barGap={0}
                barCategoryGap={0}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" height={65} tick={{angle:-32, textAnchor: 'end'}} tickFormatter={(item) => Moment(item).format('DD/MM/YYYY')} />
                <YAxis />
                <Tooltip labelFormatter={value => Moment(value).format('DD/MM/YYYY') } />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }}/>
                <ReferenceLine y={0} stroke="#000" />
                {dataCidade.length > 0 &&
                    <Brush dataKey="date" height={30} stroke="#229B41" tickFormatter={(item) => Moment(item).format('DD/MM/YYYY')} />
                }
                <Bar dataKey="new_confirmed" fill="#17a2b8" name="Confirmados"  />
                <Bar dataKey="new_deaths" fill="#ff0d00" name="Mortes"  />
            </BarChart>
        </ResponsiveContainer>
        <Typography variant="caption" display="block" gutterBottom >
            *Deslize as barras para alterar o periodo de leitura do gráfico.
        </Typography>
    </Paper>
  );
}

export default PaperGraphic;