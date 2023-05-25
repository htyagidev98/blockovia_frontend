import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { toast } from 'react-toastify';
import './Editor.css';

const Editor = (props) => {
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    paragraph: "",
    button: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);  // New state variable
  const { id } = formData;

  // Update Url 

  let url = props.condition === "Hero Section" && "/hero/content/update" || props.condition === "Card Build-Scale" && "/bulid/scale/update" || props.condition === "Building and Blockchain" && "/blockchain/content/update" || props.condition === "Application" && "/application/update" || props.condition === "Network and upgrade" && "/network/update" || props.condition === "Driving Text" && "/drivingtext/update" || props.condition === "Footprint" && "/footprint/update" || props.condition === "Community" && "/community/update" || props.condition === "Calculation" && "/calculation/content/update" || props.condition === "Animate" && "/animated/update" || props.condition === "Driving Animated" && "/driving/animate/update" || props.condition === "Animate Card" && "/animated/card/update";
   
  //  set the payload data accoding to condiotion

  const { title, paragraph, button, image } = formData;
  // const featuredPayload = { title, image };
  const heroPayload = { title, paragraph, button, image }
  const cardBuildPayload = { title, paragraph, button }
  const blockchainPayload = { title, button, image }
  const applicationPayload = { title, paragraph, button }
  const networkPayload = { title, button, image };
  const drivingTextPayload = { title,paragraph, button };
  const footprintPayload = { title, button, image };
  const communityPayload = { title,paragraph, button, image };
  const calculationPayload={title, paragraph};
  const animatePayload={ title, paragraph, button, image };
  const drivingAnimatePayload={ title, image };
  const animateCardPayload={ title, paragraph, button, image };



  let payloadData = props.condition === "Card Build-Scale" && cardBuildPayload || props.condition === "Hero Section" && heroPayload || props.condition === "Building and Blockchain" && blockchainPayload || props.condition === "Application" && applicationPayload || props.condition === "Network and upgrade" && networkPayload || props.condition === "Driving Text" && drivingTextPayload || props.condition === "Footprint" && footprintPayload || props.condition === "Community" && communityPayload || props.condition === "Calculation" && calculationPayload || props.condition === "Animate" && animatePayload || props.condition === "Driving Animated" && drivingAnimatePayload || props.condition === "Animate Card" && animateCardPayload  ;
  

  //  Show the image url

  let showImageUrl = props.condition === "Hero Section" || props.condition === "Featured" || props.condition === "Building and Blockchain" || props.condition === "Animate" || props.condition === "Network and upgrade" || props.condition === "Driving Animated" || props.condition === "Footprint" || props.condition === "Community" || props.condition === "Animate Card"

  // set header content url base on condition

  let header_formdata = 'multipart/form-data';
  let header_json = "application/json"
  let mainHeaderUrl= showImageUrl ? header_formdata : header_json;


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setSelectedImage(imageFile); // Set the selected image file
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageFile,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.put(`${url}?_id=${id}`, payloadData, {
        headers: {
          'Content-Type': mainHeaderUrl
        }
      });
      console.log('res', result)

      setFormData({
        id: "",
        title: "",
        paragraph: "",
        button: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  // useEfect for filter array

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



  // useEffect for edit data 

  useEffect(() => {
    if (props.objectData != null) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: props.objectData?._id || "",
        title: props.objectData?.title || "",
        paragraph: props.objectData?.paragraph || "",
        button: props.objectData?.button || "",
        image: props.objectData?.image_url || "",
      }));

      if(props.arrayurl){
         setFormData({
          id: "",
          title: "",
          paragraph: "",
          button: "",
          image: "",
         }) 
      }

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

          {props.condition !== "Featured" && props.condition !== "Network and upgrade" && props.condition !== "Footprint" && props.condition !== "Driving Animated" && props.condition !== "Building and Blockchain" && (
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

          {props.condition !== "Featured" &&
            props.condition !== "Calculation" && props.condition !== "Driving Animated" && (
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

          {props.condition !== "Card Build-Scale" &&
            props.condition !== "Calculation" && props.condition !== "Application" && props.condition !== "Driving Text" && (
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
            {selectedImage ? (
              <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" />
            ) : (
              props.objectData.image_url && showImageUrl && <img src={props.objectData.image_url} alt="image_profile" />
            )}
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

