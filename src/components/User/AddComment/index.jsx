import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../../../main";
import { useFormik } from "formik";
import CommentvalidationSchema from "../../../validations/CommentvalidationSchema";
import Swal from "sweetalert2";

const AddComment = ({postId}) => {
    const {store} = useContext(Context)

    const formik = useFormik({
        initialValues: {
            text: "", 
        },
        validationSchema: CommentvalidationSchema,
        onSubmit: async (values, actions) => {
            if( values.text=== "" && values.text.trim() === ""){
                console.log(values.text); 
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Comment can not be blank'
                });
            }else{
                const newData = {
                    id: postId,
                    text: values.text
                }
                console.log(newData); 
                await store.postComment(newData)
                formik.resetForm();
            }
        },
    });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
        <Avatar src={store.user.imageUrl} />
        <input id='text' name='text' value={formik.text} onChange={formik.handleChange} placeholder="Add Comment...." type="text" />
        </div>
        <button type='submit'>Comment</button>
      </form>
    </>
  );
};

export default observer(AddComment);
