import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import Asioss from "../config/Asiosss";
import CartContext from "../context/CartContext";
import Master from "../Layout/Master";
import Content from "./Content";

export default function Home() {
  const ctx = useContext(CartContext);
  const [isLoading, setLoading] = useState(true);
  const [mydata, setData] = useState({ data: [] });
  const [color, setColor] = useState([]);

  const [cat, setCat] = useState([]);
  const [selectCat, setSelectCat] = useState(null);
  const [selectCo, setSelectCo] = useState(null);
  const [currentPage, setcurrentPage] = useState(1);
  const [api, setApi] = useState("/product");
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    Asioss.get(api).then((res) => {
      setLoading(false);
      setData(res.data.data);
    });
    Asioss.get("/category").then((res) => {
      setLoading(false);
      setCat(res.data.data);
    });
    Asioss.get("/colors").then((res) => {
      setLoading(false);
      setColor(res.data.data);
    });
  }, [api]);

  const renderNextPage = () => {
    setcurrentPage(currentPage + 1);
    const page = currentPage + 1;
    if (selectCat === null) {
      setApi(`/product?page=${page}`);
    } else {
      setApi(`/product?page=${page}&category_id=${selectCat}`);
    }
  };

  const renderPrevPage = () => {
    setcurrentPage(currentPage - 1);
    const page = currentPage - 1;
    if (selectCat === null) {
      setApi(`/product?page=${page}`);
    } else {
      setApi(`/product?page=${page}&category_id=${selectCat}`);
    }
  };
  const renderProbyCat = (id) => {
    setcurrentPage(1);
    setSelectCat(id);
    setIsShow(true);
    setApi(`product?category_id=${id}`);
  };
  const renderByColor = (id) => {
    setcurrentPage(1);

    setSelectCo(id);
    setApi(`/product?color_id=${id}`);
  };
  const AddToCart = (data) => {
    ctx.setCart([...ctx.cart, data]);
  };
  const handleFilter = () => {
    if (isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };
  const handleClick = (data) => {
    navigate(`/product/${data.id}`, { state: data });
  };
  return (
    <Master>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <Content></Content>
          <div
            className="row sticky-top"
            onClick={handleFilter}
            style={{ backgroundColor: "#E5E4E2" }}
          >
            <div className="col-md-3">
              {isShow ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-down "
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-chevron-up"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                  />
                </svg>
              )}
              Filter
            </div>
            <div className="col-md-3">
              <div>
                <p>Category</p>
              </div>
              {isShow ? (
                <div>
                  {cat
                    ? cat.map((c) => (
                        <div
                          key={c.id}
                          style={{ padding: "10px" }}
                          // style={{ marginRight: "20px" }}

                          onClick={() => {
                            renderProbyCat(c.id);
                          }}
                        >
                          <p
                            className={
                              selectCat === c.id
                                ? "text-success"
                                : "text-primary"
                            }
                          >
                            {" "}
                            {c.name}
                          </p>
                        </div>
                      ))
                    : setIsShow(false)}
                </div>
              ) : null}
            </div>
            <div className="col-md-3">
              <div>
                <p>Color</p>
              </div>
              {isShow ? (
                <div>
                  {color
                    ? color.map((c) => (
                        <div
                          key={c.id}
                          style={{ padding: "10px" }}
                          // style={{
                          //   backgroundColor: c.name,
                          //   height: 25,
                          //   width: 25,
                          //   borderRadius: 50,
                          //   display: "inline-block",
                          // }}
                          className={
                            selectCo === c.id ? "text-success" : "text-primary"
                          }
                          onClick={() => renderByColor(c.id)}
                        >
                          {c.name}
                        </div>
                      ))
                    : setIsShow(false)}
                </div>
              ) : null}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 mt-3">
              <div className="p-3">
                <div></div>
              </div>
            </div>
            {/* <div className="row mt-2">
              <div className="col-md-12">
                <div>
                  {color
                    ? color.map((c) => (
                        <span
                          style={{
                            backgroundColor: c.name,
                            height: 25,
                            width: 25,
                            borderRadius: 50,
                            display: "inline-block",
                          }}
                          className={
                            selectCo === c.id ? "border border-dark " : null
                          }
                          onClick={renderByColor.bind(null, c.id)}
                        ></span>
                      ))
                    : null}
                </div>
              </div>
            </div> */}
            <div className="row mt-2">
              <div className="col-md-12">
                <div>
                  <div>
                    <button
                      className="btn btn-primary"
                      disabled={mydata.prev_page_url === null ? true : false}
                      onClick={() => renderPrevPage()}
                    >
                      <span className="fas fa-arrow-left"></span>
                    </button>

                    <button
                      className="btn btn-primary ms-3"
                      disabled={mydata.next_page_url === null ? true : false}
                      onClick={() => renderNextPage()}
                    >
                      <span className="fas fa-arrow-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {mydata.data
              ? mydata.data.map((d) => {
                  return (
                    <div
                      className="col-md-3 mt-2"
                      key={d.id}
                      onClick={() => handleClick(d)}
                    >
                      <div className="card border-0">
                        <img
                          src={`http://127.0.0.1:8000/images/${d.image}`}
                          alt=""
                        />

                        <div className="card-body">
                          <h4 className="text-center">{d.name}</h4>
                          <h4 className="text-center">{d.description}</h4>
                          <Link to={`/product/${d.id}`}>View More</Link>
                          {d.watchcolor.map((color) => (
                            <span
                              key={color.id}
                              style={{
                                backgroundColor: color.name,
                                height: 25,
                                width: 25,
                                borderRadius: 50,
                                display: "inline-block",
                              }}
                              className={
                                selectCo === color.id
                                  ? "border border-dark "
                                  : null
                              }
                              onClick={renderByColor.bind(null, color.id)}
                            ></span>
                          ))}
                          <div className="d-flex justify-content-between  mt-3">
                            <span className="btn btn-sm btn-outline-warning">
                              {d.price}
                            </span>

                            <span
                              className="btn btn-sm btn-danger"
                              onClick={() => AddToCart(d)}
                            >
                              Add To Cart
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      )}
    </Master>
  );
}
