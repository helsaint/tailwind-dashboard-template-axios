import React from 'react';
import {useState, useEffect, createContext} from 'react';
import pl_badges from '../../data/pl_badges.json';
import pl_badges_link from '../../data/pl_badges_link.json';
import axios from 'axios';

const TOP5 = createContext();

function DashboardCard07() {
  const [isLoading, setLoading] = useState(true);
  const [dict_squad_attacking, setSquadAttack] = useState();
  const [dict_total, setTotal] = useState();
  const [arr_top_5, setTop5] = useState();

  useEffect(() => {
    let int_year = new Date().getFullYear();
    let temp_dict = {};
    let temp_dict_total = {};
    let str_squad = "";
    let int_sca = 0;
    let int_gca = 0;
    let int_age = 0;
    let temp_list = [];
    let items_to_sort = [];
    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i=0; i < res.data.length; i++){
        str_squad = res.data[i].squad;
        int_sca = res.data[i].sca;
        int_gca = res.data[i].gca;
        int_age = int_year - res.data[i].born;
        if(str_squad in temp_dict){
          temp_list = temp_dict[str_squad];
          temp_list[0] += int_sca;
          temp_list[1] += int_gca;
          temp_list[2] += int_sca + int_gca;
          temp_list[3] += 1;
          temp_list[4] += int_age;
          temp_dict_total[str_squad] += int_sca + int_gca;
        }
        else{
          temp_list = [int_sca, int_gca, int_sca + int_gca, 1, int_age, pl_badges_link[0][str_squad]];
          temp_dict[str_squad] = temp_list;
          temp_dict_total[str_squad] = int_sca + int_gca;
        }

      }

      
      for(let key in temp_dict_total){
        items_to_sort.push([key, temp_dict_total[key]])
      }
      items_to_sort.sort(function(first, second) {
        return second[1] - first[1];
      });

      setSquadAttack(temp_dict);
      setTotal(temp_dict_total);
      setTop5(items_to_sort.slice(0, 5));
      setLoading(false);


    });
  
  },[]);

  if (isLoading) {
    return <div className="App">Cunxeing...</div>;
  }
  
  // Create a new array with only the first 5 items
  const arr_top_5_1 = arr_top_5;
  
  return (
    <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Top Attacking Teams</h2>
      </header>
      <div className="p-3">
        <TOP5.Provider value={arr_top_5_1}></TOP5.Provider>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Squad</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Goal Creating Actions</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Shot Creating Actions</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Squad Size</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Average Squad Age</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100">
              {/* Row */}
              {arr_top_5_1.map((top_5)=>(
              <tr key={top_5}>
                <td className="p-2">
                  <div className="flex items-center">
                    <img src={dict_squad_attacking[top_5[0]][5]} />
                    <div className="text-slate-800">{top_5[0]}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{dict_squad_attacking[top_5[0]][1]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">{dict_squad_attacking[top_5[0]][0]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{dict_squad_attacking[top_5[0]][3]}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-sky-500">{Math.round(dict_squad_attacking[top_5[0]][4]/dict_squad_attacking[top_5[0]][3])}</div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
