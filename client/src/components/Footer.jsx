import { HugeiconsIcon } from "@hugeicons/react";
import {
  Github01FreeIcons,
  TwitterFreeIcons,
  Linkedin01FreeIcons,
} from "@hugeicons/core-free-icons";
function Footer() {
  return (
    <footer className="page-container relative pb-5 pt-10 border-t border-white/5 bg-[#050914]/60 backdrop-blur-xl">
     <div className="mx-auto w-full max-w-[1500px] px-8 xl:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#4a7dff] to-[#22d3ee]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2v6h6M9 13l2 2 4-4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-mono text-xl text-white">
                HireSense Ai
              </span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-[#a5b4d0] max-w-sm">
              The private Azure AI copilot for resumes that actually land
              interviews.
            </p>
          </div>
          {[
            {
              title: "Product",
              links: ["Features", "Workflow", "Preview", "Architecture"],
            },
            {
              title: "Company",
              links: ["About", "Privacy", "Terms", "Contact"],
            },
            {
              title: "Resources",
              links: ["Docs", "Changelog", "Support", "GitHub"],
            },
          ].map((col) => (
            <div key={col.title}>
              <div className="eyebrow"> {col.title}</div>
              <ul className="mt-5 space-y-3 text-center">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[15px] text-[#dbe4ff] hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <p className="font-mono text-xs text-[#ffffff]">
            © 2026 HireSense Ai · Built with Azure OpenAI
          </p>
          <div className="flex items-center gap-3">
            {[
              {
                icon: Github01FreeIcons,
                href: "https://github.com/harshsharma-02",
              },
              {
                icon: TwitterFreeIcons,
                href: "https://x.com/yourusername",
              },
              {
                icon: Linkedin01FreeIcons,
                href: "https://linkedin.com/in/harsh-sharma-010355256",
              },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[#a5b4d0] hover:text-white hover:border-white/25 transition"
              >
                <HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
