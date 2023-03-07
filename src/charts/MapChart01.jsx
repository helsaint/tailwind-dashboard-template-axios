import React, { useRef, useEffect, useState } from 'react';
import { tailwindConfig, formatValueCurrency } from '../utils/Utils';
import { VectorMap, VectorMapBuilder, SeriesBuilder, AttributeSeriesBuilder } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';

function MapChart01({
    data,
    width,
    height
  }) {

    const [isLoading, setLoading] = useState(true);
    const [map_name, setMapName] = useState();
    const [regions_series, setRegionsSeries] = useState();

    var data1 = [];

    useEffect(()=>{

      if(data && isLoading){

        const scaleSeries = new AttributeSeriesBuilder("fill")
        .setScale(['#C8EEFF', '#0071A4'])
        .setValues({"RU":30, "US":10, "BR": 13})
        .setNormalizeFunction("polynomial")
        .build();

        const series = new SeriesBuilder().addRegionsSeries(scaleSeries).build();
        const my_map = new VectorMapBuilder(worldMill).setSeries(series).build(); 

        data1 = [{values:data,
        scale: ["#C8EEFF", "#0071A4"],
        normalizeFunction: "polynomial",}];

        //console.log(data);

        setMapName(worldMill);
        setRegionsSeries(data1);
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
          series={{regions:regions_series}}
          onRegionTipShow = {(e,el, code) => {
            el.html(el.html() + " (# - " + regions_series[0].values[code] + ")");
          }}
          />
        </div>
        </React.Fragment>
        
        
    );

  }

  export default MapChart01;