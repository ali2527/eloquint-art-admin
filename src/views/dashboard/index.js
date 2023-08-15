import React, { useState, lazy, Suspense } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Layout,
  Checkbox,
  Tabs,
  Table,
  Select,
  Image,
  Pagination,
} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import img1 from "../../assets/images/trend.png"
import img2 from "../../assets/images/trend2.png"
import img3 from "../../assets/images/trend.png"
import ClientLayout from "../../components/ClientLayout";
import { AiFillApple } from "react-icons/ai";
import { FaCode,FaChartLine } from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import { render } from "react-dom";

ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(PointElement);
ChartJS.register(LineElement);

const data = {
  labels: ["Nov 2015", "March 2016", "July 2017", "August 2018", "Sep 2019", "Oct 2020", "July 2021"],
  datasets: [{
    label: "Users",
    data: [30000, 20000, 30000, 25000, 35000, 49000, 40000],
    fill: true,
    backgroundColor: 'rgba(157,98,245,0.2)',
    borderColor: '#9D62F5',
    pointRadius: 3,
  }]
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Users",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      }
    },
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

const data2 = {
  labels: ["Nov 2015", "March 2016", "July 2017", "August 2018", "Sep 2019", "Oct 2020", "July 2021"],
  datasets: [{
    label: "Users",
    data: [30000, 48000, 30000, 25000, 35000, 40000, 15000],
    fill: true,
    backgroundColor: 'rgba(157,98,245,0.2)',
    borderColor: '#4fc068',
    pointRadius: 3,
  }]
};

const options2 = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Service Providers",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      }
    },
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

const data3 = {
  labels: ["Nov 2015", "March 2016", "July 2017", "August 2018", "Sep 2019", "Oct 2020", "July 2021"],
  datasets: [{
    label: "Users",
    data: [30000, 50000, 30000, 35000, 35000, 40000, 45000],
    fill: true,
    backgroundColor: 'rgba(157,98,245,0.2)',
    borderColor: '#2299db',
    pointRadius: 3,
  }]
};

const options3 = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      title: {
        display: true,
        text: "Service Providers",
        color: "#000000",
      },
      min: 0,
      max: 50000,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      }
    },
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

export default function Home() {
  return (
    <Layout className="configuration">
      <h2 class="text-40">Dashboard</h2>
    {/* ================================ROW ONE START========================================= */}
    <Row gutter={[20, 10]}>
      <Col xs={24} md={8}>
        <div class="boxDetails1 analytics1">
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center",justifyContent:'space-between'  }}
          >
            
            <Col xs={15} md={12}>
              <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
              Users
Registered
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
               2
              </h6>
            </Col>
            <Col xs={0} md={10}>
              <Image
                src={img1}
                alt="Analytics Image"
                preview={false}
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div class="boxDetails1 analytics2">
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent:'space-between'  }}
          >
            <Col xs={15} md={12}>
              <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
               Subscriptions
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
               2
              </h6>
            </Col>
            <Col xs={0} md={10}>
              <Image
                src={img2}
                alt="Analytics Image"
                preview={false}
              />
            </Col>
          </Row>
        </div>
      </Col>
      <Col xs={24} md={8}>
        <div class="boxDetails1 analytics3">
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center",justifyContent:'space-between' }}
          >
            
            <Col xs={15} md={12}>
              <h6 class="gray analyticsTextSmall" style={{ margin: 0 }}>
                Overall Earnings
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
                $ 32,560
              </h6>
            </Col>
            <Col xs={0} md={10}>
              <Image
                src={img3}
                alt="Analytics Image"
                preview={false}
              />
            </Col>
          </Row>
        </div>
      </Col>
    </Row>

    {/* ================================ROW ONE END========================================= */}
    <br />
    {/* ================================ROW TWO START========================================= */}
    <Row gutter={[20, 10]}>
      <Col xs={24}>
        <div class="boxDetails2" style={{ padding: "30px" }}>
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col xs={24} md={12}>
              <h5 class="sectionTitle">New Users</h5>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: "right" }}>
              <Select
                size={'large'}
                className="chartSelectBox"
                defaultValue="monthly"
                // onChange={handleChange}
                style={{
                  width: 200,
                  textAlign: "left",
                }}
                options={[{ value: 'monthly', label: 'Monthly' }, {value :'halfYearly', label:'6 Months'},{ value: 'yearly', label: 'Yearly' }]}
              />
            </Col>
          </Row>
          <Row style={{minHeight:"400px", overflowX:'auto'}}>
            <div style={{minWidth:"600px", width:'100%'}}>
              
          <Line options={options} data={data} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>

    {/* ================================ROW TWO END========================================= */}
    <br />

     {/* ================================ROW Three START========================================= */}
     <Row gutter={[20, 10]}>
      <Col xs={24}>
        <div class="boxDetails2" style={{ padding: "30px" }}>
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col xs={24} md={12}>
              <h5 class="sectionTitle">Earnings</h5>
            </Col>
            <Col xs={24} md={12} style={{ textAlign: "right" }}>
              <Select
                size={'large'}
                className="chartSelectBox"
                defaultValue="monthly"
                // onChange={handleChange}
                style={{
                  width: 200,
                  textAlign: "left",
                }}
                options={[{ value: 'monthly', label: 'Monthly' }, {value :'halfYearly', label:'6 Months'},{ value: 'yearly', label: 'Yearly' }]}
              />
            </Col>
          </Row>
          <Row style={{minHeight:"400px", overflowX:'auto'}}>
            <div style={{minWidth:"600px", width:'100%'}}>
              
          <Line options={options2} data={data2} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>


    {/* ================================ROW Three END========================================= */}
    <br/>
    <br/>

  </Layout>
  );
}
