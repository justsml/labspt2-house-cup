import React, { Component } from 'react';
import Chart from "react-google-charts";
import Graph from '../Styles/Graphs.js';
import SideMenu from '../sideMenu.js';

export default class AdminAnalyticsPage extends Component {
  constructor(props) {
    super(props);
     this.state ={
       years: ['2008-09', '2009-2010', '2010-2011','2011-12','2012-13','2013-14', '2014-15', '2015-16'],
       data:[
        ['x', 'H1', 'H2', 'H3', 'H4'],
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
  
  renderGraphs = () => {
    this.setState({
      options: this.state.options,
      date: [...this.state.data]
    })
  }

componentDidMount() {
    window.addEventListener('resize', this.renderGraphs);
 }
 
 componentUpdate() {
   window.addEventListener('resize', this.renderGraphs);
 }
  render() {
    return (
      <div className="analytics">
        <SideMenu />
        <div className="graphs">
          <Graph>
            <form className="select" onSubmit={this.handleSubmit}>
              <select value={this.state.value} onChange={this.handleChange}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>      
            </form>
            <Chart 
                chartType="LineChart"
                data={this.state.data}
                options={this.state.options}
                className="chart"
                width={"800px"}
                height={"480px"}
            />
          </Graph>    
        </div>
      </div>
    )
  }
}


