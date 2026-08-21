import { redirect } from 'next/navigation';

export default function WatchesPage() {
  redirect('/shop?category=watches');
}
