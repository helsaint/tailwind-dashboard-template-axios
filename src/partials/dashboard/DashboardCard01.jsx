import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BarChart from '../../charts/BarChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import axios from 'axios';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard01() {
  const [isLoading, setLoading] = useState(true);
  const [dict_frequency_age, setDictFrequencyAge] = useState();
  const [int_mode_age, setModeAge] = useState();
  const [int_num_players, setNumPlayers] = useState();
  const [int_median_age, setMedianAge] = useState();

  useEffect(() => {
    var int_year = new Date().getFullYear();
    var int_temp_age = 0;
    var temp_dict_freq = {};
    var int_mode = 0;
    var int_median = 0;
    var arr_age = []
    
    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        int_temp_age = int_year - res.data[i].born;
        arr_age.push(int_temp_age);
        if(int_temp_age in temp_dict_freq){
          temp_dict_freq[int_temp_age] += 1;
        }
        else{
          temp_dict_freq[int_temp_age] = 1;
        }
      }

      int_mode = Object.keys(temp_dict_freq).reduce((a, b) => 
      temp_dict_freq[a] > temp_dict_freq[b] ? a : b);
      arr_age.sort();
      if((arr_age.length % 2) == 0){
        var int_mid = arr_age.length/2;
        int_median = arr_age[int_mid-1]
      }else{
        var int_mid = Math.floor(arr_age.length/2);
        int_median = arr_age[int_mid + 1];
      }
      

      setDictFrequencyAge(temp_dict_freq);
      setModeAge(int_mode);
      setNumPlayers(res.data.length);
      setMedianAge(int_median);
      setLoading(false);

    });
  }, []);

  if (isLoading) {
    return <div className="App">Cunxeing...</div>;
  }


  const chartData = {
    labels: Object.keys(dict_frequency_age),
    datasets: [
      // Indigo line
      {
        data: Object.values(dict_frequency_age),
        fill: true,
        backgroundColor: 'rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)',
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
      // Gray line
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 1</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3" to="#0">Option 2</Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">Remove</Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Age Histogram</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Number of Players: 
        {int_num_players}</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{int_mode_age}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">Mode</div>
          <div className="text-3xl font-bold text-slate-800 mr-2">{int_median_age}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">Median</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={389} height={128} currency={false}/>
      </div>
    </div>
  );
}

export default DashboardCard01;