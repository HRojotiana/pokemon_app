import React, {useEffect} from "react";
import Link from "next/link";

export default function Home(){
  return (
    <ul>
      <li>
        <Link href='/server'>/server</Link>
      </li>
    </ul>
  );
}