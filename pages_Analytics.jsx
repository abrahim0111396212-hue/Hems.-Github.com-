import { useEffect,useState } from "react";
import axios from "axios";
import { LineChart,Line,XAxis,YAxis,Tooltip,BarChart,Bar } from "recharts";

export default function Analytics(){
  const [data,setData] = useState(null);
  useEffect(()=>{fetchData()},[]);
  const fetchData=async()=>{
    const res = await axios.get("http://localhost:5000/api/analytics",{
      headers:{Authorization:localStorage.getItem("token")}
    });
    setData(res.data);
  }
  if(!data) return <p>Loading...</p>;
  const dailyData = Object.keys(data.daily).map(date=>({date,sales:data.daily[date]}));
  const topData = data.topProducts.map(p=>({name:p[0],quantity:p[1]}));

  return(
    <div>
      <h2>تحليل المبيعات</h2>
      <LineChart width={500} height={300} data={dailyData}><XAxis dataKey="date"/><YAxis/><Tooltip/><Line dataKey="sales"/></LineChart>
      <BarChart width={500} height={300} data={topData}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="quantity" fill="#8884d8"/></BarChart>
    </div>
  )
}