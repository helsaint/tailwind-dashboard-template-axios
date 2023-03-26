import React, { useContext, useEffect, useState } from 'react';
import { PlayerScoreContext } from '../../utils/Context';

import Image01 from '../../images/user-36-05.jpg';
import Image02 from '../../images/user-36-06.jpg';
import Image03 from '../../images/user-36-07.jpg';
import Image04 from '../../images/user-36-08.jpg';
import Image05 from '../../images/user-36-09.jpg';

function DashboardCard10() {

  const playerScores = useContext(PlayerScoreContext);
  const [isLoading, setLoading] = useState(true);
  const [isTop5Loading, setTop5Loading] = useState(true);
  const [lstPlayers, setListPlayers] = useState([]);
  const [test_name, setTest] = useState("TEST");

  useEffect(()=>{
    let array_temp = [];
    let dict_temp = {};
    if(!(playerScores[1])){
      for(let i = 0; i < playerScores[0].length; i++){
        dict_temp = {};
        dict_temp['id'] = i;
        dict_temp['image'] = playerScores[0][i]['image'];
        dict_temp['name'] = playerScores[0][i]['name'];
        dict_temp['gca'] = playerScores[0][i]['gca'];
        dict_temp['sca'] = playerScores[0][i]['sca'];
        dict_temp['total'] = playerScores[0][i]['total'];
        array_temp.push(dict_temp);
      }
    }
    setListPlayers(array_temp);
    setLoading(false);
    setTop5Loading(playerScores[1]);
  },[isTop5Loading, isLoading, playerScores]);

  if (isTop5Loading || isLoading) {
    return <div className="App">Cunxeing...</div>;
  };


  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Most Creative Players</h2>
      </header>
      <div className="p-3">

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-400 bg-slate-50">
              <tr>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Name</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">GCA</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">SCA</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-center">Total</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                lstPlayers.map(customer => {
                  return (
                    <tr key={customer.id}>
                      <td className="p-2 whitespace-nowrap"> 
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-slate-800">{customer.name}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer.gca}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left font-medium text-green-500">{customer.sca}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-lg text-center">{customer.total}</div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

        </div>

      </div>
    </div>
  );
}

export default DashboardCard10;
