import React, { useState } from "react";
import Swal from "sweetalert2";

export function CariMovie({ onSearch }) {
  const [input, setInput] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    if (input == "") {
      Swal.fire({
        title: "Input Required",
        text: "Mohon masukkan nama movie yang di inginkan.",
        icon: "error",
      });
    } else {
      onSearch(input);
    }
  };

  return (
    <>
      <div className="row mt-5">
        <h3 className="text-center acme-regular">Mau Cari Apa?</h3>
        <div className="col-lg-5 mx-auto">
          <div className="input-group mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="Ketik nama movie"
              value={input}
              onChange={handleChange}
            />
            <button
              className="btn btn-dark"
              type="button"
              onClick={handleClick}
            >
              Cari
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function DataMovie({ data, data2 }) {
  const baseUrl = "https://image.tmdb.org/t/p/w500/";

  return (
    <>
      <div className="row mb-3">
        <div className="col">
          <div className="mt-4">
            <h4 className="acme-regular">
              {data != "" ? "Hasil Pencarian:" : ""}
            </h4>
          </div>
        </div>
      </div>

      {data ? (
        <div className="row">
          {data.map((item) => (
            <div key={item.id} className="col-lg-4 mb-5">
              <div className="card shadow bg-white rounded">
                <img
                  src={`${baseUrl}${item.poster_path}`}
                  className="card-img-top"
                  alt={item.title}
                />
                <div className="card-body">
                  <h5 className="card-title mb-3">{item.title}</h5>
                  <p className="card-text">{item.release_date}</p>
                  <button
                    type="button"
                    className="btn btn-dark"
                    data-bs-toggle="modal"
                    data-bs-target={`#modal-${item.id}`}
                  >
                    Detail Movie
                  </button>
                </div>
              </div>

              {/* Modal detail movie */}
              <div
                className="modal fade"
                id={`modal-${item.id}`}
                tabIndex="-1"
                aria-labelledby={`modalLabel-${item.id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id={`modalLabel-${item.id}`}
                      >
                        Detail Movie
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="row">
                        <div className="col">
                          <img
                            src={`${baseUrl}${item.poster_path}`}
                            className="img-thumbnail mb-3"
                            alt={item.title}
                          />
                        </div>
                        <div className="col-lg-9">
                          <ul className="list-group border border-1">
                            <li className="list-group-item border border-1">
                              <h3>{item.title}</h3>
                            </li>
                            <li className="list-group-item border border-1">
                              <p>
                                <b>Description: </b> {item.overview}
                              </p>
                            </li>
                            {data2[item.id] ? (
                              <>
                                <li className="list-group-item border border-1">
                                  <b>Status: </b>
                                  {data2[item.id].status}
                                </li>
                                <li className="list-group-item border border-1">
                                  <b>Tagline: </b>
                                  {data2[item.id].tagline}
                                </li>
                              </>
                            ) : (
                              <li className="list-group-item border border-1">
                                <p>Loading...</p>
                              </li>
                            )}
                            <li className="list-group-item border border-1">
                              <b>Vote average: </b> {item.vote_average}
                            </li>
                            <li className="list-group-item border border-1">
                              <b>Vote count: </b> {item.vote_count}
                            </li>
                            <li className="list-group-item border border-1">
                              <b>Popularity: </b>
                              {item.popularity}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Akhir modal */}
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada hasil.</p>
      )}
    </>
  );
}
