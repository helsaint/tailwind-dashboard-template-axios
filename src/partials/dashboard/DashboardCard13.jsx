import React,{useContext, useEffect, useState} from 'react';
import { TransfrMrktContext } from '../../utils/Context';
import Info from '../../utils/Info';

function DashboardCard13() {

  const [isLoading, setLoading] = useState(true);
  const [isTrnsfrMrktLoading, setTransfrMrktLoading] = useState(true);
  const [dictTrnsfrMrkt, setTrnsfrMrkt] = useState(true);
  const ctxTrnsfrMrkt = useContext(TransfrMrktContext);

  useEffect(()=>{
    let arr_data = [];
    let int_max = 5;
    let int_count = 0;
    if(!(ctxTrnsfrMrkt[1])){
      for(let key in ctxTrnsfrMrkt[0]){
        let temp_array = [];
        if(int_count > int_max){
          break;
        }
        int_count += 1;
        temp_array.push(key);
        temp_array.push(ctxTrnsfrMrkt[0][key][0]);
        temp_array.push(ctxTrnsfrMrkt[0][key][1]);
        temp_array.push(ctxTrnsfrMrkt[0][key][2]);
        arr_data.push(temp_array);
      }
    }
    setTrnsfrMrkt(arr_data);
    setTransfrMrktLoading(false);
    setLoading(false);

  },[ctxTrnsfrMrkt]);
  if (isTrnsfrMrktLoading || isLoading) {
    return <div className="App">Cunxeing...</div>;
  };
  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100 flex items-center">
        <h2 className="font-semibold text-slate-800">Most Valuable Players</h2>
        <Info className="ml-2" containerClassName="min-w-80">
          <div className="text-sm">Data is based on TransferMarkt web scrape</div>
        </Info>
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
                  <div className="font-semibold text-left">Valuation</div>
                </th>
                <th className="p-2 whitespace-nowrap">
                  <div className="font-semibold text-left">Age</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-100">
              {
                dictTrnsfrMrkt.map(customer => {
                  return (
                    <tr key={customer[0]}>
                      <td className="p-2 whitespace-nowrap"> 
                        <div className="flex items-center">
                          <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                            <img className="rounded-full" src={customer[1]} width="40" height="40" alt={customer.name} />
                          </div>
                          <div className="font-medium text-slate-800">{customer[0]}</div>
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer[2]}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap">
                        <div className="text-left">{customer[3]}</div>
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

export default DashboardCard13;
