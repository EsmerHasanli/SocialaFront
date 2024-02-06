import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect } from 'react'
import { Context } from '../../../main';
import { useNavigate, useParams } from 'react-router-dom';

const EmailConfirmationPage = () => {
    const { store } = useContext(Context);
    const navigate = useNavigate()
    const {token, email} = useParams()

    useEffect(()=>{
        async function confirmEmail(){
            const username = await store.confirmEmail({token, email});
            console.log("confirm successful:", username);
            if (username) {
                navigate(`/users/${username}`);
            }
        }
        confirmEmail();
    },[])

  return (
    <div>wait ...</div>
  )
}

export default observer(EmailConfirmationPage)