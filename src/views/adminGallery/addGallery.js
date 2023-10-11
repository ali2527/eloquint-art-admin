import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Upload,
  InputNumber,
  Skeleton,
  message,
} from "antd";
import { InboxOutlined } from '@ant-design/icons';
import swal from "sweetalert";

import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOAD_URL, SUBSCRIPTION,GALLERY,CONTENT_TYPE } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const { Dragger } = Upload;



function GalleryAdd() {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({});
  const [newImage,setNewImage] = useState()

  const { mode,id } = useParams();
  const [subscriptions, setSubscriptions] = useState({});




  const handleStatus = async () => {
    try {
      const response = await Get(
        SUBSCRIPTION.toggleStatus + "/" + subscriptions._id,
        token,
        {}
      );
      const newUser = { ...subscriptions };

      newUser.isActive = !subscriptions.isActive;
      setModalOpen(false);
      setSubscriptions(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOk = () => {
    const formObject = new FormData();

    if(!newImage){
        swal("Error", "Image is Required",'error');
        return;
    }

    formObject.append("image",newImage);

    Post(GALLERY.addAdminGallery,formObject,token,null,CONTENT_TYPE.FORM_DATA)
    .then((response) => {
      setLoading(false);
      if (response?.data?.status) { 
        swal("Success!", "Image Added Successfully", "success");
        navigate(-1);
        setLoading(false);
        setNewImage()
      } else {
        swal("Oops!", response.data.message, "error");
      }
    })
    .catch((e) => {

      setLoading(false);
    });
  };

  return (
    <Layout className="configuration">
      <div className="boxDetails">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
           Add Gallery Image
            </h1>
          </Col>
        </Row>
        <br />

    

    
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={10}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
               <Dragger
          showUploadList={false}
            beforeUpload={(file) => {
              setNewImage(file);
              return false;
            }}
          >
            {!newImage ? <>
                <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
            </> : <Image src={URL.createObjectURL(newImage)} preview={false} style={{width:"400px",height:"400px",objectFit:"cover"}} />}
          
          </Dragger>
              
              </Col>
            </Row>

            <Row style={{ padding: "20px 20px" }}>
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() =>   handleOk()}
            >
               Add Image
            </Button>
            </Row>
      



        <br />
        <br />
      </div>


      <br />
      <br />
    </Layout>
  );
}
export default GalleryAdd;
