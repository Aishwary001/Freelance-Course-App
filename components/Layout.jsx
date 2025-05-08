'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menu = [
  { labels: 'Home', href: '/' },
  { labels: 'ContactUs', href: '/contact-us' },
  { labels: 'SignIn', href: '/login' }
];

const Layout = ({ children }) => {
  const pathname = usePathname();

  console.log(pathname);

  const excludedRoutes = ['/login', '/sign-up'];

  const isExcluded = excludedRoutes.includes(pathname);

  if (isExcluded) {
    return <div>{children}</div>;
  }

  return (
    <div>
      <nav className="px-[10%] bg-white shadow-lg sticky top-0 left-0 w-full py-6 flex justify-between items-center">
        <Link href="/">Course App</Link>
        <div className="flex gap-16 items-center">
          {menu.map((item, idx) => (
            <Link href={item.href} key={idx}>{item.labels}</Link>
          ))}
          <Link href="/sign-up" className="py-2 px-4 bg-violet-600 rounded-md text-white">
            SignUp
          </Link>
        </div>
      </nav>
      <section>{children}</section>
      <footer>Welcome to Footer</footer>
    </div>
  );
};

export default Layout;
