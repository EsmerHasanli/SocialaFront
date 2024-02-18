import { Input } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '../../../main'
import { Button } from '@mui/material'
import { useFormik } from 'formik'

const Searchusers = ({searchedUsers, setSearchedUsers}) => {
  const { store } = useContext(Context)

  const formik = useFormik({
    initialValues: {
      userName: '', 
      skip: 0
    },
    onSubmit: async (values, actions) => {
      let res = await store.getSearchedUser(values.userName, values.skip)
      console.log(res);
      actions.resetForm();
    }
  })

  return (
    <form className='search-input-wrapper' onSubmit={formik.handleSubmit} > 
        <Input placeholder='Search for user' id='userName' name='userName' value={formik.values.userName} onChange={formik.handleChange} />
        <Button type='submit' variant='outlined'>search</Button>
    </form>
  )
}

export default observer(Searchusers)