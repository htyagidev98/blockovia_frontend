import React, { useEffect, useState } from 'react'
import Editor from '../editor/Editor'
import './Admin.css'
import SelectOption from '../common/SelectOption'
import axios from 'axios'
const Admin = (props) => {
  const [data, setData] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [filterData, setFilterData]= useState({}) 
  const [objectData, setObjectData]= useState({})


  // Get url for array of doccument

  let url = 
  (props.heading === 'Card Build-Scale' && '/bulid/scale/get') ||
  (props.heading === 'Calculation' && '/calculation/get') ||
  (props.heading === 'Animate' && '/animated/get') ||
  (props.heading === 'Driving Animated' && '/driving/animate/get') ||
  (props.heading === 'Animate Card' && '/animated/card/get');


const fetchData = async () => {
  try {
    const res = await axios.get(url);
    if (res.status === 200) {
      setData(res.data.responseData);
      console.log("multiple data", res.data.responseData)
      setShowSelect(true);
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchData();
  if (props.heading === 'Hero Section') {
    setShowSelect(false);
  }
}, [props.heading, url]);

  const handleOptionChange = async(event) => {
    try {
      const response= await axios.get(`/bulid/scale/get/id?_id=${event.target.value}`)
      setFilterData(response.data.contentlist)

    } catch (error) {
      console.log(error)
    }

   
  };




// Get url for single object   

  let getUrl= (props.heading === 'Hero Section' && '/hero/content/get' || props.heading==="Building and Blockchain" && '/blockchain/get' )

  const RederedForm=async()=>{
      try {
      const response= await axios.get(getUrl)
      setObjectData(response.data.responseData)
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{
    RederedForm()
  }, [props.heading, getUrl])

  return (
    <div className='custom-block'>
     <div className="d-flex justify-content-between">
       <h2>{props.heading}</h2>
        <SelectOption  optionChange={handleOptionChange} data={data} showSelect={showSelect} />
       </div>
      <Editor condition={props.heading} filterdata={filterData} objectData={objectData} />
    </div>
  )
}

export default Admin;