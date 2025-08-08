import { CertificateDetails } from "@/components/CertificateDetails";
import {
  ICertificateData,
  verifyCertificate,
} from "@/services/certificateService";
import { format } from "date-fns";

interface VerificationPageProps {
  params: Promise<{ token: string }>;
}

export interface ICertificate {
  valid: boolean;
  message?: string;
  certificate: ICertificateData;
}

export default async function VerificationPage({
  params,
}: VerificationPageProps) {
  const token = (await params).token;
  let result: ICertificate | undefined;

  try {
    result = await verifyCertificate(token);
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Certificate Verification
          </h1>
          <p className="text-[#7E8086]">Verify certificate authenticity</p>
        </div>

        <div className="bg-[#171921] rounded-xl shadow-lg overflow-hidden">
          <div
            className={`${
              result?.valid ? "bg-indigo-700 py-4" : "bg-red-600 py-20"
            } text-white px-4 text-center`}
          >
            {result?.valid ? (
              <>
                <h2 className="text-xl font-semibold">
                  Certificate Validated Successfully
                </h2>
                <p className="text-indigo-200 mt-1">
                  This certificate is valid
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold">
                  Certificate Validated Successfully
                </h2>
                <p className="text-red-100 mt-1">
                  {result?.message ?? "Certificate is not valid"}
                </p>
              </>
            )}
          </div>

          {result?.valid && (
            <div className="p-6 md:p-8">
              <CertificateDetails certificate={result.certificate} />

              <div className="mt-8 pt-6 border-t border-[#37383e]">
                <h3 className="font-medium text-[#7E8086] mb-3">
                  Verification Details
                </h3>
                <div className="flex flex-col gap-4 text-sm text-white">
                  <div title={token}>
                    <span className="font-medium">Verification ID: </span>
                    {`${token.slice(0, 4)}...${token.slice(-4)}`}
                  </div>
                  <div>
                    <span className="font-medium">Valid Until: </span>
                    {result.certificate.expiryDate
                      ? format(result.certificate.expiryDate, "MMMM do, yyyy")
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Issued On: </span>
                    {result.certificate.issueDate
                      ? format(result.certificate.issueDate, "MMMM do, yyyy")
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
