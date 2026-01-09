export default function Resume() {
  return (
    <div className="max-w-2xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8 text-primary">Resume</h1>
      <p className="text-xl text-text-secondary leading-relaxed">
        I'm a passionate designer with a knack for solving problems.
        (Content coming soon!)
      </p>
      <p className="mt-4 text-xl text-text-secondary leading-relaxed">
        Email me : hamzaziyard.ux@gmail.com
      </p>

      <a
        href="https://assets.hamzaziyard.com/CV/resume/Hamza%20Ziyard-CV.pdf"
        download="Hamza_Ziyard_CV.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 px-8 py-4 bg-primary text-background inline-block hover:shadow-lg transition-all rounded-sm font-bold"
      >
        Download resume
      </a>
    </div>
  );
}