import React, {useContext, useState, useEffect} from 'react';
import { RSSPLContext } from '../../utils/Context';

function DashboardCard12() {
  const [isLoading, setLoading] = useState(true);
  const [isRSSLoading, setRSSLoading] = useState(true);
  const [lstRSS, setListRSS] = useState();
  const ctxRSS = useContext(RSSPLContext);

  useEffect(()=>{
    let arr_title = [];
    if(!(ctxRSS[1])){
      arr_title.push(ctxRSS[0].slice(0,6));
    }
    setListRSS(arr_title[0]);
    setRSSLoading(ctxRSS[1]);
    setLoading(false);
  },[ctxRSS]);

  if (isRSSLoading || isLoading) {
    return <div className="App">Cunxeing...</div>;
  };

  return (
    <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-sm border border-slate-200">
      <header className="px-5 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-slate-800">Recent News (ESPN RSS)</h2>
      </header>
      <div className="p-3">

        {/* Card content */}
        {/* "Today" group */}
        <div>
          <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Today</header>
          <ul className="my-1">
            {/* Item */}
            {lstRSS.map((title)=>(
            <li key={title} className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                  <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">{title[0]}</div>
                  <div className="shrink-0 self-end ml-2">
                  <a className="font-medium text-indigo-500 hover:text-indigo-600" href={title[1]}>View<span className="hidden sm:inline"> -&gt;</span></a>
                  </div>
                </div>
              </div>
            </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard12;
