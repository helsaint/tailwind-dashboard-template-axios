import React, {useState, useEffect} from "react";
import axios from "axios";
import fpl_players_code from '../../data/fpl_players_code.json';

export function DataRetrieval(){
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

export function PlayerScoreRetrieval(){
  const [isLoading, setLoading] = useState(true);
  const [dictTop10Players, setTop10Players] = useState();

  const fpl_url = "https://resources.premierleague.com/premierleague/photos/players/40x40/pXXXXXX.png";
  const fpl_na = "https://cdn-icons-png.flaticon.com/512/53/53254.png";

  useEffect(()=>{
    let temp_array = [];
    let temp_dict = {};
    let temp_name = "";
    let temp_sca = 0;
    let temp_gca = 0;
    let temp_gca_sca = 0;
    let arr_top_5 = [];
    let str_pl_code = "";
    let str_fpl_url = "";
    axios.get('https://dashboards.aramotar.com/pl_api/api_players').then(res => {
      for(let i = 0; i < res.data.length; i++){
        temp_dict = {};
        temp_name = res.data[i].player;
        temp_sca = res.data[i].sca;
        temp_gca = res.data[i].gca;
        temp_gca_sca = temp_gca + temp_sca;
        temp_dict['name'] = temp_name;
        temp_dict['sca'] = temp_sca;
        temp_dict['gca'] = temp_gca;
        temp_dict['total'] = temp_gca_sca;
        temp_array.push(temp_dict);
      }
      temp_array.sort(function(a,b){
        return b.total - a.total
      })
      arr_top_5 = temp_array.slice(0,5);

      for(let i = 0; i < arr_top_5.length; i++){
        try{
          str_pl_code = fpl_players_code[0][arr_top_5[i]['name']]['fpl_code'];
          str_fpl_url = fpl_url.replace("XXXXXX", str_pl_code);
          arr_top_5[i]['image'] = str_fpl_url;
        }catch{
          arr_top_5[i]['image'] = fpl_na;
        }
      }      

      setTop10Players(arr_top_5);
      setLoading(false);
  });
  },[]);

  return [dictTop10Players,isLoading];
};

//export default DataRetrieval;