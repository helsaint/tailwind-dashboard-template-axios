import React,  {useState, useEffect} from 'react';
import BarChart from '../../charts/BarChart01';
import axios from 'axios';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard04() {

  const [isLoading, setLoading] = useState(true);
  const [dictPositions, setPositions] = useState();

  useEffect(() => {
    let temp_dict = {};
    let str_pos = "";
    let arr_temp = [];

    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        str_pos = res.data[i].pos;
        if(str_pos in temp_dict){
          arr_temp = temp_dict[str_pos];
          arr_temp[0] += res.data[i].sca;
          arr_temp[1] += res.data[i].gca;
          arr_temp[2] += 1;
        }else{
          temp_dict[str_pos] = [res.data[i].sca, res.data[i].gca, 1];
        }
      }
      setPositions(temp_dict);
      setLoading(false);
    });

  },[]);

  if (isLoading) {
    return <div className="App">Cunxeing...</div>;
  }

  const arr_labels = [];
  const arr_sca = [];
  const arr_gca = [];

  for(let key in dictPositions){
    arr_labels.push(key);
    arr_sca.push(Math.round(dictPositions[key][0]/dictPositions[key][2]));
    arr_gca.push(Math.round(dictPositions[key][1]/dictPositions[key][2]));
  }

  const chartData = {
    labels: arr_labels,
    datasets: [
      // Light blue bars
      {
        label: 'Average GCA',
        data: arr_gca,
        backgroundColor: tailwindConfig().theme.colors.blue[400],
        hoverBackgroundColor: tailwindConfig().theme.colors.blue[500],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Average SCA',
        data: arr_sca,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">GCA/player VS SCA/player</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default DashboardCard04;
