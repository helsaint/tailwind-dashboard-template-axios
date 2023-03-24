import React, {useContext, useEffect, useState} from 'react';
import BarChart from '../../charts/BarChart03';
import { GCAStatsContext } from '../../utils/Context';


// Import utilities
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard11() {
  const [isLoading, setLoading] = useState(true);
  const [isGCALoading, setGCALoading] = useState(true);
  const [gcaDict, setGCADict] = useState([]);
  const gcaContext = useContext(GCAStatsContext);

  let chartData1 = {
    labels: ['Reasons'],
    datasets: gcaDict,
  };

  const int_foreground = 500
  const int_background = 900
  const color_options_background = [tailwindConfig().theme.colors.indigo[int_foreground],
                                    tailwindConfig().theme.colors.sky[int_foreground],
                                    tailwindConfig().theme.colors.green[int_foreground],
                                    tailwindConfig().theme.colors.slate[int_foreground],
                                    tailwindConfig().theme.colors.red[int_foreground],
                                    tailwindConfig().theme.colors.orange[int_foreground],
                                    tailwindConfig().theme.colors.yellow[int_foreground],
                                    tailwindConfig().theme.colors.pink[int_foreground]];

  const color_options_hover       = [tailwindConfig().theme.colors.indigo[int_background],
                                    tailwindConfig().theme.colors.sky[int_background],
                                    tailwindConfig().theme.colors.green[int_background],
                                    tailwindConfig().theme.colors.slate[int_background],
                                    tailwindConfig().theme.colors.red[int_background],
                                    tailwindConfig().theme.colors.orange[int_background],
                                    tailwindConfig().theme.colors.yellow[int_background],
                                    tailwindConfig().theme.colors.pink[int_background]];

  useEffect(()=>{
    let temp_datasets = [];
    
    if(!(gcaContext[1])){
      let i = 0;
      for(let k in gcaContext[0]){
        let temp_item = {barPercentage:1, categoryPercentage:1};
        temp_item['label'] = k;
        temp_item['data'] = [gcaContext[0][k]];
        temp_item['backgroundColor'] = color_options_background[i];
        temp_item['hoverBackgroundColor'] = color_options_hover[i];
        i += 1;
        temp_datasets.push(temp_item);
      }
    }

    setGCADict(temp_datasets);
    setGCALoading(gcaContext[1]);
    setLoading(false);

  },[gcaContext]);

  if (isGCALoading || isLoading) {
    return <div className="App">Cunxeing...</div>;
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Attacking Actions Leading to Goals</h2>
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
        <BarChart data={chartData1} width={595} height={48} />
      </div>
    </div>
  );
}

export default DashboardCard11;
