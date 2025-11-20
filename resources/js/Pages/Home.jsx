import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";

export default function Home() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const shorten = async (e) => {
        e.preventDefault();
        setLoading(true);

        setError("");

        try {
            const response = await axios.post("/shorten", {
                original_url: url,
            });

            setShortUrl(response.data.short_url);
        } catch (err) {
            if (err.response && err.response.status === 422) {
                setError(err.response.data.errors.original_url[0]);
            } else {
                setError("Terjadi kesalahan. Coba lagi.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Head title="URL Shortener" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                    {/* Header */}
                    <h1 className="text-3xl font-bold text-center mb-2">
                        URL Shortener
                    </h1>
                    <p className="text-center text-gray-500 mb-8">
                        Masukkan URL panjang lalu buat link pendek dalam 1
                        detik.
                    </p>

                    {/* Form */}
                    <form onSubmit={shorten} className="space-y-4">
                        <input
                            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            placeholder="Masukkan URL..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition disabled:bg-blue-300"
                        >
                            {loading ? "Memproses..." : "Shorten URL"}
                        </button>
                    </form>

                    {/* Result */}
                    {shortUrl && (
                        <div className="mt-8 p-4 rounded-xl bg-gray-100 border border-gray-200">
                            <p className="text-gray-700 mb-1">URL Pendek:</p>

                            <div className="flex items-center justify-between bg-white p-3 rounded-xl border">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    className="text-blue-600 font-medium break-all"
                                >
                                    {shortUrl}
                                </a>

                                <button
                                    onClick={() =>
                                        navigator.clipboard.writeText(shortUrl)
                                    }
                                    className="ml-4 px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                                >
                                    Copy
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
