import { TypeAnimation } from "react-type-animation";

const CodeBlock = () => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden
                    bg-[#0f172a] border border-purple-500/30
                    shadow-[0_0_40px_rgba(168,85,247,0.12)]">

      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#111827] border-b border-purple-500/20">
        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>

      {/* Code */}
      <div className="p-6 font-mono text-sm md:text-base leading-relaxed">
        <pre className="whitespace-pre-wrap text-green-400">

          <span className="text-purple-400 font-semibold">const</span> developer = {"{"}

          {"\n  "}name: "<TypeAnimation
            sequence={["Md Tanveer Alam", 2000]}
            speed={50}
            repeat={Infinity}
            wrapper="span"
          />",

          {"\n  "}role: "Full Stack Developer",

          {"\n  "}frontend: ["React", "Tailwind", "JavaScript"],

          {"\n  "}backend: ["Node", "Express", "REST API"],

          {"\n  "}database: ["MongoDB", "MySQL"],

          {"\n  "}tools: ["Git", "GitHub", "Postman"],

          {"\n  "}hireable: <span className="text-purple-400">true</span>

          {"\n"}{"};"}

        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;