import CertificateForm from "@/components/CertificateForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Digital Certificate Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create verifiable digital certificates with embedded QR codes for
            authentication
          </p>
        </header>
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <CertificateForm />
        </section>
      </div>
    </main>
  );
}
