// import React, { useEffect, useState } from 'react';
// import './SelectOption.css';
// import axios from 'axios';
// const SelectOption = (props) => {
//     const [data, setData]= useState([]);
//     const [showSelect, setShowSelect]= useState(false);
//     let url=props.condition==="Card Build-Scale" && "/bulid/scale/get" || props.condition==="Calculation" && "/calculation/get" || props.condition==="Animate" && "/animated/get" || props.condition==="Driving Animated" && "/driving/animate/get" || props.condition==="Animate Card" && "/animated/card/get"; 
    

     
//     const fetchData=async()=>{
//       try {
//         const res= await axios.get(url);
//         if(res.status===200){
//         setData(res.data.responseData);  
//         setShowSelect(true);
//         }
//       } catch (error) {
//         console.log(error)
//       }  
          
//     }

//     const handleOptionClick = (curElm) => {
//        console.log('curelm', curElm);
//     };


//     useEffect(()=>{
//      fetchData();
//      if(props.condition==="Hero Section"){
//         setShowSelect(false);
//      }

//     },[props.condition, url])
//   return (
//     <div className='selectWrapper'>
//    { showSelect &&
//     <div>
//         <select name="" id="">
//         {
//             data?.map((curElm, index)=> <option value={curElm}  
//             onClick={() => handleOptionClick(index)} key={curElm.id}>{curElm.title} </option>)
//         }
//         </select>
//         </div>
//     }
//     </div>
//   )
// }

// export default SelectOption;




import React  from 'react';
import './SelectOption.css';

const SelectOption = (props) => {
  

  return (
    <div className="selectWrapper">
      {props.showSelect && (
        <div>
          <select name="" id="" onChange={props.optionChange}>
            <option>Select </option>
            {props.data?.map((curElm) => (
              <option value={curElm._id} key={curElm._id}>
                {curElm.title}
              </option>
            ))}
          </select>
        </div>
      )}
     
    </div>
  );
};

export default SelectOption;











