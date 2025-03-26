"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "@/interface/ProductCard";

export default function Products() {
  const [data, setData] = useState<ProductCard | null>(null);

  const params = useParams();
  console.log(typeof params.id);
  const router = useRouter();
  const id = params?.id ? Number(params.id) : 0;

  async function fetchData() {
    await fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((data) => setData(data));
  }
  useEffect(() => {
    fetchData();
  }, []);

  function saveProduct(id: number) {
    const data = localStorage.getItem("ProductsId") || "{}";
    const storedData = JSON.parse(data) || [];

    storedData.push(id);
    localStorage.setItem("ProductsId", JSON.stringify(storedData));

    alert("Product was added in a cart");
  }
  return (
    <div>
      <button
        className="ml-[15px] cursor-pointer border-[1px] rounded-[5px] p-[3px] hover:bg-black hover:text-[#fff] duration-200"
        onClick={() => router.back()}
      >
        Go back
      </button>

      <h1 className="text-[20px] text-center">Product ID - {id}</h1>

      {data ? (
        <>
          <div className="md:flex justify-center ml-[20px] mr-[20px] mt-[20px]  border p-[20px] rounded-[10px]">
            <Image
              src={data.image ? data.image : "/"}
              width={200}
              height={200}
              alt="Photo product"
              className="max-w-[200px] max-h-[250px] mr-[20px]"
            />
            <div className="mr-[24px] sm:mt-[60px] md:border-l  pl-[20px] pr-[20px]">
              <p className="text-[13px] text-[#d3d3d3]">Title:</p>
              <p className="max-w-[400px]"> {data.title}</p>
              <p className="text-[13px] text-[#d3d3d3] mt-[15px] ">Price:</p>
              <p className="mb-[15px]">{data.price}$</p>
              <p className="text-[13px] text-[#d3d3d3]">Category:</p>
              <p className="mb-[20px]">{data.category}</p>
              <p className="text-[13px] text-[#d3d3d3]">Description:</p>
              <p className="max-w-[400px]">{data.description}</p>
            </div>
          </div>
        </>
      ) : null}
      <div className="mt-[40px] flex justify-center">
        <button
          className="cursor-pointer border-[1px] rounded-[5px] p-[3px] mr-[10px] hover:bg-black hover:text-[#fff] duration-200"
          onClick={() => fetchData()}
        >
          Refresh
        </button>
        <button
          className="cursor-pointer border-[1px] rounded-[5px] p-[3px] mr-[10px] bg-blue-500 text-[#fff] hover:bg-blue-700 hover:text-[#fff] duration-200"
          onClick={() => saveProduct(id)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
