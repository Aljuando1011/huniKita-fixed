import Navbar from '../components/Navbar'
import {useSelector} from 'react-redux'
import Properti from '../components/Properti'
import Footer from '../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import axios from "axios";
import { API } from '../constant'

const Listiklan = () => {
  const [data, setData] = useState([]);
  const auth = useSelector((state) => state.auth )
  const navigate = useNavigate();

  const fetchData = useCallback(() => {
    axios
    .get(API.GET_PROPERTIES_BY_USER, {params: {page: 1, limit: 10}, headers: {Authorization: 'Bearer ' + auth.token}})
    .then((res) => {
      if (res.status === 200) {
        setData((data) => [...data, ...res.data.data])
      }
    })
    .catch((err) => {
        if (err.response.status == 400) {
          alert(err.response.data.detail)
        } else {
          alert("Server Error! Coba lagi beberapa saat")
        }
    });
  }, [auth?.token])
  
  useEffect(() => {
    if (!auth) {
      navigate('/login');
      return
    }
    fetchData()
  }, [fetchData])

  return (
    <div>
        <Navbar />
      <div className="gap-4 ml-[36px] mt-[44px]">
        <h1 className="text-[36px] font-bold">List Properti Anda</h1>
        <hr className="w-[1274px] h-[2px] bg-gray-300" />
      </div>
      {data.map((item, index)=> (
        <Properti key={index} img_path={item.img_path} name={item.name} address={item.address}/>
      ))}

      <Link to="/form-tambah">
        <div className="w-[274px] h-[62px] justify-center items-center text-white bg-[#4E97D1] flex rounded-[10px] text-[22px] mt-[62px] mx-auto cursor-pointer font-semibold">
          + Tambahkan Iklan
        </div>
      </Link>
      <div className="mt-[100px]">
        <Footer />
      </div>
    </div>
  )
}

export default Listiklan