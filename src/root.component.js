import { useState, useEffect } from 'react'
import { products$, addToCheckout } from "@mfs-demo/states";

export default function Root(props) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const sub = products$.subscribe((products) => {
      setProducts(products);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  const addToCart = (productId) => {
    addToCheckout(productId)
  }

  return <div>
    <h3>Products</h3>
    {
      products.map(({ id,
        name,
        image,
        price,
        stock }) => <div key={id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>{name}</div>
          <div><img width={50} src={image} alt="image" /></div>
          <div>{price}</div>
          <div>{stock}</div>
          <button onClick={() => addToCart(id)} disabled={stock < 1}>+</button>
        </div>)
    }
  </div>;
}
