import React, { useState, useEffect } from 'react';

import Product from './Product.jsx';
import getProducts from './utils.js';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSortedAscending, setIsSortedAscending] = useState(true); 

  const handleIncrement = ({ id, price }) => {
    const count = countProducts[id] ?? 0;
    setTotalPrice(totalPrice + price);

    const newCountProducts = { ...countProducts, [id]: count + 1 };
    setCountProducts(newCountProducts);
  };

  const handleDecrement = ({ id, price }) => {
    const count = countProducts[id] ?? 0;
    if (count === 0) {
      return;
    }
    setTotalPrice(totalPrice - price);

    const newCountProducts = { ...countProducts, [id]: count - 1 };
    setCountProducts(newCountProducts);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/src/products.json');
      const data = await response.json(); 
      setProducts(data);
    }
    fetchData();
  }, []);


  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return isSortedAscending
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name); 
    });
    setProducts(sortedProducts);
    setIsSortedAscending(!isSortedAscending); 
  };

  return (
    <>
      {}
      <button onClick={handleSort}>
        {isSortedAscending ? 'Сортировать по убыванию' : 'Сортировать по возрастанию'}
      </button>
      
      {/*продукты*/}
      <table border="1">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Цена</th>
            <th>Количество</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{countProducts[product.id] || 0}</td>
              <td>
                <button onClick={() => handleIncrement(product, product.price)}>+</button>
                <button onClick={() => handleDecrement(product, product.price)}>-</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div id="totalPrice">
        {`Итого цена: ${totalPrice}`}
      </div>
    </>
  );
};

export default Products;
