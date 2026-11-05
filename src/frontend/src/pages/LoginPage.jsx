import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-lg h-14 bg-surface-container border-b border-outline-variant">
        <div className="font-headline-md text-headline-md font-bold text-primary">Mission Control</div>
        <div className="flex items-center gap-md">
          <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Help">help_outline</button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center pt-14 px-md">
        <div className="w-full max-w-[440px] bg-surface-container border border-outline-variant rounded p-xl">
          <div className="text-center mb-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-container rounded mb-md">
              <span className="material-symbols-outlined text-on-primary-container text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-xs">Welcome Back</h1>
            <p className="font-body-md text-on-surface-variant">Manage your social presence with precision.</p>
          </div>

          <form className="space-y-lg" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-base">
              <label className="font-label-mono text-label-mono text-on-surface-variant block uppercase" htmlFor="email">Email address</label>
              <input className="w-full h-10 px-md border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-data-point text-on-surface" id="email" placeholder="name@company.com" type="email" />
            </div>

            <div className="space-y-base">
              <div className="flex justify-between items-center">
                <label className="font-label-mono text-label-mono text-on-surface-variant uppercase" htmlFor="password">Password</label>
                <a className="font-label-mono text-label-mono text-primary hover:underline transition-colors" href="#">Forgot Password?</a>
              </div>
              <div className="relative">
                <input className="w-full h-10 px-md pr-xl border border-outline-variant rounded bg-surface-container-lowest focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all font-data-point text-on-surface" id="password" placeholder="••••••••" type="password" />
                <button className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                  <span className="material-symbols-outlined text-[20px]">visibility</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-xs">
              <input className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer bg-surface-container-lowest" id="remember" type="checkbox" />
              <label className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none" htmlFor="remember">Keep me signed in for 30 days</label>
            </div>

            <button className="w-full h-10 bg-primary text-on-primary font-label-mono text-label-mono uppercase rounded hover:bg-primary-container active:scale-[0.98] transition-all" type="submit">
              Sign In
            </button>
          </form>

          <div className="mt-xl pt-lg border-t border-outline-variant text-center">
            <p className="font-body-md text-on-surface-variant">New to Mission Control? <Link to="/register" className="text-primary font-label-mono hover:underline">Create an Account</Link></p>
          </div>
        </div>
      </main>

      <footer className="w-full py-lg px-lg flex flex-col md:flex-row justify-between items-center gap-md bg-surface-container-lowest border-t border-outline-variant">
        <div className="font-headline-md text-headline-md font-bold text-primary">Mission Control</div>
        <div className="flex gap-lg">
          <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
        <p className="font-label-mono text-[10px] text-on-surface-variant">© 2024 Shutter Agency. All rights reserved.</p>
      </footer>
    </div>
  );
}
