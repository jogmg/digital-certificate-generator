import { ICertificate } from "@/services/certificateService";
import { format } from "date-fns";

export const CertificateDetails = ({
  certificate,
}: {
  certificate: ICertificate;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Student Information
          </h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Full Name:</dt>
              <dd className="font-medium">{certificate.name ?? "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Date of Birth:</dt>
              <dd className="font-medium">
                {certificate.dob
                  ? format(certificate.dob, "MMMM do, yyyy")
                  : "N/A"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Matric Number:</dt>
              <dd className="font-medium">{certificate.matricNo ?? "N/A"}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Academic Information
          </h3>
          <dl className="mt-2 space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Course:</dt>
              <dd className="font-medium">{certificate.course ?? "N/A"}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Grade Achieved:</dt>
              <dd className="font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-md">
                {certificate.grade ?? "N/A"}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-600">Graduation Year:</dt>
              <dd className="font-medium">
                {certificate.graduationYear ?? "N/A"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
