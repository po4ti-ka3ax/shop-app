'use client'

import Link from 'next/link';
import { useParams } from "next/navigation";

export default function About() {
    const params = useParams();
    console.log(params);
    
    return (
        <div className="">
            <h1>Shop-app</h1>
            <p>about text</p>

            <div className="mt-[20px]">
                <Link href="/" className='cursor-pointer'>Go back</Link>
            </div>

            
        </div>
    )
}