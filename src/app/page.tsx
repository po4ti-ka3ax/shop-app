"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Product from "@/interface/Product";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="">
      <main className="">
        <Link
          href="/cart"
          className="cursor-pointer border-[1px] rounded-[5px] p-[3px] mr-[10px] hover:bg-[#90ee90] hover:text-[#fff] duration-200"
        >
          Go to cart
        </Link>

        <div className="">
          <p className="mt-[20px] ">Задание №1</p>
          <div className="mt-[20px]">
            <Link href="/about" className=" cursor-pointer">
              Navigate to about
            </Link>
          </div>
          <div className="mt-[20px]">
            <button
              onClick={() => router.push("/about")}
              className="cursor-pointer"
            >
              Navigate to about - useRouter
            </button>
          </div>
        </div>

        <div className="">
          <p className="mt-[50px] ">Задание №2</p>
          <div className="flex mt-[10px]">
            <div className="">
              <Link href="/products/1">Product 1</Link>
            </div>
            <div className="ml-[20px] mr-[20px]">
              <Link href="/products/2">Product 2</Link>
            </div>
            <div className="">
              <Link href="/products/3">Product 3</Link>
            </div>
          </div>
        </div>

        <div className="">
          <p className="mt-[50px] ">Задание №3 / №8</p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl::grid-cols-4  text-center gap-[30px] p-[10px]">
            {data ? (
              data.map((el: Product) => (
                <div
                  key={el.id}
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
                  <p className="max-w-[150px] mt-[20px] mb-[20px] ">
                    {el.title}
                  </p>
                  <div className=" ">
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
              <p>Cart empty</p>
            )}
          </div>
        </div>

        {/* <div className="mt-[20px]">
        <Link href="/test" className="cursor-pointer">Navigate to about 2</Link>
      </div> */}
      </main>
    </div>
  );
}
