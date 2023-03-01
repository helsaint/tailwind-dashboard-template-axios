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

  useEffect(() => {
    var temp_dict = {};
    var int_gca = 0;
    var str_team = "";

    axios.get('http://127.0.0.1:8000/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        str_team = res.data[i].squad;
        int_gca = parseInt(res.data[i].gca);
        if(str_team in temp_dict){
          temp_dict[str_team] += int_gca;
        }else{
          temp_dict[str_team] = int_gca;
        }
      }

      setDictTeams(temp_dict);
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Acme Professional</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Sales</div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">$9,962</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">+49%</div>
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
