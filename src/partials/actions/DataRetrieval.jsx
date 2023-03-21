import React, {useState, useEffect} from "react";
import axios from "axios";

function DataRetrieval(){
    const data = "ALEXEI is a MORON";
    const [isTop5Loading, setLoading] = useState(true);
    const [arr_top_5, setTop5] = useState();
    
    useEffect(() => {
        let temp_dict_total = {};
        let str_squad = "";
        let int_sca = 0;
        let int_gca = 0;
        let items_to_sort = [];
        axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
            for(let i=0; i < res.data.length; i++){
                str_squad = res.data[i].squad;
                int_sca = res.data[i].sca;
                int_gca = res.data[i].gca;
                if(str_squad in temp_dict_total){
                  temp_dict_total[str_squad] += int_sca + int_gca;
                }
                else{
                  temp_dict_total[str_squad] = int_sca + int_gca;
                }
        
              }
              for(let key in temp_dict_total){
                items_to_sort.push([key, temp_dict_total[key]])
              }
              items_to_sort.sort(function(first, second) {
                return second[1] - first[1];
              });
        
              setTop5(items_to_sort.slice(0, 5));
              setLoading(false);
        
    });

    },[]);

    if (isTop5Loading) {
        return [<div className="App">Cunxeing...</div>, isTop5Loading];
    }

    return [arr_top_5, isTop5Loading];
};

export default DataRetrieval;