import React, { useEffect, useState, useContext } from 'react';
import LineChart from '../../charts/LineChart02';
import pl_clubs_alias from '../../data/pl_clubs_alias.json';
import { TOP5 } from './DashboardCard07';
import { Top5TeamsContext } from '../../utils/Context';


// Import utilities
import { tailwindConfig } from '../../utils/Utils';
import axios from 'axios';

function DashboardCard08() {

  const ctx_team_rank = useContext(Top5TeamsContext);
  const [isLoading, setLoading] = useState(true);
  const [isTop5Loading, setTop5Loading] = useState(true);
  const [time_series_goals_by_top5, setTimeSeries] = useState();
  const [games_played, setGamesPlayed] = useState();
  const [goals_scored, setGoalsScored] = useState();
  
  useEffect(()=>{
    let dict_temp = {};
    let dict_top5 = {};
    let arr_temp = [];
    let set_temp = new Set();
    let str_squadH = "";
    let str_squadA = "";
    axios.get('https://dashboards.aramotar.com/pl_results_api/pl_results_api').then(res => {
      for(let i = 0; i < res.data.length; i++){
        set_temp.add(res.data[i].RoundNumber);
        str_squadA = res.data[i].AwayTeam;
        str_squadH = res.data[i].HomeTeam;
        if(res.data[i].AwayTeamScore === null || res.data[i].HomeTeamScore === null){
          continue;
        }
        if(str_squadA in dict_temp){
          dict_temp[str_squadA].push(res.data[i].AwayTeamScore);
        }else{
          dict_temp[str_squadA] = [res.data[i].AwayTeamScore];
        }
        if(str_squadH in dict_temp){
          dict_temp[str_squadH].push(res.data[i].HomeTeamScore);
        }else{
          dict_temp[str_squadH] = [res.data[i].HomeTeamScore];
        }
      }

      for(let key in pl_clubs_alias[0]){
        dict_temp[pl_clubs_alias[0][key]] = dict_temp[key];
      }

      
      let int_games = 0;
      let int_goals = 0;
      
      if(!(ctx_team_rank[1])){
        for(let i = 0; i < ctx_team_rank[0].length; i++ ){
          let str_temp = ctx_team_rank[0][i][0];
          dict_top5[str_temp] = dict_temp[str_temp];
          if(int_games < dict_temp[str_temp].length){
            int_games = dict_temp[str_temp].length;
          }
          int_goals = dict_temp[str_temp].reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            int_goals
          );
        }
      }

      /*The below code was using a TOP5 variable that was exported 
      from DB07. This caused problems as it would only update when
      TOP5 was updated constantly calling for refreshing the page.
      We now use the useContext instead. */
      //dict_top5 = {};
      //for(let key in TOP5){
      //  let str_temp = TOP5[key][0];
      //  dict_top5[str_temp] = dict_temp[str_temp];
      //  if(int_games < dict_temp[str_temp].length){
      //    int_games = dict_temp[str_temp].length;
      //  }
      //  int_goals = dict_temp[str_temp].reduce(
      //    (accumulator, currentValue) => accumulator + currentValue,
      //    int_goals
      //  );
      //}
      
      setGoalsScored(int_goals);
      setGamesPlayed(int_games);
      setTimeSeries(dict_top5);
      setTop5Loading(ctx_team_rank[1]);
      setLoading(false);
    }).catch((exception) => {
      console.log("PL Site Broken")
    });
    
  },[isLoading, isTop5Loading, ctx_team_rank]);


  if (isLoading || isTop5Loading) {
    return <div className="App">Cunxeing...</div>;
  }
  
  const arr_teams = Object.keys(time_series_goals_by_top5);
  let arr_labels = [];
  for(let i = 0; i < games_played; i++){
    arr_labels.push(i);
  }
  
  const chartData_1 = {
    labels: arr_labels,
    datasets: [{
      label: arr_teams[0],
      data: time_series_goals_by_top5[arr_teams[0]],
      borderColor: tailwindConfig().theme.colors.green[500],
      fill: false,
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: tailwindConfig().theme.colors.green[500],
    },
    {
      label: arr_teams[1],
      data: time_series_goals_by_top5[arr_teams[1]],
      borderColor: tailwindConfig().theme.colors.red[500],
      fill: false,
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: tailwindConfig().theme.colors.red[500],
    },
    {
      label: arr_teams[2],
      data: time_series_goals_by_top5[arr_teams[2]],
      borderColor: tailwindConfig().theme.colors.blue[500],
      fill: false,
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: tailwindConfig().theme.colors.blue[500],
    },
    {
      label: arr_teams[3],
      data: time_series_goals_by_top5[arr_teams[3]],
      borderColor: tailwindConfig().theme.colors.yellow[500],
      fill: false,
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: tailwindConfig().theme.colors.yellow[500],
    },
    {
      label: arr_teams[4],
      data: time_series_goals_by_top5[arr_teams[4]],
      borderColor: tailwindConfig().theme.colors.fuchsia[500],
      fill: false,
      borderWidth: 2,
      tension: 0,
      pointRadius: 0,
      pointHoverRadius: 3,
      pointBackgroundColor: tailwindConfig().theme.colors.fuchsia[500],
    },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Goals Scored (Top 5)</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <LineChart data={chartData_1} width={595} height={248} currency={false} goals={goals_scored} />
    </div>
  );
}

export default DashboardCard08;
