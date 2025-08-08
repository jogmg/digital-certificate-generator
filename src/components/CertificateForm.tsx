"use client";

import { FormField } from "@/components/ui/FormField";
import { generateCertificate } from "@/services/certificateService";
import { format } from "date-fns";
import { useState } from "react";

export default function CertificateForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: new Date().toISOString().split("T")[0],
    matricNo: "",
    course: "",
    grade: "",
    graduationYear: new Date().getFullYear().toString(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const pdfBlob = await generateCertificate(formData);

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;

      // modify pdf name
      a.download = `${formData.name
        .replace(" ", "_")
        .toLowerCase()}_certificate_${format(
        Date.now(),
        "MMMM_yyyy"
      ).toLowerCase()}.pdf`;

      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred generating certificate");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <FormField
          label="Matriculation Number"
          placeholder="Enter your matriculation number"
          name="matricNo"
          value={formData.matricNo}
          onChange={handleChange}
          required
        />
        <FormField
          label="Course"
          name="course"
          placeholder="Enter your course name"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <FormField
          label="Grade"
          name="grade"
          as="select"
          value={formData.grade}
          onChange={handleChange}
          required
        >
          <option value="">Select Grade</option>
          <option value="A">A (Excellent)</option>
          <option value="B">B (Very Good)</option>
          <option value="C">C (Good)</option>
          <option value="D">D (Pass)</option>
          <option value="F">F (Fail)</option>
        </FormField>
        <FormField
          label="Graduation Year"
          name="graduationYear"
          type="number"
          min="2000"
          max={new Date().getFullYear() + 5}
          value={formData.graduationYear}
          onChange={handleChange}
          required
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg">{error}</div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full sm:w-2/4 py-3 px-4 rounded-xl font-medium text-white shadow-md transition-colors ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
        }`}
      >
        {isSubmitting ? "Generating Certificate..." : "Generate Certificate"}
      </button>
    </form>
  );
}
