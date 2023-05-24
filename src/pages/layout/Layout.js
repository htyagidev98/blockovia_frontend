import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Sidebar from '../../common/Sidebar'
import Admin from '../Admin'
import AdminDashboard from '../AdminDashboard'
import './Layout.css'

const Layout = () => {
  const [editorTogel, setEditorTogel]= useState(false);
  const [heading,setHeading]=useState();

  const RederedForm=async(data)=>{
    setHeading(data.subMenuName);
    setEditorTogel(true);
  }
  return (
    <div className="layout_wrapper">
       
       <aside className='sideBar'>
         <Sidebar showForm={RederedForm} />
       </aside>
     
       <main className='main'>
        <div className='innermain'>
      
       <AdminDashboard />
       {
        editorTogel &&
         <Admin heading={heading} />
       } 
       </div>
 
       </main>
      
    
    </div>
  )
}

export default Layout