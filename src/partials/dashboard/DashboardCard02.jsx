import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import BarChart from '../../charts/BarChart01';
import Icon from '../../images/icon-02.svg';
import EditMenu from '../EditMenu';
import axios from 'axios';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function DashboardCard02() {

  const [isLoading, setLoading] = useState(true);
  const [dict_frequency_games, setDictFrequencyGames] = useState();
  const [int_mode_games, setModeGame] = useState();
  const [int_median_games, setMedianGame] = useState();

  useEffect(() => {
    var temp_dict_freq = {};
    var int_mode = 0;
    var int_median = 0;
    var int_games = 0;
    var arr_games = [];

    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        int_games = parseFloat(res.data[i].avg_90s_played);
        arr_games.push(int_games);
        if(Math.round(int_games) in temp_dict_freq){
          temp_dict_freq[Math.round(int_games)] += 1;
        }else{
          temp_dict_freq[Math.round(int_games)] = 1;
        }
      }

      int_mode = Object.keys(temp_dict_freq).reduce((a, b) => 
      temp_dict_freq[a] > temp_dict_freq[b] ? a : b);

      arr_games.sort();
      if((arr_games.length % 2) == 0){
        var int_mid = arr_games.length/2;
        int_median = arr_games[int_mid-1]
      }else{
        var int_mid = Math.floor(arr_games.length/2);
        int_median = arr_games[int_mid + 1];
      }

      setModeGame(int_mode);
      setMedianGame(int_median);
      setDictFrequencyGames(temp_dict_freq);
      setLoading(false);

    });

  },[]);

  if (isLoading) {
    return <div className="App">Cunxeing...</div>;
  };

  const chartData = {
    labels: Object.keys(dict_frequency_games),
    datasets: [
      // Indigo line
      {
        data: Object.values(dict_frequency_games),
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
          <img src={Icon} width="32" height="32" alt="Icon 02" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Histogram Games Played</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Games Played:
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{int_mode_games}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">Mode</div>
          <div className="text-3xl font-bold text-slate-800 mr-2">{int_median_games}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">Median</div>
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

export default DashboardCard02;
