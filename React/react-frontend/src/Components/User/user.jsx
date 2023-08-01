import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/navbar";
import Modal from "react-modal";
import "./user.css";

const User = () => {
  // To check if update a particular data or create new data , check 'id'
  const { _id } = useParams();

  // set all input fields and their error states
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [gender, setGender] = useState("Male");
  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureError, setProfilePictureError] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (_id) {
      updateUserData();
    }
  }, []);

  const navigate = useNavigate();
  const options = ["Select a Category", "General", "SC", "ST", "OBC"];

  let subtitle;

  // set style of modal
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "50vw",
      transform: "translate(-50%, -50%)",
      alignItem: "center",
      borderRadius: "5vw",
    },
  };

  // set radio options
  const onOptionChange = (e) => {
    setGender(e.target.value);
  };

  // get profile pic url
  const addProfilePic = (e) => {
    setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  // on getting 'id', update data
  const updateUserData = async () => {
    try {
      // get particular user data i.e. to be updated
      const response = await axios.get(`http://localhost:5000/record/${_id}`);
      const objRecord = response.data;

      // set input fields to get data from user i.e. to be updated else throw error
      setName(objRecord.name);
      setEmail(objRecord.email);
      setPassword(objRecord.password);
      setMobile(objRecord.mobile);
      setGender(objRecord.gender);
      setCategory(objRecord.category);
      setProfilePicture(objRecord.profilePicture);

    } catch (error) {
      throw new Error("Invalid Request");
    }
  };

  // on 'submit' in modal
  const submitModal = async (e) => {
    e.preventDefault();

    const objRecord = {
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      gender: gender,
      category: category,
      profilePicture: profilePicture,
    };

    try {
      // update if 'id' is get else post request
      if (_id) {
        await axios.put(`http://localhost:5000/record/${_id}`, objRecord).then((res) => res.data);
      } else {
        await axios.post("http://localhost:5000/record/", objRecord).then((res) => res.data);
      }
      navigate("/users/view");
    } catch (error) {
      console.log("Invalid Request")
    }

    closeModal();
  };

  // submit form if all validations of input fields are passed

  const submitForm = (e) => {
    e.preventDefault();

    validateName();
    validateEmail();
    validatePassword();
    validateMobile();
    validateCategory();
    validateProfilePicture();

    const isFormValid =
      nameError === "" &&
      emailError === "" &&
      passwordError === "" &&
      mobileError === "" &&
      categoryError === "" &&
      profilePictureError === "";

    if (isFormValid) {
      openModal();
    }
  };

  // validate name
  const validateName = () => {
    if (name.trim() === "") {
      setNameError("Name is required");
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      setNameError("Name should contain letters and spaces only");
    } else {
      setNameError("");
    }
  };

  
  // validate email
  const validateEmail = () => {
    if (email.trim() === "") {
      setEmailError("Email is required");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Email is invalid");
    } else {
      setEmailError("");
    }
  };

  // validate password
  const validatePassword = () => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  // validate mobile number
  const validateMobile = () => {
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobile number is invalid");
    } else {
      setMobileError("");
    }
  };

  // validate category
  const validateCategory = () => {
    if (category.trim() === "" || category === "Select a Category") {
      setCategoryError("Category is required");
    } else {
      setCategoryError("");
    }
  };

  // validate profile picture
  const validateProfilePicture = () => {
    if (!profilePicture) {
      setProfilePictureError("Profile picture is required (.jpeg / .jpg / .png)");
    } else {
      setProfilePictureError("");
    }
  };

  
  // to open modal
  function openModal() {
    setIsOpen(true);
  }
// to set style after open modal
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  // to close modal
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Navbar />
      <div className="main-container">
        <form className="form-container">
          <div className="input-field">
            <div className="field-div">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                placeholder="enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                  validateName();
                }}
                value={name}
              />
              {nameError && <p className="error">{nameError}</p>}
            </div>
            <div className="field-div">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail();
                }}
                value={email}
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>
            <div className="field-div">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword();
                }}
                value={password}
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>
            <div className="field-div">
              <label htmlFor="mobile">Mobile No.</label>
              <input
                type="number"
                placeholder="enter mobile number"
                onChange={(e) => {
                  setMobile(e.target.value);
                  validateMobile();
                }}
                value={mobile}
              />
              {mobileError && <p className="error">{mobileError}</p>}
            </div>
            <div className="field-div">
              <label htmlFor="gender">Gender</label>
              <input
                type="radio"
                name="gender"
                value="Male"
                id="Male"
                className="radio"
                onChange={onOptionChange}
                checked={gender === "Male"}
              />
              <label htmlFor="male" >Male</label>
              <input
                type="radio"
                name="gender"
                value="Female"
                id="Female"
                className="radio"
                onChange={onOptionChange}
                checked={gender === "Female"}
              />
              <label htmlFor="female" >Female</label>
            </div>
            <div className="field-div">
              <label htmlFor="category">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {options.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </select>
              {categoryError && <p className="error">{categoryError}</p>}
            </div>
            <div className="field-div">
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                placeholder="enter file"
                defaultValue={profilePicture}
                onChange={addProfilePic}
                required
              />
              {profilePictureError && <p className="error">{profilePictureError}</p>}
            </div>
          </div>
          <div className="button-container">
            <button onClick={submitForm} className="submit-button">
              Preview
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div className="editable">
          <h2 className="card-head" ref={(_subtitle) => (subtitle = _subtitle)}>
            User Details
          </h2>
          <p>
            <span>Name :</span> {name}
          </p>
          <p>
            <span>Email : </span>
            {email}
          </p>
          <p>
            <span>Password :</span> {password}
          </p>
          <p>
            <span>Mobile :</span> {mobile}
          </p>
          <p>
            <span>Gender :</span> {gender}
          </p>
          <p>
            <span>Category : </span>
            {category}
          </p>
          <p>
            <span> Profile Picture :</span>{" "}
            <img src={profilePicture} height="100vh" width="100vw" alt="no_profile_picture" />
          </p>
        </div>
        <button className="btn btn-primary close-button" onClick={closeModal}>
          Close
        </button>
        <button className="btn btn-primary submit-button" onClick={submitModal}>
          Submit
        </button>
      </Modal>
    </>
  );
};

export default User;
