import { redirect } from 'next/navigation';

export default function BeltsPage() {
  redirect('/shop?category=belts');
}
