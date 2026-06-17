"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

export default function Navbar(){

const pathname=usePathname();

return(

<nav className="flex gap-4">

<Link

href="/publish"

className={pathname==="/publish"

?"active"

:""}

>

📝 Publish

</Link>

<Link

href="/notices"

className={pathname==="/notices"

?"active"

:""}

>

📄 View Notices

</Link>

</nav>

);

}