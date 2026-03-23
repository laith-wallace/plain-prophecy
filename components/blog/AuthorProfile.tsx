import { Twitter, Linkedin, ExternalLink } from "lucide-react";
import Image from "next/image";

interface AuthorProfileProps {
  name: string;
  bio?: string;
  image?: string;
  twitter?: string;
  linkedin?: string;
}

export default function AuthorProfile({
  name,
  bio,
  image,
  twitter,
  linkedin,
}: AuthorProfileProps) {
  return (
    <div className="bg-stone-900/50 border border-stone-800 rounded-2xl p-6 sm:p-8 mt-12">
      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        {image && (
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-amber-500/20 shrink-0">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-stone-100">{name}</h3>
              <p className="text-xs text-amber-500 uppercase tracking-widest font-semibold mt-1">
                Author
              </p>
            </div>
            <div className="flex items-center gap-2">
              {twitter && (
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-stone-400 hover:text-amber-500 transition-colors bg-stone-800 rounded-lg hover:bg-stone-700"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {linkedin && (
                <a
                  href={`https://linkedin.com/in/${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-stone-400 hover:text-amber-500 transition-colors bg-stone-800 rounded-lg hover:bg-stone-700"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          
          {bio && (
            <p className="text-stone-400 leading-relaxed text-sm italic">
              "{bio}"
            </p>
          )}

          <div className="pt-2 flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5 text-stone-500">
              <span className="w-1 h-1 rounded-full bg-stone-700"></span>
              Expert Review Complete
            </div>
            <div className="flex items-center gap-1.5 text-stone-500">
              <span className="w-1 h-1 rounded-full bg-stone-700"></span>
              Verified Source
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
