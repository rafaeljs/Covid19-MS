import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import Moment from 'moment'
import {
    XAxis, YAxis, CartesianGrid, Tooltip, 
    Legend, ResponsiveContainer, LineChart,
    Line
  } from 'recharts';

function PaperLineGrapich({classePaper, estado}) {
  return (
    <Paper className={classePaper} elevation={5}>
      <Typography variant="h5" display="block" align="center" gutterBottom >
          Gráfico evolutivo do vírus no Estado.
      </Typography>
      {estado.length > 0 && 
      <ResponsiveContainer width="100%" height={500}>
          <LineChart
              margin={{
                  top: 5, right: 20, left: 0, bottom: 5,
              }}
              data={estado}
          >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" height={65} tick={{angle:-32, textAnchor: 'end'}} tickFormatter={(item) => Moment(item).format('DD/MM/YYYY')}/>
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip labelFormatter={value => Moment(value).format('DD/MM/YYYY') } />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="last_available_confirmed" stroke="#17a2b8" name="Confirmados" />
              <Line yAxisId="right" type="monotone" dataKey="last_available_deaths" stroke="#ff0d00" name="Mortes" />
          </LineChart>
      </ResponsiveContainer>
      }    
    </Paper>
  );
}

export default PaperLineGrapich;