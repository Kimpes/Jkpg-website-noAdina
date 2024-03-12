import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

export default function storeCard(props) {
  const router = useRouter();

  useEffect(() => {

  }, [])

  return (
    <Link href={`/stores/${props.id}`}>
      <div className="bg-pink w-full h-full py-3 px-6 grid grid-rows-2 cursor-pointer">
        <div className='m-0 flex items-center'>
          <h5 className='font-semibold'>{props.name}</h5>
        </div>
        <div className='m-0 flex items-center'>
          <p>Click for more information</p>
        </div>
      </div>   
    </Link>
  )
}