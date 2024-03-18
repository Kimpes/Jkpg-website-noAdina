import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function storeCard(props) {
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <Link
      href={`/stores/${props.id}`}
      key={`store-${props.id}`}
      className="card"
    >
      <div className="bg-pink w-full h-full py-3 px-6 grid grid-rows-2 cursor-pointer">
        <div className="m-0 flex items-center">
          <h5 className="font-bold">{props.name}</h5>
        </div>
        <div className="m-0 flex flex-col">
          <p>
            <b>{props.district}</b> || <b>{props.type}</b>
          </p>
          <p>Click for more information</p>
        </div>
      </div>
    </Link>
  );
}
