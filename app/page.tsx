import React, { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <ul>
      <li>
        <Link href='/server'>Server component</Link>
      </li>
      <li>
        <Link href='/client'>Client component</Link>
      </li>
    </ul>
  );
}