const hashtagStack = ["#ControlV2", "#CreativeOps", "#DesignSystem", "#WorkflowAutomation", "#AgencyLife"];

export default function ContentBuilderPage() {
  return (
    <div className="h-[calc(100vh-56px-24px)] flex overflow-hidden">
      {/* LEFT: Content Builder (75%) */}
      <section className="w-3/4 flex flex-col border-r border-outline-variant overflow-y-auto relative">
        {/* Builder Header */}
        <div className="sticky top-0 bg-surface z-30 p-panel-padding border-b border-outline-variant flex flex-col gap-md">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter">Content Builder</h1>
              <span className="font-label-mono text-label-mono text-primary opacity-60">MODULE: CONTENT_GEN_V4</span>
            </div>
            <div className="flex bg-surface-container-low border border-outline-variant p-0.5">
              <button className="px-md py-1.5 text-label-mono font-label-mono bg-primary text-on-primary">IG Feed</button>
              <button className="px-md py-1.5 text-label-mono font-label-mono text-on-surface-variant hover:bg-surface-variant">IG Stories</button>
              <button className="px-md py-1.5 text-label-mono font-label-mono text-on-surface-variant hover:bg-surface-variant">FB Feed</button>
            </div>
          </div>
        </div>

        <div className="p-panel-padding flex flex-col gap-lg pb-32">
          {/* Post Preview */}
          <div className="flex justify-center py-xl bg-surface-container-lowest border-b border-outline-variant/30">
            <div className="w-[380px] bg-surface-container border border-outline-variant overflow-hidden">
              <div className="p-sm flex items-center gap-sm border-b border-outline-variant">
                <div className="w-8 h-8 bg-surface-container-high rounded-full border border-outline-variant"></div>
                <span className="font-label-mono text-label-mono text-on-surface">agency_control</span>
                <span className="material-symbols-outlined ml-auto text-[18px]">more_horiz</span>
              </div>
              <div className="aspect-square bg-surface-container-highest relative group flex items-center justify-center text-outline-variant">
                <span className="material-symbols-outlined text-[48px]">image</span>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-surface/80 backdrop-blur px-md py-sm border border-primary text-primary font-label-mono text-label-mono">CHANGE ASSET</button>
                </div>
              </div>
              <div className="p-panel-padding">
                <div className="flex gap-md mb-sm">
                  <span className="material-symbols-outlined">favorite</span>
                  <span className="material-symbols-outlined">mode_comment</span>
                  <span className="material-symbols-outlined">send</span>
                  <span className="material-symbols-outlined ml-auto">bookmark</span>
                </div>
                <div className="font-label-mono text-label-mono mb-1">1,204 likes</div>
                <p className="font-body-md text-body-md line-clamp-2 text-on-surface-variant">
                  <span className="font-bold text-on-surface mr-1">agency_control</span>
                  Synthesizing new vertical workflows for the upcoming quarter. Visual assets now optimized for multi-platform delivery. #ControlV2 #CreativeOps
                </p>
              </div>
            </div>
          </div>

          {/* Caption Editor */}
          <div className="flex flex-col border border-outline-variant bg-surface-container-low">
            <div className="flex justify-between items-center p-sm border-b border-outline-variant bg-surface-container">
              <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Caption Editor</span>
              <span className="font-label-mono text-label-mono text-primary bg-primary-container/10 px-2 py-0.5">812 / 2200</span>
            </div>
            <div className="flex h-48">
              <div className="w-10 bg-surface-container border-r border-outline-variant flex flex-col items-center py-2 text-[10px] font-label-mono text-outline opacity-40 select-none gap-0">
                {Array.from({ length: 8 }, (_, i) => (
                  <span key={i}>{String(i + 1).padStart(2, "0")}</span>
                ))}
              </div>
              <textarea
                className="flex-1 bg-transparent border-none focus:ring-0 p-panel-padding font-data-point text-data-point text-on-surface resize-none"
                placeholder="Enter post caption here..."
                defaultValue={`Synthesizing new vertical workflows for the upcoming quarter. Visual assets now optimized for multi-platform delivery.\n\n#ControlV2 #CreativeOps #DesignSystem #WorkflowAutomation #AgencyLife`}
              />
            </div>
          </div>

          {/* Hashtag Stack */}
          <div className="flex flex-col gap-sm">
            <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Hashtag Stack</span>
            <div className="flex flex-wrap gap-sm">
              {hashtagStack.map((tag) => (
                <div key={tag} className="px-sm py-1 bg-surface-container border border-outline-variant font-label-mono text-label-mono text-primary flex items-center gap-1">
                  {tag} <span className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
                </div>
              ))}
              <button className="px-sm py-1 border border-dashed border-outline-variant font-label-mono text-label-mono text-outline hover:border-primary hover:text-primary">+ ADD TAG</button>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-surface-container border-t border-outline-variant px-panel-padding flex items-center justify-between z-40 backdrop-blur-sm bg-surface-container/90">
          <div className="flex flex-col">
            <div className="flex items-center gap-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="text-label-mono font-label-mono text-on-surface uppercase">Next publish: today 14:30</span>
            </div>
            <span className="text-[10px] font-label-mono text-outline opacity-50">SYS: CACHE_SYNC_COMPLETE</span>
          </div>
          <div className="flex gap-md">
            <button className="px-lg py-md border border-primary text-primary font-label-mono text-label-mono hover:bg-primary/10 transition-colors uppercase tracking-widest active:scale-95">Send to Approval</button>
            <button className="px-xl py-md bg-primary-container text-on-primary-container font-label-mono text-label-mono hover:opacity-90 transition-opacity uppercase tracking-widest font-bold active:scale-95 shadow-lg shadow-primary-container/10">Schedule</button>
          </div>
        </div>
      </section>

      {/* RIGHT: Publish & Compliance (25%) */}
      <aside className="w-1/4 bg-surface-container-low flex flex-col overflow-y-auto p-panel-padding gap-lg">
        <div className="flex flex-col gap-xs">
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tighter uppercase">Publish &amp; Compliance</h2>
          <div className="h-1 w-8 bg-primary"></div>
        </div>

        {/* Compliance Warning */}
        <div className="flex flex-col gap-md">
          <span className="font-label-mono text-label-mono text-on-surface-variant uppercase">Critical Checks</span>
          <div className="bg-[#FFB020]/10 border border-[#FFB020] p-md flex gap-md">
            <span className="material-symbols-outlined text-[#FFB020]">warning</span>
            <div className="flex flex-col">
              <span className="font-label-mono text-[11px] text-[#FFB020] font-bold">IMAGE_DPI_LOW</span>
              <p className="font-body-md text-[13px] text-on-surface-variant leading-tight">Asset resolution below 300dpi. May appear pixelated on high-res displays.</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-lg">
          <div className="flex flex-col gap-sm">
            <label className="font-label-mono text-label-mono text-on-surface-variant uppercase">Publish Time</label>
            <div className="flex items-center gap-sm bg-surface-container border border-outline-variant p-md hover:border-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-primary text-[18px]">calendar_today</span>
              <span className="font-data-point text-data-point">2023-11-24 14:30:00</span>
            </div>
          </div>
          <div className="flex flex-col gap-sm">
            <label className="font-label-mono text-label-mono text-on-surface-variant uppercase">Timezone</label>
            <div className="flex items-center gap-sm bg-surface-container border border-outline-variant p-md">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">public</span>
              <span className="font-data-point text-data-point text-on-surface">UTC-08:00 (Pacific Time)</span>
            </div>
          </div>
          <div className="flex flex-col gap-sm">
            <label className="font-label-mono text-label-mono text-on-surface-variant uppercase">Audience Targeting</label>
            <div className="flex items-center gap-sm bg-surface-container border border-outline-variant p-md">
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">language</span>
              <span className="font-data-point text-data-point text-on-surface">Global Distribution</span>
            </div>
          </div>
          <div className="flex flex-col gap-sm">
            <div className="flex justify-between items-center">
              <label className="font-label-mono text-label-mono text-on-surface-variant uppercase">Link Rules</label>
              <div className="w-10 h-5 bg-primary-container relative cursor-pointer rounded-sm">
                <div className="absolute top-1 right-1 w-3 h-3 bg-on-primary-container rounded-sm"></div>
              </div>
            </div>
            <span className="font-label-mono text-[11px] text-primary opacity-60">Status: ENABLED (AUTO_UTM_TAGGING)</span>
          </div>
        </div>

        <div className="mt-auto border-t border-outline-variant pt-lg flex flex-col gap-md">
          <div className="flex justify-between font-label-mono text-label-mono">
            <span className="text-on-surface-variant">Estimated Reach</span>
            <span className="text-on-surface">12.4k - 18.2k</span>
          </div>
          <div className="flex justify-between font-label-mono text-label-mono">
            <span className="text-on-surface-variant">Quality Score</span>
            <span className="text-primary font-bold">88/100</span>
          </div>
          <div className="w-full bg-surface-container h-1 overflow-hidden">
            <div className="bg-primary h-full w-[88%]"></div>
          </div>
        </div>
      </aside>
    </div>
  );
}
