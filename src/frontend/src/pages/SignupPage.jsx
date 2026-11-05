import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col items-center justify-start px-md py-xl">
      {/* Brand Identity */}
      <div className="w-full max-w-md flex flex-col items-center mb-xl">
        <div className="mb-md flex items-center justify-center bg-primary-container w-16 h-16 rounded">
          <span className="material-symbols-outlined text-on-primary-container text-[40px]" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-center text-on-surface mb-xs">Create Your Account</h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-center px-sm">Join agencies managing high-performance social workflows.</p>
      </div>

      {/* Signup Form */}
      <div className="w-full max-w-md bg-surface-container border border-outline-variant rounded p-lg">
        <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-mono text-label-mono text-on-surface-variant uppercase" htmlFor="first_name">First Name</label>
              <input className="h-10 px-md border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none font-data-point text-on-surface" id="first_name" placeholder="Alex" type="text" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-mono text-label-mono text-on-surface-variant uppercase" htmlFor="last_name">Last Name</label>
              <input className="h-10 px-md border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none font-data-point text-on-surface" id="last_name" placeholder="Jordan" type="text" />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-mono text-label-mono text-on-surface-variant uppercase" htmlFor="agency_name">Agency Name</label>
            <input className="h-10 px-md border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none font-data-point text-on-surface" id="agency_name" placeholder="Nexus Creative" type="text" />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-mono text-label-mono text-on-surface-variant uppercase" htmlFor="email">Email Address</label>
            <input className="h-10 px-md border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none font-data-point text-on-surface" id="email" placeholder="alex@agency.com" type="email" />
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-mono text-label-mono text-on-surface-variant uppercase" htmlFor="password">Password</label>
            <div className="relative">
              <input className="w-full h-10 px-md border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none font-data-point text-on-surface pr-12" id="password" placeholder="••••••••" type="password" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors" type="button">
                <span className="material-symbols-outlined text-[20px]">visibility</span>
              </button>
            </div>
          </div>

          <button className="w-full h-10 bg-primary text-on-primary font-label-mono text-label-mono uppercase rounded flex items-center justify-center gap-xs hover:bg-primary-container active:scale-[0.98] transition-all mt-lg" type="submit">
            Create Account
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        <div className="relative my-xl flex items-center">
          <div className="flex-grow border-t border-outline-variant"></div>
          <span className="flex-shrink mx-md font-label-mono text-label-mono text-on-surface-variant">Or continue with</span>
          <div className="flex-grow border-t border-outline-variant"></div>
        </div>

        <div className="flex flex-col gap-md">
          <button className="w-full h-10 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-mono text-label-mono rounded flex items-center justify-center gap-md transition-colors">
            Google
          </button>
          <button className="w-full h-10 border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-mono text-label-mono rounded flex items-center justify-center gap-md transition-colors">
            Facebook
          </button>
        </div>
      </div>

      <footer className="mt-xl text-center">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">Sign In</Link>
        </p>
      </footer>
    </div>
  );
}
