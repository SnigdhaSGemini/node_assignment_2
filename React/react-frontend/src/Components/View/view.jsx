import React, { useState, useEffect } from 'react';
import './view.css';
import Navbar from '../Navbar/navbar';
import {useNavigate} from "react-router-dom"
import axios from "axios";

const View = () => {
  // To set table data
  const [tableData, setTableData] = useState([]);

  // table head data
  const tableHead = ["Name", "Email", "Gender", "Mobile", "Category", "Profile Picture"];

  // display table headers
  const tableHeadData = tableHead.map((head) => <th>{head}</th>);
  const navigate = useNavigate()

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    // To get all users from database and set it to table data else show invalid request
    try {
      const response = await axios.get("http://localhost:5000/record/");
      const data = response.data;
      setTableData(data);
      console.log(data);
    } catch (error) {
    console.log("Invalid Request")
    }
  }

  const deleteData = async(_id)=>{
        // To delete a user from database. Get updated data from database
        //  and set it to table data else show invalid request
    try{
        const res = await axios.delete(`http://localhost:5000/record/${_id}`)
        const response = await axios.get("http://localhost:5000/record/");
        const data = response.data;
        setTableData(data);
        console.log(data);


    }catch (error) {
        throw new Error("Invalid Request");
      }
  }
  // on click on 'update' , navigate to user component
  const updateData = (_id)=>{
    navigate(`/users/create/${_id}`)
  }

  return (
    <div>
      <Navbar />
      <div className='view-div'>
      <div className='display-data'>
        <table>
          <tr>
            {tableHeadData}
          </tr>
          {tableData.length > 0 ? (
            tableData.map((row,index) => (
              <tr>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.gender}</td>
                <td>{row.mobile}</td>
                <td>{row.category}</td>
                <td><img src={row.profilePicture} height="100vh" width="100vw" alt="no_profile_picture"></img></td>
                <td>
                    <button onClick={()=>updateData(row._id)} className='update' >Update</button>
                    <button onClick={()=>deleteData(row._id)} className='delete'>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr >
              <td colSpan={tableHead.length}>No data</td>
            </tr>
          )}
        </table>
      </div>
      </div>
    </div>
  );
}

export default View;
