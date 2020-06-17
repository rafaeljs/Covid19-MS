import React from 'react';
import { Paper } from '@material-ui/core';
import { Map, TileLayer, GeoJSON } from 'react-leaflet'
import geoJson from '../Assets/GeoJson.json'

function PaperMap({total, setCidade, classePaper}) {
    const onEachFeature = (feature, layer) => {
        if (feature.properties && feature.properties.name) {
            const cidade = total.filter(dado => { return dado.city_ibge_code.toString() === feature.properties.id});
            const casos = cidade.length > 0 ? cidade[0].last_available_confirmed : 0
            const mortes = cidade.length > 0 ? cidade[0].last_available_deaths : 0
            const data = cidade.length > 0 ? cidade[0].date.split('-')[2]+'/'+cidade[0].date.split('-')[1]+ '/'+cidade[0].date.split('-')[0] : 'Sem data'
            layer.bindPopup(feature.properties.name 
                + '<br /> ' 
                + 'Casos confirmados: ' + casos 
                + '<br /> ' 
                + 'Mortes: ' + mortes 
                + '<br /> ' 
                + 'Data atualização: ' + data 
            );
        }
        layer.on({
          mouseover: e => {
              layer.openPopup();
          },
          click: clickToFeature.bind(this)
        });
    }

    const clickToFeature = (e) => {
        var layer = e.target;
        const cidade = total.filter(dado => { return dado.city_ibge_code.toString() === layer.feature.properties.id});
        setCidade(cidade.length > 0 ? cidade[0] : null);
    }
    return (
    <Paper className={classePaper} elevation={5} >
        {total.length > 0 ? <Map center={[-20.8147843,-55.5810919]} zoom={6} style={{width:'100%',height:'100%'}} >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={geoJson} onEachFeature={onEachFeature.bind(this)}  />
        </Map> : null}
    </Paper>
  );
}

export default PaperMap;