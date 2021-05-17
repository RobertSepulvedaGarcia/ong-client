import React from 'react';
import { getHttpRequest } from '../../helper/axios/index';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './news.css';

class NewsPublic extends React.Component {
  state = {
    data: [],
  };
  //function to get news from db
  componentDidMount() {
    getHttpRequest('/news')
      .then(res => {
        this.setState({
          data: res.data,
        });
      })
      .catch(err => console.log("Couldn't fetch data. Error: " + err));
  }

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Somos Más - Novedades</title>
        </Helmet>
        <main className="page">
          <section className="clean-block about-us">
            <div className="container news-content">
              <div className="block-heading">
                <h2 className="text-info">Novedades</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  quam urna, dignissim nec auctor in, mattis vitae leo.
                </p>
              </div>
              <div className="row justify-content-center">
                {this.state.data.map(element => (
                  <div key={element.id} className="col-sm-6 col-lg-4">
                    <div className="card text-center clean-card">
                      <img
                        src={
                          'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
                        }
                        className="card-img-top"
                        alt="img"
                      />
                      <div className="card-body">
                        <h5 className="card-title"> {element.name} </h5>
                        <Link to={`/news/${element.id}`}>
                          <button
                            style={{ background: '#9ac9fb' }}
                            className="btn"
                          >
                            Ver Detalles
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
}

export default NewsPublic;
