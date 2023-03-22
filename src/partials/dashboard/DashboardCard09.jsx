import React,{ useContext, useEffect, useState} from 'react';
import Info from '../../utils/Info';
import BarChart from '../../charts/BarChart02';
import { TOP5} from './DashboardCard07';
import { DataContext } from '../../utils/Context';
import pl_clubs_alias from '../../data/pl_clubs_alias.json';

// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import axios from 'axios';

function DashboardCard09({DataSet}) {
  const [isLoading, setLoading] = useState(true);
  const [isTop5Loading, setTop5Loading] = useState(true);
  const [lstTop5Names, setTop5Names] = useState([]);
  const [lstTop5GA, setTop5GA] = useState([]);
  const [lstTop5GF, setTop5GF] = useState([]);
  //var strTest = useContext(DataContext);
  
  useEffect(()=>{
    var strTest = DataSet;
    var temp_dict_F = {};
    var temp_dict_A = {};
    var top5_F = {};
    var top5_A = {};
    var int_home = 0;
    var int_away = 0;
    var str_squad_home = "";
    var str_squad_away = "";
    let lst_squad = [];
    let lst_ga = [];
    let lst_gf = [];
    axios.get('https://dashboards.aramotar.com/pl_results_api/pl_results_api').then(res => {
      for(let i =0; i < res.data.length; i++){
        str_squad_home = res.data[i].HomeTeam;
        str_squad_away = res.data[i].AwayTeam;
        int_home = res.data[i].HomeTeamScore;
        int_away = res.data[i].AwayTeamScore;
        
        if(int_home === null){
          int_home = 0;
        }
        if(int_away === null){
          int_away = 0;
        }

        if(str_squad_home in temp_dict_F){
          temp_dict_F[str_squad_home] += res.data[i].HomeTeamScore;
        }

        if(str_squad_away in temp_dict_F){
          temp_dict_F[str_squad_away] += res.data[i].AwayTeamScore;
        }

        if(!(str_squad_home in temp_dict_F)){
          temp_dict_F[str_squad_home] = res.data[i].HomeTeamScore;
        }
        
        if(!(str_squad_away in temp_dict_F)){
          temp_dict_F[str_squad_away] = res.data[i].AwayTeamScore;
        }
        //___________________________________________________________
        if(str_squad_home in temp_dict_A){
          temp_dict_A[str_squad_home] += res.data[i].AwayTeamScore;
        }

        if(str_squad_away in temp_dict_A){
          temp_dict_A[str_squad_away] += res.data[i].HomeTeamScore;
        }

        if(!(str_squad_home in temp_dict_A)){
          temp_dict_A[str_squad_home] = res.data[i].AwayTeamScore;
        }

        if(!(str_squad_away in temp_dict_A)){
          temp_dict_A[str_squad_away] = res.data[i].HomeTeamScore;
        }
        
      }

      for(let key in pl_clubs_alias[0]){
        temp_dict_A[pl_clubs_alias[0][key]] = temp_dict_A[key];
        temp_dict_F[pl_clubs_alias[0][key]] = temp_dict_F[key];
      }

      for(let i = 0; i < strTest[0].length; i++){
        top5_F[strTest[0][i][0]] = temp_dict_F[strTest[0][i][0]];
        top5_A[strTest[0][i][0]] = temp_dict_A[strTest[0][i][0]];
        lst_squad.push(strTest[0][i][0]);
        lst_ga.push(-1*temp_dict_A[strTest[0][i][0]]);
        lst_gf.push(temp_dict_F[strTest[0][i][0]]);
      }

      setTop5Names(lst_squad);
      setTop5GA(lst_ga);
      setTop5GF(lst_gf);
      setLoading(false);
      setTop5Loading(strTest[1]);
    });
    //console.log("ALEXEI", strTest[0], "*********");
    
  },[isLoading, isTop5Loading, DataSet]);

  if (isLoading || isTop5Loading) {
    return <div className="App">Cunxeing...</div>;
  }

  const x_labels = lstTop5Names;
  const y1_data = lstTop5GF;
  const y2_data = lstTop5GA;

  const chartData = {
    labels: lstTop5Names,
    datasets: [
      // Light blue bars
      {
        label: 'Scored',
        data: lstTop5GF,
        backgroundColor: tailwindConfig().theme.colors.indigo[500],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[600],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
      // Blue bars
      {
        label: 'Conceded',
        data: lstTop5GA,
        backgroundColor: tailwindConfig().theme.colors.indigo[200],
        hoverBackgroundColor: tailwindConfig().theme.colors.indigo[300],
        barPercentage: 0.66,
        categoryPercentage: 0.66,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Goals For vs Against Top5 teams</h2>
        <Info className="ml-2" containerClassName="min-w-80">
          <div className="text-sm">Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</div>
        </Info>
      </header>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-yellow-500 rounded-full">{}</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <BarChart data={chartData} width={595} height={248} currency={false} />
      </div>
    </div>
  );
}

export default DashboardCard09;
