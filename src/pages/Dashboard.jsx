import axios from 'axios'
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header'

function Dashboard() {
  const [annotationList, setannotationList] = useState([])
  const n = useNavigate()

  useEffect(() => {
    const URL = process.env.REACT_APP_API;
    axios.get(URL + '/annotations', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      console.log(response.data.data);
      setannotationList(response.data.data);
    }).catch(err => {
      toast.error(err.response?.data?.message)
      console.log(err.response)
    })
  }, [])

  const actionButton = (type = 'new', id) => {
    n(`/draw?&action=${type}&id=${id}`);
  }
  return (
    <div className='text-left'>
      <Header />

      <div className="container">
        <div className='d-flex justify-content-between my-3'>
          <div><h1 className='text-start'>My Annotations:</h1></div>
          <button className='btn btn-secondary'>Create New</button>
        </div>
        <div className="row g-2">
          {annotationList.map(ali => {
            return <div className="col-12 col-md-4 col-lg-3">
              <div className='card p-3'>
                <button className='btn btn-primary my-2'
                  onClick={() => actionButton('view', ali._id)}
                >View</button>
                <button className='btn btn-success'
                  onClick={() => actionButton('edit', ali._id)}
                >Edit</button>
                <div className='text-muted ms-4 mt-3'>Created : {moment(ali.createdAt).fromNow()}</div>
              </div>
            </div>
          })}
        </div>
      </div>

    </div>
  )
}

export default Dashboard