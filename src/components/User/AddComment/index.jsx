import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Context } from "../../../main";
import { useFormik } from "formik";
import CommentvalidationSchema from "../../../validations/CommentvalidationSchema";
import Swal from "sweetalert2";

const AddComment = ({comments,setComments, post, commentsCount, setCommentsCount}) => {
    const {store} = useContext(Context)
    const formik = useFormik({
        initialValues: {
            text: "", 
        },
        // validationSchema: CommentvalidationSchema,
        onSubmit: async (values, actions) => {
            if(!values.text?.trim()){
                console.log(values.text); 
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: 'Comment can not be blank'
                });
            }else{
                const newData = {
                    id: post.id,
                    text: values.text
                }
                const res = await store.postComment(newData);
                setComments([...comments,{...res}]);
                setCommentsCount(commentsCount+1)
                //const comments = await store.getPostComments(postId)
                
            }
            formik.resetForm();
            actions.resetForm()
            values.text = ''
        },
    });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
        <Avatar src={store.user.imageUrl} />
        <input className="com-inp" id='text' name='text' value={formik.values.text} onChange={formik.handleChange} placeholder="Add Comment...." type="text" />
        </div>
        <button type='submit'>Comment</button>
      </form>
    </>
  );
};

export default observer(AddComment);