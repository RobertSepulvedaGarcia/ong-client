import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { requestNews } from './utils';
import ErrorAlert from '../../components/Alerts/ErrorAlert';
import './style.css';

function Index() {
  const [detailNew, setDetailNew] = useState();
  //Message from ErrorAlert
  const [message, setMessage] = useState();
  //Redirect to home
  const [redirect, setRedirect] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    if (id) {
      requestNews(id)
        .then(res => setDetailNew(res.data))
        .catch(err =>
          setMessage(
            ErrorAlert({
              title: 'Ocurrio un error!',
              text: 'No se encontro la noticia pedida.',
            })
          )
        );
    }
  }, [id]);

  //When redirect is true, redirect to News Page
  if (redirect) {
    return <Redirect to="/news" />;
  }

  return (
    <main className="page">
      <section className="clean-block clean-info">
        <p> {message} </p>
        {detailNew !== undefined ? (
          <main className="page detail-content">
            <section class="clean-block clean-info">
              <div class="container">
                <div class="block-heading">
                  <h2 class="text-info">{detailNew.entry.name}</h2>
                </div>
                <div class="row align-items-center">
                  <div class="col-md-6">
                    <img
                      class="img-thumbnail"
                      src={detailNew.entry.image}
                      alt="news-img"
                    />
                  </div>
                  <div class="col-md-6">
                    <div class="getting-started-info">
                      <p>{detailNew.entry.content}</p>
                    </div>
                    <button
                      onClick={() => setRedirect(true)}
                      type="button"
                      className="btn btn-blue"
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        ) : (
          <main className="page">
            <section class="clean-block clean-info">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-md-12">
                    <p className="display-2 text-center text-info">
                      No hay noticia!
                    </p>
                  </div>
                  <div class="col-md-6">
                    <button
                      onClick={() => setRedirect(true)}
                      type="button"
                      className="btn btn-blue"
                    >
                      Regresar
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        )}
      </section>
    </main>
  );
}

export default Index;
