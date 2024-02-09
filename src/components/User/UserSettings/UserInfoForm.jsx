import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import {Context} from '../../../main'
import { useFormik } from "formik";
import Swal from "sweetalert2";

const UserInfoForm = () => {
  const {store} = useContext(Context)
  
  const formik = useFormik({
    initialValues: {
      name: store.user.name,
      surname: store.user.surname,
      userName: store.user.userName, 
      email: store.user.email,
      bio: store.user.bio,
      gender: store.user.gender, 
      isPrivate: store.user.isPrivate
    },
    // validationSchema: 
    onSubmit: async (values, actions) => {
      Swal.fire("Your info updated succesfully!");

      const editedData = new FormData()
      editedData.append('name', values.name)
      editedData.append('surname', values.surname)
      editedData.append('userName', values.userName)
      editedData.append('email', values.email)
      editedData.append('bio', values.bio)
      editedData.append('gender', values.gender)
      editedData.append('isPrivate', values.isPrivate)
    
      console.log(values);
      await store.editDesription(editedData)
      
      actions.resetForm();
    }
    
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-wrapper">
          <div>
            <label style={{marginBottom:'34px'}} htmlFor="name">Name</label>
            <label style={{marginBottom:'34px'}} htmlFor="surname">Surname</label>
            <label style={{marginBottom:'34px'}} htmlFor="username">Username</label>
            <label style={{marginBottom:'34px'}} htmlFor="email">Email</label>
            <label style={{marginBottom:'34px'}} htmlFor="bio">Bio</label>
            <label style={{marginBottom:'34px'}} htmlFor="gender">Gender</label>
            <label htmlFor="isPravite">Private Account</label>
          </div>

          <div>
            <input style={{marginBottom:'26px'}} id="name" name="name" type="text" placeholder={store.user.name} value={formik.values.name} onChange={formik.handleChange} />
            <input style={{marginBottom:'26px'}} id="surname" name="surname" type="text" placeholder={store.user.surname} value={formik.values.surname} onChange={formik.handleChange} />
            <input style={{marginBottom:'26px'}} id="userName" name="userName" type="text" placeholder={store.user.userName} value={formik.values.userName} onChange={formik.handleChange} />
            <input style={{marginBottom:'26px'}} id="email" name="email" type="email"  placeholder={store.user.email} value={formik.values.email} onChange={formik.handleChange} />
            <textarea style={{marginBottom:'26px'}} id="bio" name="bio" placeholder={store.user.bio} values={formik.values.bio} onChange={formik.handleChange} />
            <select style={{marginBottom:'26px'}} name="gender" id="gender" defaultValue={store.user.gender} values={formik.values.gender} onChange={formik.handleChange} >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="None">None</option>
            </select>
            <input type='checkbox' id='isPrivate' name='isPrivate' value={formik.values.isPrivate} onChange={formik.handleChange} />
          </div>
        </div>

        <div className="button-wrapper">
          <button className="white" type="reset">
            cancel
          </button>
          <button className="blue" type="submit">
            save
          </button>
        </div>
      </form>
    </div>
  );
};

export default observer(UserInfoForm);
