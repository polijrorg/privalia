import { signIn } from "next-auth/react"

export const loginAction = (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  signIn("credentials", { email, password });
}

export const registerAction = async (formData: FormData) => {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  const response = await fetch('/api/user', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmPassword
    })
  });

  const data = await response.json();
  
  if (!response.ok) {
    // For Zod validation errors
    if (data.fieldErrors) {
      throw new Error(data.messages?.[0] || data.error);
    }
    throw new Error(data.error);
  }

  return data;
}