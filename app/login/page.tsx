'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import { Input } from "@nextui-org/input";
import { Button, ButtonGroup } from "@nextui-org/button";
import {Alert} from "@nextui-org/alert";

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const response = await fetch("api/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    if (response.ok) {
      router.push('/admin');
    }else {
      //const errorData = await response.json();
      setError('Login failed');
    }
  }

  return (
    <main className="">
      {error && <Alert color="danger">{"Error: " + error}</Alert>}
      <section className="flex flex-col h-full">
        <div className="">
          <Image
            className="m-auto"
            src="/car_.png"
            alt="cat"
            width={300}
            height={300}
          />
        </div>
        <div className="flex justify-center w-full lg:w-4/12 p-8 lg:m-auto">
          <form className="w-full" onSubmit={handleLogin}>
            <Input
              className="mb-3"
              type="text"
              label="username"
              id="username"
              variant="bordered"
              radius="full"
              size="md"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              className="mb-3"
              type="password"
              label="Password"
              id="password"
              variant="bordered"
              radius="full"
              size="md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="mb-3 w-full flex mx-auto"
              color="default"
              type="submit"
              variant="bordered"
              radius="full"
              size="lg"
            >
              Login
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

