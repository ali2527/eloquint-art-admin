import React from "react";
import AuthLayout from "../../components/AuthLayout";
import {
    Col,
    Row,
    Typography,
    List,
    Form,
    Layout,
    Input,
    Button,
    Checkbox,
    Tabs,
    Table,
    Image,
    Divider,
  } from "antd";
  import { useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux'
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants";
import {addUser , removeUser} from '../../redux/slice/authSlice'
import swal from "sweetalert";
import logo from "../../assets/images/logo-login.png"


// import router from "next/router";

function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData)
  const token = useSelector(state => state.user.userToken)
  const [loading, setLoading] = React.useState(false);



  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      password: values.password,
    };

    Post(AUTH.signin, data).then((response) => {
      setLoading(false);
      console.log("response",response);
      if (response?.data?.status) {  
        dispatch(addUser({ user: response?.data?.data?.user, token: response?.data?.data?.token }));
        navigate("/", { replace: true })
      } else {
       
        swal("Oops!",response?.message || response?.data?.message || response?.response?.data?.message, "error")
      }
    }).catch(e=>{
      console.log(":::;",e)
      setLoading(false);
    });

  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <AuthLayout
      head={{ title: "User Management", description: "Some Description." }}
    >
      {/* <Layout style={{ backgroundColor: "#fff", minHeight: "100vh" }}>
        <Row>
          <Col xs={24} md={12} className="formMainWrap" >
            <Row
              style={{
                position: "absolute",
                top: 0,
                left: 50,
                padding: "30px 60px",
                textAlign: "left",
              }}
            >
              <Col xs={0} md={24}>
                <Image src={"/images/logo.png"} alt="" preview={false} />
              </Col>
            </Row>

            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={20} md={20} className="formWrap">
                <Row style={{ width: "100%", textAlign: "center" }}>
                  <Col xs={24} md={0}>
                    <Image
                      src={"/images/logo.png"}
                      style={{ maxWidth: "200px" }}
                      alt=""
                      preview={false}
                    />
                  </Col>
                </Row>

                <h2 class="authFormHeading">Sign In</h2>
                <p>Enter Your Email Address to Sign In</p>
                <br />
                <Form
                  layout="vertical"
                  name="basic"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email Address"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input valid email!",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Email Address"
                      style={{
                        borderRadius: "100px",
                        background: "white",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                      {
                        type: "string",
                        min: 8,
                        message: "password must be atleast 8 characters!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Enter Password"
                      style={{
                        borderRadius: "100px",
                        fontSize: "14px",
                        padding: "10px 20px",
                      }}
                    />
                  </Form.Item>
                  <Row>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox>Remember me</Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button
                        type="link"
                        style={{
                          float: "right",
                          color: "#3d1c6f",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                        // onClick={() => router.push("/forget-password-1")}
                      >
                        Forgot Password?
                      </Button>
                    </Col>
                  </Row>
                  <br />

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      style={{
                        fontSize: "16px",
                        backgroundColor: "#3d1c6f",
                        padding: "10px",
                        height: "auto",
                        borderRadius: "100px",
                      }}
                    >
                     {loading ? "Loading..." :  "Sign In"}
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Col>
          <Col xs={0} sm={0} md={12}>
            <div
              className="loginScreenContentWrapper"
              style={{ position: "relative" }}
            >
              <div class="loginScreenContent">
                <h2 class="authHeading">Explore Your Services</h2>
                <p class="text-white">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.Lorem Ipsum is simply dummy text of the
                  printing a
                </p>
              </div>
            
            </div>
          </Col>
        </Row>
      </Layout> */}
        <Layout className="AuthBackground" style={{ minHeight: "100vh" }}>
       <Row justify={"center"}>
       <Col xs={24} sm={22} md={16}>
       <Row style={{height:"80vh"}}>
        <Col xs={0} sm={0} md={12} className="authImageBox">
        </Col>

        <Col xs={24} md={12}>
          <div className="authFormBox">
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={20} md={20} className="formWrap">
                <Row style={{ width: "100%", textAlign: "center",justifyContent:"center" }}>
                <Image
                      src={logo}

                      alt=""
                      preview={false}
                    />
                </Row>
                <br />
                <br />
                <h5 className="e-text" style={{textAlign:"center"}}>Login</h5>
                <br />
                <br />
                <Form
                  layout="vertical"
                  name="basic"
                  className="loginForm"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email Address*"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input valid email!",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Email Address"
                      className="AuthFormInput"
                     
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password*"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                    
                      placeholder="Enter Password"
                      className="AuthFormInput"
                    />
                  </Form.Item>
                  <Row>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0, color: "white" }}
                      >
                        <Checkbox style={{ marginBottom: 0, color: "black" }}>
                          {" "}
                          <p className="fontFamily1" style={{ margin: 0 }}>
                            Remember Me
                          </p>
                        </Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button
                        type="link"
                        style={{
                          float: "right",
                          color: "black",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        <p className="fontFamily1" style={{ margin: 0 }}>
                          Forgot Password?
                        </p>
                      </Button>
                    </Col>
                  </Row>
                  <br />

                  <Row justify={"center"}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                    >
                      {loading ? "Loading..." : "Login"}
                    </Button>
                  </Form.Item>
</Row>

                 
                </Form>

                <Row justify={"center"}>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "black",
                    justifyContent:"center",
                    textAlign: "center",
                    marginTop: 0,
                    marginBottom: 30,
                  }}
                >
                  <><span onClick={()=> navigate("/")} style={{cursor:'pointer',fontWeight:'bold',textDecoration:"underline"}}>Back to Website</span></>
                </Typography.Text>
                </Row>

              </Col>
            </Row>
          </div>
        </Col>
      </Row>
       </Col>
       </Row>
     
    </Layout>
    </AuthLayout>
  );
}

export default Signin;
