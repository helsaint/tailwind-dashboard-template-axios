import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BarChart from '../../charts/BarChart01';
import Icon from '../../images/icon-03.svg';
import EditMenu from '../EditMenu';
import axios from 'axios';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard03() {

  const [isLoading, setLoading] = useState(true);
  const [dict_teams, setDictTeams] = useState();
  const [intMode, setMode] = useState();
  const [intMedian, setMedian] = useState();

  useEffect(() => {
    var temp_dict = {};
    var int_count = 0;
    var str_team = "";
    var int_mode = 0;
    var int_median = 0;

    axios.get('http://127.0.0.1:8000/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        str_team = res.data[i].squad;
        if(str_team in temp_dict){
          temp_dict[str_team] += 1;
        }else{
          temp_dict[str_team] = 1;
        }
      }

      int_mode = Math.max.apply(Math,Object.values(temp_dict));
      var arr_size = Object.values(temp_dict);
      arr_size.sort();
      if((arr_size.length % 2) == 0){
        var int_mid = arr_size.length/2;
        int_median = arr_size[int_mid-1]
      }else{
        var int_mid = Math.floor(arr_size.length/2);
        int_median = arr_size[int_mid + 1];
      }

      
      var dict_reverse = {};
      for(let key in temp_dict){
        var temp_array = [];
        var int_temp = temp_dict[key];
        if(int_temp in dict_reverse){
          temp_array = dict_reverse[int_temp];
          temp_array.push(key);
          dict_reverse[int_temp] = temp_array;
        }else{
          temp_array.push(key);
          dict_reverse[int_temp] = temp_array;
        }
      }

      var dict_final = {}
      for(let size in dict_reverse){
        for(let l in dict_reverse[size]){
          dict_final[dict_reverse[size][l]] = parseInt(size);
        }
      }

      setDictTeams(dict_final);
      setMode(int_mode);
      setMedian(int_median);
      setLoading(false);

    });

  },[]);

  if (isLoading) {
    return <div className="App">Cunxieing...</div>;
  };

  const chartData = {
    labels: Object.keys(dict_teams),
    datasets: [
      // Indigo line
      {
        data: Object.values(dict_teams),
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
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 03" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Squad Sizes</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Squad Stats</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{intMode}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">Mode</div>
          <div className="text-3xl font-bold text-slate-800 mr-2">{intMedian}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">Median</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={389} height={128} currency={false} />
      </div>
    </div>
  );
}

export default DashboardCard03;
