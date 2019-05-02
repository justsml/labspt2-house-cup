 const dummyData = {
  years:[
   { label: "2015", value: 1 },
   { label: "2016", value: 2 },
   { label: "2017", value: 3 },
   { label: "2018", value: 4 },
   { label: "2019", value: 5 },
   
 ],
 
  data:[
   ['x', 'H1', 'H2', 'H3', 'H4'],
   [0, 0,  0, 0,  0],
   [1, 10, 5,  4,  6],
   [2, 23, 15,  20,  26],
 
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

