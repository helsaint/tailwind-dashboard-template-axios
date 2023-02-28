import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Component } from 'react';
import BarChart from '../../charts/BarChart01';
import Icon from '../../images/icon-01.svg';
import EditMenu from '../EditMenu';
import axios from 'axios';
import Plot from 'react-plotly.js';

// Import utilities
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

class DashboardCard01 extends Component {

  state = {
    title : '',
    x:[],
    y:[],
    dict_frequency_age:{},
    mode_age: 0,
    median_age: 0,
    chartData1:  {
      labels: [1,2,3,4,5,6,7],
      datasets: [
        // Indigo line
        {
          data: [100,200,300,400,500,600,100],
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
    },
  };

  componentDidMount() {
    this.getTitle();
    this.getX();
    this.getY();
  };

  getTitle(){
    this.setState({title: 'Monkey'});
  };

  getX(){
    var  temp_list = [];
    var int_year = new Date().getFullYear();
    var int_temp_age = 0;
    var temp_dict_freq = {};
    var int_mode = 0;
    axios
    .get('http://127.0.0.1:8000/angular/api_players')
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
          int_temp_age = int_year - res.data[i].born;
          temp_list.push(int_temp_age);
          if(int_temp_age in temp_dict_freq){
            temp_dict_freq[int_temp_age] += 1;
          }
          else{
            temp_dict_freq[int_temp_age] = 1;
          }
        }
        int_mode = Object.keys(temp_dict_freq).reduce((a, b) => 
        temp_dict_freq[a] > temp_dict_freq[b] ? a : b);
        this.setState({x: temp_list});
        this.setState({dict_frequency_age: temp_dict_freq});
        this.setState({mode_age: int_mode});
        temp_list.sort();
        //find the median
        const midpoint = Math.floor(temp_list.length / 2); // 2.
        const median = temp_list.length % 2 === 1 ?
        temp_list[midpoint] : // 3.1. If odd length, just take midpoint
        (temp_list[midpoint - 1] + temp_list[midpoint]) / 2;
        this.setState({median_age: median});
        this.setState({chartData1: {
          labels: Object.keys(temp_dict_freq),
          datasets: [
        // Indigo line
            {
              data: Object.values(temp_dict_freq),
              fill: true,
              backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
              borderColor: tailwindConfig().theme.colors.indigo[500],
              borderWidth: 2,
              tension: 0,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
              clip: 20,
            },
          ]
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
  };

  getY(){
    var  temp_list = [];
    axios
    .get('http://127.0.0.1:8000/angular/api_players')
    .then(res => {
        for(let i = 0; i < res.data.length; i++){
            temp_list.push(res.data[i].id);
        }
        this.setState({y: temp_list});
    })
    .catch(err => {
      console.log(err);
    });
  };

  chartData = {
    labels: [1,2,3,4,5,6,7],
    datasets: [
      // Indigo line
      {
        data: [700,600,500,400,300,200,200],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(tailwindConfig().theme.colors.blue[500])}, 0.08)`,
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

  render() {
    return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
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
        <h2 className="text-lg font-semibold text-slate-800 mb-2">
          Age Range: {this.state.chartData1.datasets[0].data.length},
          Median Age: {this.state.median_age}</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Number of Players
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">{this.state.x.length}</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            Most Frequent Age: {this.state.mode_age}</div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        {console.log(this.state.chartData1.labels)}
        <BarChart data={this.state.chartData1} width={389} height={128} />
      </div>
    </div>
  );
  }
}

export default DashboardCard01;
