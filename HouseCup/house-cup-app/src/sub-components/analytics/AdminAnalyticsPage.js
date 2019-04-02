import React, { Component } from 'react';
import Chart from "react-google-charts";

export default class AdminAnalyticsPage extends Component {
  constructor(props) {
    super(props);
     this.state ={
       data:[
        ['x', 'House-1', 'House-2', 'House-3', 'House-4'],
        [0, 0,  0, 0,  0],
        [1, 10, 5,  4,  6],
        [2, 23, 15,  20,  26],
        [3, 17, 9,  18,  32],
        [4, 18, 10, 35,  56],
        [5, 9, 5,  40,  36],
        [6, 11, 3,  8,   12],
        [7, 27, 19,  10,  33],
        [8, 6,  9,  5,   8],
        [9, 34, 29,  30, 32],
        [10, 17, 19, 35,  25],
        [11, 7, 9,  5,   10],
        [12, 37, 39, 12,  15],
      ],
      options:{
        hAxis: {
          title: 'Time in Months' ,
        },
        vAxis: {
          title: 'Points',
        },
        series: {
          1: { curveType: 'function' },
        },
      }
     }
  }
  render() {
    return (
      <>
         <Chart
          chartType="LineChart"
          data={this.state.data}
          options={this.state.options}
          width={"900px"}
          height={"500px"}
          />
      </>
    )
  }
}


