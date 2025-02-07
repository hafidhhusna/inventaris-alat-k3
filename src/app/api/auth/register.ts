import { NextApiRequest, NextApiResponse } from "next";
import { register } from "@/services/register";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  try {
    const newUser = await register(name, email, password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
}
