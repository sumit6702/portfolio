'use client';
import { useRouter } from 'next/navigation';
import { Button } from "@nextui-org/button";

export default function Admin() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("api/logout", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        router.push('/');
      } else {
        alert('Logout Failed!');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
      alert('An unexpected error occurred. Please try again.')
    }
  }

  return (
    <main>
      <Button
        className=""
        color="default"
        type="button"
        variant="bordered"
        radius="sm"
        size="lg"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </main>
  );
}
