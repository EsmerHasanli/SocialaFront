import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../../main';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EmailConfirmationPage = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search);
    useEffect(()=>{
        async function confirmEmail(){
            const formData = new FormData();
            formData.append("token", queryParams.get("token"))
            formData.append("email", queryParams.get("email"))
          
            const data = await store.confirmEmail(formData);
            if (typeof data === 'string') {
                navigate(`/users/${data}`);
            }
            else {
              navigate(`/login`);
              Swal.fire({
                icon: "error",
                title: "Oops, something went wrong!",
                text: data?.message,
              });
            }

          }
        if (!store.isAuth)
        confirmEmail();
    },[])

  return (
    <div>wait ...</div>
  )
}

export default observer(EmailConfirmationPage)