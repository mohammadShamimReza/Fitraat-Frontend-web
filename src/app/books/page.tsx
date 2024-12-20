"use client";

import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDownload, AiOutlineRead } from "react-icons/ai";
import books from "./book.json"; // Importing the books JSON data

interface Book {
  id: number;
  name: string;
  author: string;
  genre: string;
  description: string;
  image: string;
  pdfUrl: string;
}

const BooksPage: React.FC = () => {
  const handleDownload = (pdfPath: string) => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = pdfPath.split("/").pop() || "download";
    link.click();
  };

  return (
    <div className="min-h-screen px-6 py-12 ">
      <h1 className="text-4xl font-bold text-center mb-8 underline">
        Explore Our Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book: Book) => (
          <div
            key={book.id}
            className="relative group rounded-lg overflow-hidden shadow-lg border"
          >
            {/* Book Image */}
            <Image
              src={book.image}
              alt={book.name}
              width={100}
              height={100}
              className="h-64 w-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {/* Book Details */}
            <div className="p-4">
              <h2 className="text-xl font-bold">{book.name}</h2>
              <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
              <p className="text-xs text-gray-500 italic mb-2">
                Genre: {book.genre}
              </p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {book.description}
              </p>
            </div>
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-4">
              <Link href={`/books/read?pdf=${encodeURIComponent(book.pdfUrl)}`}>
                <Button
                  type="primary"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 flex items-center"
                  icon={<AiOutlineRead className="mr-2" />}
                >
                  Read
                </Button>
              </Link>
              <Button
                type="primary"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 flex items-center"
                icon={<AiOutlineDownload className="mr-2" />}
                onClick={() => handleDownload(book.pdfUrl)}
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
