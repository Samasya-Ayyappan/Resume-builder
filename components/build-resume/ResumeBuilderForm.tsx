"use client";
import { useState } from "react";

export default function ResumeBuilderForm() {
    const [, setResumeType] = useState<
        "fresher" | "experienced" | null
    >(null);

    return (
        <section className="min-h-screen bg-gray-50 px-6 py-20 text-black">
            <div className="mx-auto max-w-4xl text-center">

                <h1 className="text-4xl font-bold">
                    Build Your Resume
                </h1>

                <p className="mt-4 text-gray-600">
                    Let&apos;s start by telling us a little about yourself.
                </p>

                <h2 className="mt-12 text-2xl font-semibold">
                    What type of resume are you creating?
                </h2>

                <div className="mt-8 grid gap-6 md:grid-cols-2">

                    <div className="cursor-pointer rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
                    onClick={() => setResumeType("fresher")}>
                        <div className="text-4xl">🎓</div>

                        <h3 className="mt-4 text-xl font-semibold">
                            Fresher
                        </h3>

                        <p className="mt-2 text-gray-600">
                            I&apos;m starting my professional career.
                        </p>
                    </div>

                    <div className="cursor-pointer rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
                    onClick={() =>setResumeType("experienced")}>
                        <div className="text-4xl">💼</div>

                        <h3 className="mt-4 text-xl font-semibold">
                            Experienced
                        </h3>

                        <p className="mt-2 text-gray-600">
                            I have professional work experience.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}