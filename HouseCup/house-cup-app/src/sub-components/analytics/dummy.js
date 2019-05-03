 const dummyData = {
  years:[
   { label: "2015", value: "2015" },
   { label: "2016", value: "2016" },
   { label: "2017", value: "2017" },
   { label: "2018", value: "2018" },
   { label: "2019", value: "2019" },
   
 ],
 
  data :[
   ['x', 'H1', 'H2', 'H3', 'H4'],
   [0, 0,  0, 0,  0],
   [1, 10, 5,  4,  6],
   [2, 23, 15,  20,  26],
   [4, 10, 6,   22,  24],
   [5,  5, 10,  32,  20],
   [6, 12, 25,  44,  12],
   [7, 15, 45,  50,  10],
   [8, 18, 35,  20,  8], 
   [9, 22, 30,  38,   5],
   [10, 32, 40,  12,  4],
   [11, 42, 45,  15,  14],
   [12, 28, 32,  17,  44],
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

export default dummyData;

