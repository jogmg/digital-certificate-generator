import { ICertificate } from "@/app/verify/[token]/page";

export interface ICertificateData {
  name: string;
  dob: string;
  matricNo: string;
  course: string;
  grade: string;
  graduationYear: string;
  issueDate?: string;
  expiryDate?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const generateCertificate = async (data: ICertificateData) => {
  const response = await fetch(`${API_BASE_URL}/certificates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate certificate");
  }

  return await response.blob();
};

export const verifyCertificate = async (
  token: string
): Promise<ICertificate> => {
  const response = await fetch(
    `${API_BASE_URL}/certificates/verify?token=${token}`
  );

  if (!response.ok) {
    throw new Error("Error verifying certificate");
  }

  return await response.json();
};
