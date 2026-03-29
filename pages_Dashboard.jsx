import { useEffect,useState } from "react";
import axios from "axios";

export default function Dashboard(){
  const [data,setData] = useState({});
  useEffect(()=>{fetchData()},[]);
  const fetchData = async()=>{
    const res = await axios.get("http://localhost:5000/api/dashboard",{
      headers:{Authorization:localStorage.getItem("token")}
    });
    setData(res.data);
  }

  return(
    <div>
      <h2>لوحة المعلومات</h2>
      <p>عدد المنتجات: {data.totalProducts}</p>
      <p>المخزون المنخفض: {data.lowStock}</p>
      <p>إجمالي المبيعات: {data.totalSales}</p>
    </div>
  );
}