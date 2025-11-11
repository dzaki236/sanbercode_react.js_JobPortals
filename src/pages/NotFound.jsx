import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
            <div className="max-w-4xl w-full grid gap-8 md:grid-cols-2 items-center">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
                    <p className="text-gray-600 mb-6">
                        Oops — Halaman tidak ditemukan!.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-3">
                        <Link to="/" aria-label="Go to homepage">
                            <Button color="light">
                                Kembali
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
