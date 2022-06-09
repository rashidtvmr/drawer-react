import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DrawAnnotations from '../component/DrawAnnotations'
import Header from '../component/Header'
import { parse } from 'query-string'
import axios from 'axios';
import toast from 'react-hot-toast';

function DrawingPage({ actionType, }) {
  const [annotations, setAnnotations] = useState([]);
  const { state } = useLocation();
  const params = parse(window.location.href)
  const undoActions = () => {
    if (annotations.length > 0) {
      setAnnotations(os => {
        return annotations.filter(sa => sa.key != annotations.length);
      })
    }
  }

  const url = process.env.REACT_APP_API;
  useEffect(() => {
    if (params.id)
      axios.get(`${url}/annotation/${params.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }).then(res => {
        setAnnotations(res.data)
        console.log(res)
      }).catch(err => {
        console.log(err.response);
      });
  }, [])

  const onSave = () => {
    axios.post(`${url}/annotations`, {
      type: params.type ?? 'new',
      id: params.id,
      annotations: annotations
    },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(res => {
        console.log(res)
        toast.success('Drawing saved');
      }).catch(err => {
        console.log(err.response);
      });
  }

  return (
    <div>
      <Header />
      <div className='text-end'>
        <button class="btn btn-secondary btn mx-2" onClick={undoActions}>Undo</button>
        <button class="btn btn-secondary btn mx-2" onClick={onSave}>Save</button>
      </div>
      <DrawAnnotations
        type={params?.action}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />
    </div>
  )
}

export default DrawingPage