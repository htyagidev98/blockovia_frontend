import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { toast } from 'react-toastify';
import './Editor.css'
const Editor = (props) => {
  const [formData, setFormData] = useState({
    id:"",
    title: "",
    paragraph: "",
    button: "",
    image: "",
  });


  // console.log('objheroDATA', props.objectData.image_url);

  const {id}= formData;
   
  // Update Url 

  let url = props.condition === "Hero Section" && "/hero/content/update"  || props.condition === "Card Build-Scale" && "/bulid/scale/update" || props.condition==="Building and Blockchain" && "/blockchain/content/update";

  const { title, paragraph, button, image } = formData;
  // const featuredPayload = { title, image };
  const heroPayload = { title, paragraph, button, image }
  const cardBuildPayload={title, paragraph, button}
  const blockchainPayload={title, button, image}
  let payloadData = props.condition === "Card Build-Scale" && cardBuildPayload || props.condition === "Hero Section" && heroPayload || props.condition==="Building and Blockchain" &&blockchainPayload;
  
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };




  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageFile,
    }));
  };


  const handleSubmit=async(e)=>{
     e.preventDefault();
  
  try {
    const result = await axios.put(`${url}?_id=${id}`, payloadData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    console.log('res', result)


    setFormData({
      id:"",
      title: "",
      paragraph: "",
      button: "",
      image: "",
    })
    
  } catch (error) {
   console.log(error);
  }

}









 
  useEffect(() => {
    if (props.filterdata != null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: props.filterdata._id || "",
        title: props.filterdata.title || "",
        paragraph: props.filterdata.paragraph || "",
        button: props.filterdata.button || "",
      }));
    }
  }, [props.filterdata]);

  useEffect(()=>{
    if (props.objectData!= null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: props.objectData?._id || "",
        title: props.objectData?.title || "",
        paragraph: props.objectData?.paragraph || "",
        button: props.objectData?.button || "",
        image: props.objectData?.image_url || "",
      }));
    }
  }, [props.objectData, props.condition])

  return (
    <div className="form_container">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.title}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    title: data,
                  }));
                }}
              />
            </div>
          

          {props.condition != "Featured" && props.condition != "Network and upgrade" && props.condition != "Footprint" && props.condition != "Driving Animated" && props.condition != "Building and Blockchain" &&  (
            <div className="form-group">
              <label htmlFor="paragraph">Paragraph</label>
              <CKEditor
                editor={ClassicEditor}
                data={formData.paragraph}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    paragraph: data,
                  }));
                }}
              />
            </div>
          )}

          {props.condition != "Featured" &&
            props.condition != "Calculation" && props.condition != "Driving Animated" && (
              <div className="form-group">
                <label htmlFor="button">Button Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="button"
                  id="button"
                  value={formData.button}
                  onChange={handleInputChange}
                />
              </div>
            )}

          {props.condition != "Card Build-Scale" &&
            props.condition != "Calculation" && props.condition != "Application" && props.condition != "Driving Text" && (
              <div className="form-group">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  className="form-control"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                
                  
                />
              </div>
            )}
            <div className="database_image mt-2">
              {/* {
                props.objectData &&
              
             <img src={props.objectData.image_url}/>
              }   */}
            </div>
            
          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editor;
