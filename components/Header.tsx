import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="flex justify-between my-4">
        <Link href="/">
          <h2 className="text-2xl font-bold">Sumit K.</h2>
        </Link>
        <nav className="flex gap-4 my-auto">
          <div>
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/Works">Works</Link>
          </div>
          <div>
            <Link href="/blogs">Blogs</Link>
          </div>
          <div>
            <Link href="/Contact">Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
