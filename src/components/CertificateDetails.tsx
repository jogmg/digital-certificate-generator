import { ICertificateData } from "@/services/certificateService";
import { format } from "date-fns";

interface CertificateDetailsProps {
  certificate: ICertificateData;
}

export const CertificateDetails = ({
  certificate,
}: CertificateDetailsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-[#7E8086]">Student Information</h3>
          <dl className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between text-white">
              <dt className="font-medium">Full Name:</dt>
              <dd>{certificate.name ?? "N/A"}</dd>
            </div>
            <div className="flex justify-between text-white">
              <dt className="font-medium">Date of Birth:</dt>
              <dd>
                {certificate.dob
                  ? format(certificate.dob, "MMMM do, yyyy")
                  : "N/A"}
              </dd>
            </div>
            <div className="flex justify-between text-white">
              <dt className="font-medium">Matric Number:</dt>
              <dd>{certificate.matricNo ?? "N/A"}</dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium text-[#7E8086]">Academic Information</h3>
          <dl className="mt-2 space-y-2 text-sm">
            <div className="flex justify-between text-white">
              <dt className="font-medium">Course:</dt>
              <dd>{certificate.course ?? "N/A"}</dd>
            </div>
            <div className="flex justify-between text-white">
              <dt className="font-medium">Grade Achieved:</dt>
              <dd className="text-[13px] bg-indigo-700 px-2 py-1 rounded-md">
                {certificate.grade ?? "N/A"}
              </dd>
            </div>
            <div className="flex justify-between text-white">
              <dt className="font-medium">Graduation Year:</dt>
              <dd>{certificate.graduationYear ?? "N/A"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
