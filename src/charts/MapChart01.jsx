import React, { useRef, useEffect } from 'react';
import { tailwindConfig, formatValueCurrency } from '../utils/Utils';
import Plot from "react-plotly.js";
//import {vectorMap} from "react-jvectormap";
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';
//import { map } from 'jquery';
function MapChart01({
    data,
    width,
    height
  }) {

    const canvas = useRef(null);

    useEffect(()=>{
      const ctx = canvas.current;
      //const chart = $("#map").vectorMap({
      //  map: "world_mill",
      //  series: {
      //    regions: [{
      //      values: {"RU": 15, "US":10},
      //      scale: ['#C8EEFF', '#0071A4'],
      //      normalizeFunction: 'polynomial',
      //    }]
      //  },
      //  containerStyle:{
      //    width: width,
      //    height: height,
      //  },
//
      //}
      //)
  
    },[]);

    return (
        //<canvas ref={canvas} width={width} height={height}></canvas>
        //<div id="map" width={width} height={height}></div>
        <VectorMap
        map={worldMill}
        />
    );

  }

  export default MapChart01;