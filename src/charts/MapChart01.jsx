import React, { useRef, useEffect, useState } from 'react';
import { tailwindConfig, formatValueCurrency } from '../utils/Utils';
import { VectorMap, VectorMapBuilder, SeriesBuilder, AttributeSeriesBuilder } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';

function MapChart01({
    data,
    width,
    height
  }) {

    const canvas = useRef(null);
    const map_ref = useRef(null);
    const map_series = useRef(null)
    const [isLoading, setLoading] = useState(true);
    const [map_name, setMapName] = useState();
    const [regions_series, setRegionsSeries] = useState();

    var data1 = [];

    useEffect(()=>{
      console.log(data);

      if(data && isLoading){
        const ctx = canvas.current;

        const scaleSeries = new AttributeSeriesBuilder("fill")
        .setScale({1:'#C8EEFF', 2: '#0071A4'})
        .setValues({"RU":30, "US":10, "BR": 13})
        .setNormalizeFunction("polynomial")
        .build();

        const series = new SeriesBuilder().addRegionsSeries(scaleSeries).build();
        const my_map = new VectorMapBuilder(worldMill).setSeries(series).build(); 
        map_ref.current = worldMill;
        map_series.current = series;
        canvas.current = my_map;

        data1 = [{values:{"RU":30, "US":10, "CA": 13}},
            {scale: ['#C8EEFF', '#0071A4']},
            {normalizeFunction:"polynomial"}];

        console.log(series);
        console.log(data1);

        setMapName(worldMill);
        setRegionsSeries(series);
        setLoading(false);

    }},[]);

    if (isLoading) {
      return <div className="App">Loading...</div>;
    }

    return (
      //<React.Fragment>
      //<div className="grow">
      //  <canvas ref={canvas} width={width} height={height}></canvas>
      //</div>
      //</React.Fragment>
        
        //<canvas ref={canvas} width={width} height={height}></canvas>
        <React.Fragment>
          <div className='grow'>
          <VectorMap
          map={map_name}
          series={{regions_series}}
          />
        </div>
        </React.Fragment>
        
        
    );

  }

  export default MapChart01;