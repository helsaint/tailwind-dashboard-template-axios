import React, { useState, useEffect } from 'react';
import Info from '../../utils/Info';
import MapChart01 from '../../charts/MapChart01';
import axios from 'axios';

// Import utilities

function DashboardCard05() {

  //Code commented out below is for RSS connectivity will be used elsewhere.

  //useEffect(()=>{
  //  var parser, xml_rss;
  //  axios.get('https://www.espn.co.uk/espn/rss/football/news').then(res=>{
  //    parser = new DOMParser();
  //    xml_rss = parser.parseFromString(res.data,"text/xml");
  //    let xml_items = xml_rss.getElementsByTagName("item");
  //    console.log(xml_items.length);
  //  });
  //},[])

  const [isLoading, setLoading] = useState(true);
  const [dictCountryPlayers, setCountryPlayers] = useState();

  useEffect(()=>{
    var str_nation = "";
    var temp_dict = {};
    
    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        try{
          str_nation = res.data[i].nation.slice(0,2);
          str_nation = str_nation.toUpperCase();
        }
        catch (error){
          console.log(error);
        }

        if(str_nation==='EN' || str_nation === 'SC' || str_nation === 'WL'){
          str_nation = 'GB';
        }

        try{
          if(str_nation in temp_dict){
            temp_dict[str_nation] += 1;
          }else{
            temp_dict[str_nation] = 1;
          }
        }catch(error){
          console.log(error)
        }
      }
      
      setCountryPlayers(temp_dict);
      setLoading(false);
    });
  },[])

  if (isLoading) {
    return <div className="App">Cuxeing...</div>;
  }

  const chartData = dictCountryPlayers;

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Choropleth of Players</h2>
        <Info className="ml-2" containerClassName="min-w-44">
          <div className="text-sm text-center">Built with <a className="underline" href="https://jvectormap.com/" target="_blank" rel="noreferrer">jVectorMap</a></div>
        </Info>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <MapChart01 data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard05;
