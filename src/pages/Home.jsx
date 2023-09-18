import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateJob, updateTotalJob } from "../states/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const data = useSelector((state) => state.user.jobSearchResult);
  const pastsearch = useSelector((state) => state.user.search);
  const [loading, setLoading] = useState(false);
  const [job,setjob] = useState()
  const nameRef = useRef();
  const app_id = import.meta.env.VITE_jobApiId;
  const app_key = import.meta.env.VITE_jobApiKey;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(()=>{
    if(Object.keys(data).length>0){
      setjob(data);
      nameRef.current.value = pastsearch
    }
  },[])
  const handleSubmit = async ()=>{
    setLoading(true)
    const res = await axios.get(
      `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=20&what=${nameRef.current.value}&content-type=application/json`
    );
    setLoading(false)
    setjob(res.data.results)
    dispatch(updateTotalJob({data:res.data.results,search:nameRef.current.value}))
  }
  const detailPage = (idx)=>{
    console.log("The Selected Job",job[idx])
    dispatch(updateJob({data:job[idx]}))
    navigate("/job_description");
  }
  return (
    <div className="w-[85%] md:w-2/3 flex flex-col mx-auto gap-5 ">
      <h1 className=" text-2xl font-bold md:text-4xl text-center">Search the Job You like</h1>
      <div className="flex gap-2 sm:gap-4 ">
        <input
          type="text"
          className="bg-slate-100 p-2 text-base sm:text-lg w-full"
          ref={nameRef}
        />
        <button
          className="bg-green-600 px-2 sm:px-3 py-1 text-gray-100 rounded-lg text-base sm:text-lg"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {job ? (
        <div className="bg-gray-100 p-3 sm:p-7 rounded-lg text-black flex gap-2 flex-col w-full">
        {job.map((j, idx) => {
            return (
              <div
                key={idx}
                className="p-1 sm:p-3 w-full m-auto flex justify-between items-center bg-white"
              >
                <p>
                  {j.company.display_name} ({j.title})
                </p>
                <button className="bg-orange-400 px-3 py-2 text-base text-white rounded-xl" onClick={()=>detailPage(idx)}>Apply</button>
              </div>
            );
        })}</div>
      ) : (loading?<div className="bg-gray-100 p-7 rounded-lg text-black">Loading...</div>:
        <div className="bg-gray-100 p-7 rounded-lg text-black">0</div>
      )}
    </div>
  );
}

export default Home