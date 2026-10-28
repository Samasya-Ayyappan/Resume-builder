import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-white text-black px-20 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-16">
        
        {/* Left Content */}
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider">
            Professional Resume Builder
          </p>

          <h1 className="text-5xl font-extrabold leading-tight">
            Build a Resume That Gets You Hired
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create a professional, ATS-friendly resume in minutes with
            beautifully designed templates. Add your experience, skills,
            education, and projects while watching your resume update
            instantly as you type.
          </p>

          <p className="mt-4 text-lg leading-8 text-gray-600">
            Whether you&apos;re starting your career or an experienced
            professional, create a resume tailored to your career goals
            without struggling with complicated formatting.
          </p>

          <Link
            href="/builder"
            className="mt-8 inline-block rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Build Your Resume Now
          </Link>

          <div className="mt-6 flex gap-6 text-sm text-gray-500">
            <span>✓ ATS-Friendly</span>
            <span>✓ Easy to Customize</span>
            <span>✓ Live Preview</span>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-xl border bg-gray-50 p-6 shadow-xl">
            <div className="aspect-[8.5/11] bg-white p-8 shadow-md">
              <div className="border-b pb-4">
                <div className="text-2xl font-bold">
                  Your Name
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Software Developer
                </div>
              </div>

              <div className="mt-6">
                <div className="text-sm font-bold uppercase">
                  Experience
                </div>

                <div className="mt-3 h-2 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-2 w-full rounded bg-gray-200" />
                <div className="mt-2 h-2 w-5/6 rounded bg-gray-200" />
              </div>

              <div className="mt-6">
                <div className="text-sm font-bold uppercase">
                  Skills
                </div>

                <div className="mt-3 h-2 w-full rounded bg-gray-200" />
                <div className="mt-2 h-2 w-4/5 rounded bg-gray-200" />
              </div>

              <div className="mt-6">
                <div className="text-sm font-bold uppercase">
                  Education
                </div>

                <div className="mt-3 h-2 w-5/6 rounded bg-gray-200" />
                <div className="mt-2 h-2 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}