import CertificateForm from "@/components/CertificateForm";

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Digital Certificate Generator
          </h1>
          <p className="text-[#7E8086] max-w-2xl mx-auto">
            Fill the form below to generate a digital certificate with QR code
            for authentication
          </p>
        </header>
        <section className="bg-[#171921] rounded-xl shadow-lg shadow-[#00000066] border border-[#37383e] p-6 md:p-8">
          <CertificateForm />
        </section>
      </div>
    </main>
  );
}
