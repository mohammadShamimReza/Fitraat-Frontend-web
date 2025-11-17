import Link from 'next/link';

export default function Support() {
      const palastineHelpUrl =
        process.env.NEXT_PUBLIC_PALESTINE_HELP_URL || "palastineHelpUrl";
  return (
    <div className="w-full bg-gray-800 text-white py-1 px-2 flex justify-center items-center space-x-4 text-xs md:text-sm lg:text-base whitespace-nowrap overflow-hidden">
      <span className="font-semibold">Stand with Palestine 🇧🇩</span>
      <Link target="blank" href={palastineHelpUrl} passHref>
        <p
          className="underline font-semibold hover:text-gray-200 transition-colors duration-200"
          rel="noopener noreferrer"
        >
          Support 🇵🇸
        </p>
      </Link>
    </div>
  );
}
