import { useEffect,useState } from "react";
import axios from "axios";
import { BarChart,Bar,XAxis,YAxis,Tooltip } from "recharts";

export default function SmartPrediction(){
  const [data,setData] = useState([]);
  useEffect(()=>{ fetchData(); },[]);
  const fetchData = async()=>{
    const res = await axios.get("http://localhost:5000/api/advancedPrediction",{
      headers:{Authorization:localStorage.getItem("token")}
    });
    setData(res.data);
  }

  return(
    <div>
      <h2>التنبؤ الذكي & EOQ</h2>
      {data.map((p,i)=>(
        <div key={i} style={{marginBottom:40, padding:10, border:"1px solid #ccc"}}>
          <h3>{p.product}</h3>
          <p>متوسط البيع اليومي: {p.avgDaily.toFixed(2)}</p>
          <p>توقع الأسبوع القادم: {p.predictedWeek.toFixed(2)}</p>
          <p>الكمية الاقتصادية للشراء (EOQ): {p.EOQ}</p>
          <p style={{color:p.lowStock?"red":"green"}}>المخزون المتوقع بعد الأسبوع: {p.predictedStockEnd.toFixed(2)}</p>
          <BarChart width={500} height={200} data={[{name:"توقع أسبوع", value:p.predictedWeek},{name:"EOQ", value:p.EOQ},{name:"المخزون الحالي", value:p.predictedStockEnd}]}>
            <XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="value" fill="#8884d8"/>
          </BarChart>
        </div>
      ))}
    </div>
  );
}