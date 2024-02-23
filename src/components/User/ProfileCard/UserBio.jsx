import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../../main";
import { FollowContext } from "../../../context";

import { useFormik } from "formik";
import Swal from "sweetalert2";

const UserBio = () => {
  const { store } = useContext(Context);
  const {fetchedUser, setFetchedUser} = useContext(FollowContext)

  const [showInput, setShowInput] = useState(false)


  const formik = useFormik({
    initialValues: {
      bio: store.user?.bio,
    },
    // validationSchema: 
    onSubmit: async (values, actions) => {
      if(values.bio == store.user?.bio){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Bio did not change!",
        });
      }else{
        const editedData = new FormData()
        editedData.append('bio', values.bio)
        setFetchedUser({...fetchedUser, bio: values.bio})
        const res = await store.editBio(editedData)
        setShowInput(false)
      }
    }
  });

  return (
    <div className="decr">
      <form onSubmit={formik.handleSubmit}>
        {
          showInput ? <input type="text" id='bio' name='bio' value={formik.values.bio} onChange={formik.handleChange}/>
          : <p>{fetchedUser?.bio}</p>
        }
        {fetchedUser?.userName == store.user.userName && 
          showInput &&
          <>
           <button type='submit'>save</button> 
           <button type='reset' onClick={()=>setShowInput(false)}>cancel</button> 
          </>
        }
      </form>
      {
        fetchedUser?.userName == store.user.userName && !showInput && <button type='button' onClick={()=>setShowInput(true)}>Edit</button>
      }
    </div>
  );
};

export default observer(UserBio);
