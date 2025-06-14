export interface ICertificate {
  valid?: boolean;
  message?: string;
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

export const generateCertificate = async (data: ICertificate) => {
  const response = await fetch(`${API_BASE_URL}/certificates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate certificate");
  }

  return response.blob();
};

export const verifyCertificate = async (token: string) => {
  const response = await fetch(
    `${API_BASE_URL}/certificates/verify?token=${token}`
  );

  if (!response.ok) {
    throw new Error("Failed to verify certificate");
  }

  return response.json();
};
