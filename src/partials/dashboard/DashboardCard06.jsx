import React, {useState, useEffect} from 'react';
import DoughnutChart from '../../charts/DoughnutChart';
import axios from 'axios';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard06() {
  const [isLoading, setLoading] = useState(true);
  const [dictPositions, setPositions] = useState();

  useEffect(() => {

    let temp_dict = {};
    let str_pos = "";
    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        str_pos = res.data[i].pos;
        if(str_pos in temp_dict){
          temp_dict[str_pos] += 1;
        }else{
          temp_dict[str_pos] = 1;
        }
      }

      setPositions(temp_dict);
      setLoading(false);

    });
  
  },[]);

  if (isLoading) {
    return <div className="App">Cunxeing...</div>;
  }

  const int_pos = Object.keys(dictPositions).length;
  const colors_ignore = ["inherit", "current", "transparent", "white", "black", "slate", "gray",
                        "zinc", "neutral", "stone"];
  const color_options = [];
  
  for(let key in tailwindConfig().theme.colors){
    if(colors_ignore.includes(key)){
      continue;
    }else{
      color_options.push(key);
    }
  }

  const arr_background_color = [];
  const arr_hover_color = [];
  for(let i = 0; i < int_pos;i++){
    arr_background_color.push(tailwindConfig().theme.colors[color_options[i]][300]);
    arr_hover_color.push(tailwindConfig().theme.colors[color_options[i]][600]);
  }


  const chartData = {
    labels: Object.keys(dictPositions),
    datasets: [
      {
        label: '# Players',
        data: Object.values(dictPositions),
        backgroundColor: arr_background_color,
        hoverBackgroundColor: arr_hover_color,
        hoverBorderColor: tailwindConfig().theme.colors.white,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Players by Positions</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default DashboardCard06;
