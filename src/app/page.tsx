// src/app/page.tsx
import { redirect } from 'next/navigation';

const Page = () => {
  redirect("/login");
  return null;
};

export default Page;
