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
  Upload,
  Image,
  message,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined,LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { UPLOAD_URL, CATEGORIES } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import {AiFillPlusCircle} from 'react-icons/ai'
import { useSelector } from "react-redux";

function CategoryDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { type, id } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [category, setCategory] = useState(null);
  const [formData, setFormData] = useState({
    picture: null,
    image : null,
  });

  useEffect(() => {
    getCategory();
  }, []);

  const uploadButton = (
    <div >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const getCategory = async () => {
    setLoading(true);
    const _category = await Get(`${CATEGORIES.getOne}${id}`, token);

    //loop through the services and take out the service_type names
    const _services = _category?.services?.map((service) => service.service_type.name);
    _category.newServices = _services;
    //remove duplicate service types
    _category.newServices = [...new Set(_category.newServices)];

    //convert this array of string to array of objects
    _category.newServices = _category.newServices.map((service) => {
      return { name: service, services: [] };
    });


    //loop through the services and add them to the respective service type
    _category.newServices.forEach((serviceType) => {
      _category.services.forEach((service) => {
        if (service.service_type.name === serviceType.name) {
          serviceType.services.push(service);
        }
      });
    });




    setCategory(_category);
    setLoading(false);
  };

  const updateCategory = () => {
    const formObject = new FormData();  
    
    if(formData.picture){
      formObject.append("cat_image", formData.image);
    }
    formObject.append("name", category.name);

    Post(`${CATEGORIES.edit}${id}`,formObject, token).then((response) => {
      console.log(response);
      if (response.status) {
          message.success('Category updated successfully!')
          navigate(-1)
      }
      else {
          message.error(response.message)
      }
  })




    console.log(formData);
  }


console.log("cat",category)

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
              Category Details
            </h1>
          </Col>
        </Row>
        <br />

        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {/* ==================================================== View Mode =====================================================  */}
        {!loading && category && type == "view" && (
          <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                {category?.image ? (
                  <Image
                    src={UPLOAD_URL + category.image}
                    preview={false}
                    style={{
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "200px",
                    }}
                  />
                ) : (
                  <Avatar
                    size={100}
                    icon={<UserOutlined />}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                )}
              </Col>
            </Row>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 0,
                    textTransform: "capitalize",
                  }}
                >
                  Category Name
                </h5>
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    fontWeight: "normal",
                    textTransform: "capitalize",
                  }}
                >
                  {category?.name}
                </h5>
              </Col>
            </Row>

            {category?.newServices?.map((serviceType) => (
              <>
                <Row style={{ padding: "10px 20px" }}>
                  <Col
                    xs={24}
                    md={12}
                    style={{
                      display: "flex",
                      alignItems: "left",
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      className="pageTitle"
                      style={{
                        fontSize: "16px",
                        margin: 0,
                        textTransform: "capitalize",
                      }}
                    >
                      {serviceType?.name + " Services"}
                    </h5>

                    {serviceType?.services?.map((service) => (
                      <h5
                        className="pageTitle"
                        style={{
                          fontSize: "16px",
                          fontWeight: "normal",
                          textTransform: "capitalize",
                        }}
                      >
                        {service.name}
                      </h5>
                    ))}
                  </Col>
                </Row>
              </>
            ))}
          </>
        )}

        {/* ==================================================== Edit Mode =====================================================  */}
        {!loading && category && type == "edit" && (
          <>
            <Row style={{ padding: "10px 30px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Upload
                  name="avatar"
                  listType="picture-circle"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={(file, fileList) => {
                    setFormData({ ...formData, picture:fileList[0],image:file})
                    setCategory({ ...category, image: file });
                    return false;
                }}
               
                >
                
                  {formData?.image ? (
                    <Image
                      src={URL.createObjectURL(formData?.image)}
                      preview={false}
                      style={{
                        boxShadow:
                          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                        width: "150px",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "200px",
                      }}
                    />
                  ) : (
                    category?.image ? (
                      <Image
                        src={UPLOAD_URL + category.image}
                        preview={false}
                        style={{
                          boxShadow:
                            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "200px",
                        }}
                      />):(
                    uploadButton
                  )
                  )}
                </Upload>
              </Col>
            </Row>
            <br />
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={8}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                  }}
                >
                  Category Name
                </h5>
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Category Name"
                  value={category?.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                />
              </Col>
            </Row>

            {category?.newServices?.map((serviceType) => (
              <>
                <Row style={{ padding: "10px 20px" }}>
                  <Col
                    xs={24}
                    md={8}
                    style={{
                      display: "flex",
                      alignItems: "left",
                      flexDirection: "column",
                    }}
                  >
                    <h5
                      className="pageTitle"
                      style={{
                        fontSize: "16px",
                        marginBottom: 10,
                        textTransform: "capitalize",
                      }}
                    >
                      {serviceType?.name + " Services"}
                    </h5>

                    {serviceType?.services?.map((service) => (
                      <Input
                        style={{ width: "100%", marginBottom: "10px" }}
                        className="mainInput dashInput"
                        placeholder="Category Name"
                        value={service.name}
                        disabled
                      />
                    ))}

                    <Button
                      type="link"
                      style={{
                        fontSize: "14px",
                        margin: 0,
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: "#0d6efd",
                        textTransform: "capitalize",
                      }}
                    >
                      Add Service &nbsp;
                      <AiFillPlusCircle style={{ fontSize: "20px" }} />
                    </Button>

                  </Col>
                </Row>
              </>
            ))}

            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => updateCategory()}
            >
              Update
            </Button>
          </>
        )}

        <br />
        <br />
      </div>
      <br />
      <br />
    </Layout>
  );
}
export default CategoryDetails;
