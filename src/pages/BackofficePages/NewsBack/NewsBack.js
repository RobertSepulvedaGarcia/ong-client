import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getHttpRequest, deleteHttpRequest } from '../../../helper/axios/index';
import './NewsBack.css';
import { useSelector } from 'react-redux';
//@route /backoffice/news
moment.locale('es');

const NewsBack = () => {
  const [admin, setAdmin] = useState(false);
  const [news, setNews] = useState([]);

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.user.user.roleId === 2) {
      setAdmin(false);
    } else {
      setAdmin(true);
    }
    getHttpRequest('/news')
      .then(res => {
        setNews(res.data);
      })
      .catch(err => console.log(err));
  }, [user.user.user.roleId]);

  const deleteNew = newId => {
    Swal.fire({
      title: '¿Estas seguro de eliminar?',
      text: 'No podra volver atras!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then(result => {
      if (result.value) {
        deleteHttpRequest(`/news/${newId}`)
          .then(res => {
            const v = news.filter(e => e.id !== newId);
            setNews(v);
            Swal.fire('Eliminado!', 'Ha sido borrado exitosamente.', 'success');
          })
          .catch(err =>
            Swal.fire({
              icon: 'error',
              title: 'Hubo un error',
              text: 'Intentelo de nuevo!',
            })
          );
      }
    });
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table bg-white" id="tableNews">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titulo</th>
              <th>Imagen</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {news.map(news => (
              <tr key={news.id}>
                <td data-label="ID">{news.id}</td>
                <td data-label="Titulo">{news.name}</td>
                <td data-label="Imagen">
                  <img src={news.image} alt={news.image} />
                </td>
                <td data-label="Creado">
                  {moment(news.createdAt).format('L')}
                </td>
                <td data-label="Acciones">
                  <div className="">
                    <Link
                      to={`/back-office/news/${news.id}`}
                      className="btn btn-primary btn-block"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteNew(news.id)}
                      className="btn btn-secondary btn-block"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {admin && (
        <Link className="btn  btn-primary " to={`/back-office/news/0`}>
          Crear noticia
        </Link>
      )}
    </>
  );
};

export default NewsBack;
