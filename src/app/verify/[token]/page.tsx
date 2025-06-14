import { CertificateDetails } from "@/components/CertificateDetails";
import { ICertificate, verifyCertificate } from "@/services/certificateService";
import { format } from "date-fns";

interface VerificationPageProps {
  params: Promise<{ token: string }>;
}

interface IApiResponse {
  error: boolean;
  message: string;
  statusCode: number;
  data: ICertificate;
}

export default async function VerificationPage({
  params,
}: VerificationPageProps) {
  let certificate: ICertificate | null = null;

  try {
    const result: IApiResponse = await verifyCertificate((await params).token);
    certificate = result.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Certificate Verification
          </h1>
          <p className="text-gray-600">Validating certificate authenticity</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div
            className={`${
              certificate?.valid ? "bg-indigo-700 py-4" : "bg-red-600 py-20"
            } text-white px-4 text-center`}
          >
            {certificate?.valid ? (
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
                  {certificate?.message ?? "Certificate is not valid"}
                </p>
              </>
            )}
          </div>

          {certificate?.valid && (
            <div className="p-6 md:p-8">
              <CertificateDetails certificate={certificate} />

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="font-medium text-gray-700 mb-3">
                  Verification Details
                </h3>
                <div className="flex flex-col gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Verification ID:</span>{" "}
                    {(await params).token}
                  </div>
                  <div>
                    <span className="font-medium">Valid Until:</span>{" "}
                    {certificate.expiryDate
                      ? format(certificate.expiryDate, "MMMM do, yyyy")
                      : "N/A"}
                  </div>
                  <div>
                    <span className="font-medium">Issued On:</span>{" "}
                    {certificate.issueDate
                      ? format(certificate.issueDate, "MMMM do, yyyy")
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
