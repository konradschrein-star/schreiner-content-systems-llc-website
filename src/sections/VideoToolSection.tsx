
export function VideoToolSection() {
  return (
    <section className="w-full flex flex-col items-center py-16 bg-black text-white">
      <h2 className="text-2xl font-bold mb-4">Video Tool Announcement</h2>
      <p className="max-w-xl text-center mb-6 text-lg">
        We are developing a tool to produce videos like the ones you can see on these channels:
        <br />
        <a href="https://www.youtube.com/@Blackfiles-HD" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">Blackfiles-HD</a>
        {" "}
        &amp;
        {" "}
        <a href="https://www.youtube.com/@ThePaintExplainer" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">ThePaintExplainer</a>.
      </p>
      <div className="flex gap-8 justify-center">
        <img src="/images/software.png" alt="Example Video 1" className="w-64 h-auto rounded shadow-lg border border-white/10" />
        <img src="/images/software 2.png" alt="Example Video 2" className="w-64 h-auto rounded shadow-lg border border-white/10" />
      </div>
    </section>
  );
}
