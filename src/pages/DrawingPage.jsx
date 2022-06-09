import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import DrawAnnotations from '../component/DrawAnnotations'
import Header from '../component/Header'
import { parse } from 'query-string'
import axios from 'axios';
import toast from 'react-hot-toast';

function DrawingPage({ actionType, }) {
  const n = useNavigate();
  const [annotations, setAnnotations] = useState([]);
  const [initialLength, setinitialLength] = useState();
  const { state } = useLocation();
  const params = parse(window.location.href)

  const undoActions = () => {
    if (annotations.length > 0 && params.action !== "view") {
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
        setinitialLength(res.data.length);
        console.log(res)
      }).catch(err => {
        console.log(err.response);
        toast.error(err.response?.data?.message)
        n(-1);
      });
  }, [])

  const onSave = () => {
    if (annotations.length > 0 && params.action !== "view") {
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
          toast.error(err.response?.data?.message)
        });
    } else toast.error('Empty drawings cannt be saved')
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className='text-end my-3'>
          <button
            disabled={annotations.length < 1 || annotations.length === initialLength}
            class="btn btn-secondary btn mx-2" onClick={undoActions}>Undo</button>
          <button
            disabled={annotations.length < 1 || annotations.length === initialLength}
            class="btn btn-secondary btn mx-2"
            onClick={onSave}>Save</button>
        </div>
        <DrawAnnotations
          type={params?.action}
          annotations={annotations}
          setAnnotations={setAnnotations}
        />
      </div>
    </div>
  )
}

export default DrawingPage