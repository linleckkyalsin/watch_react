import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Asioss from "../config/Asiosss";
import Master from "../Layout/Master";

export default function Detail(props) {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const location = useLocation();
  const [wcolor, setWcolor] = useState("");
  const [colorid, setColor] = useState();
  useEffect(() => {
    Asioss.get(`/product?product_id=${id}`).then((res) => {
      setData(res.data.data);
    });
  }, []);
  const renderByColor = (id) => {
    location.state.watchcolor.map((c) => {
      if (c.id === id) {
        setWcolor(c.name);
      }
    });
    setColor(id);
  };
  // console.log(data.category.name);
  // console.log(location.state);
  return (
    <div>
      <Master>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="card border-0">
                <img
                  src={`http://127.0.0.1:8000/images/${location.state.image}`}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <h1>{location.state.name}</h1>
              <h3>Price - {location.state.price}</h3>

              <p>{location.state.description}</p>
              <p>Color - {wcolor}</p>
              {location.state.watchcolor.map((color) => (
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
                    colorid === color.id ? "border border-dark " : null
                  }
                  onClick={renderByColor.bind(null, color.id)}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </Master>
    </div>
  );
}
