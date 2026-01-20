import {
  PiGithubLogoBold,
  PiLinkedinLogoBold,
  PiTwitterLogoBold,
} from 'react-icons/pi';

function Footer() {
  return (
    <footer className="">
      <div className="footer sm:footer-horizontal border-base-content/20 mx-auto max-w-6xl gap-10 border-t p-8 text-neutral-600">
        {/* Brand / Identity */}
        <aside className="space-y-3">
          {/* KEEP THIS SVG AS REQUESTED */}
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="fill-current text-neutral-800"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>

          <p className="max-w-xs text-sm leading-relaxed">
            Personal blog by{' '}
            <span className="font-medium text-neutral-800">Sameer</span>.
            Writing about building real web applications, learning in public,
            and the decisions behind the code.
          </p>

          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} devxsameer
          </p>
        </aside>

        {/* Navigation */}
        <nav className="space-y-3">
          <h6 className="footer-title">Explore</h6>
          <div className="flex flex-col gap-2 text-sm">
            <a href="/posts" className="link-hover">
              Blog posts
            </a>
            <a
              href="https://devxsameer.me"
              target="_blank"
              rel="noreferrer"
              className="link-hover"
            >
              Portfolio
            </a>
            <a
              href="https://github.com/devxsameer/blog-platform"
              target="_blank"
              rel="noreferrer"
              className="link-hover"
            >
              Github Repo
            </a>
          </div>
        </nav>

        {/* Social / Presence */}
        <nav className="space-y-3">
          <h6 className="footer-title">Find me</h6>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href="https://github.com/devxsameer"
              target="_blank"
              rel="noreferrer"
              className="link-hover flex items-center gap-2"
            >
              <PiGithubLogoBold size={18} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/devxsameer"
              target="_blank"
              rel="noreferrer"
              className="link-hover flex items-center gap-2"
            >
              <PiLinkedinLogoBold size={18} />
              LinkedIn
            </a>
            <a
              href="https://x.com/devxsameer"
              target="_blank"
              rel="noreferrer"
              className="link-hover flex items-center gap-2"
            >
              <PiTwitterLogoBold size={18} />X (Twitter)
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
