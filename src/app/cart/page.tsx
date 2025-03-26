"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Product from "@/interface/Product";
import ProductCard from "@/interface/ProductCard";

export default function Cart() {
  const [product, setProducts] = useState<ProductCard[]>([]);
  const [storedId, setStoredId] = useState([]);
  const [reload, setReload] = useState(true);
  const totalSumArr: number[] = [];
  let totalSum;
  // console.log(cartData);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("ProductsId") || "{}");
    setStoredId(cartData);

    Promise.all(
      cartData.map((el: number) =>
        fetch(`https://fakestoreapi.com/products/${el}`).then((res) =>
          res.json(),
        ),
      ),
    ).then((data) => {
      data.forEach((el) => {
        totalSumArr.push(el.price);
      });
      totalSum = totalSumArr.reduce(function (a, b) {
        return a + b;
      });

      setProducts(data);
    });
  }, [reload]);

  function onDelete(id: number) {
    for (let i = 0; i < storedId.length; i++) {
      if (storedId[i] == id) {
        storedId.splice(i, 1);
        localStorage.setItem("ProductsId", JSON.stringify(storedId));
      }
    }
    setReload(!reload);
    console.log(storedId);
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className="mt-[20px] mb-[20px] ">
        <Link
          href="/"
          className="cursor-pointer border-[1px] rounded-[5px] p-[3px] hover:bg-black hover:text-[#fff] duration-200"
        >
          Go to own page
        </Link>
      </div>
      <div className="flex">
        <p>Products in a cart:</p>
        <p>&nbsp;{storedId.length}</p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl::grid-cols-4  text-center gap-[30px] p-[10px]">
        {product ? (
          product.map((el: Product) => (
            <div
              key={el.id + Math.random()}
              className="flex flex-col justify-between items-center border max-w-[300px] rounded-[10px] mt-[20px] mb-[20px] p-[15px]"
            >
              <div className="text-center">
                <Image
                  src={el.image}
                  width={150}
                  height={150}
                  alt="Product photo"
                />
                <p>Price: {el.price}$</p>
              </div>
              <p className="max-w-[150px] mt-[20px] mb-[20px] ">{el.title}</p>
              <div className="flex flex-col">
                <button
                  onClick={() => onDelete(el.id)}
                  className="mb-[20px] cursor-pointer border-[1px] rounded-[5px] p-[5px] mr-[10px] bg-[#e60000] text-[#fff] hover:bg-[#cd0000] duration-200"
                >
                  Delete from cart
                </button>
                <Link
                  href={"/products/" + el.id}
                  className="cursor-pointer border-[1px] rounded-[5px] p-[3px] mr-[10px] hover:bg-black hover:text-[#fff] duration-200"
                >
                  Show
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-[#d3d3d3]">Cart empty</p>
        )}
      </div>
    </div>
  );
}
