import React, { useContext } from "react";
import CartContext from "../context/CartContext";
import Master from "../Layout/Master";

export default function About() {
  const ctx = useContext(CartContext);
  return (
    <Master>
      <table className="table table-striped">
        <tr>
          <td>Image</td>
          <td>Price</td>
          <td>Name</td>
        </tr>

        {ctx.cart.map((d) => {
          return (
            <tr>
              <td>{d.name}</td>
              <td>{d.price}</td>
              <td>
                <img
                  src={`http://127.0.0.1:8000/images/${d.image}`}
                  width="100"
                  alt=""
                />
              </td>
            </tr>
          );
        })}
      </table>
    </Master>
  );
}
