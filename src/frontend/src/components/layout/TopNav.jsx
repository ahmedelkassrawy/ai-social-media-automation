export default function TopNav() {
  return (
    <header className="h-[56px] sticky top-0 flex items-center bg-surface-container border-b border-outline-variant z-40 px-panel-padding justify-between">
      <div className="flex items-center space-x-md">
        <span className="font-headline-md text-headline-md font-bold text-on-surface flex items-center cursor-pointer hover:text-primary transition-colors">
          Mission Control <span className="material-symbols-outlined text-[20px] ml-xs">arrow_drop_down</span>
        </span>
        <div className="h-4 w-px bg-outline-variant mx-sm"></div>
        <nav className="hidden md:flex space-x-md">
          <a className="font-body-md text-body-md text-primary font-bold border-b-2 border-primary pb-[16px] pt-[16px]" href="#">Direct Access</a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors pt-[16px]" href="#">Live Stream</a>
        </nav>
      </div>
      <div className="flex items-center space-x-md">
        <div className="hidden md:flex items-center bg-surface-container-highest rounded px-sm py-xs border border-outline-variant focus-within:border-primary transition-colors">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-xs">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-data-point font-data-point text-on-surface w-[150px] p-0 placeholder-on-surface-variant outline-none"
            placeholder="Search..."
            type="text"
          />
        </div>
        <div className="flex items-center space-x-sm text-on-surface-variant">
          <button className="p-xs hover:text-primary transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-xs hover:text-primary transition-colors">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </div>
        <button className="bg-primary text-on-primary font-label-mono text-label-mono px-md py-xs rounded hover:bg-primary-container transition-colors">
          New Post
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant ml-sm cursor-pointer hover:border-primary transition-colors bg-surface-variant">
          <div className="w-full h-full flex items-center justify-center text-on-surface-variant text-[12px] font-bold">MC</div>
        </div>
      </div>
    </header>
  );
}
