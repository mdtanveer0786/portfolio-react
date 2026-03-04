import { useEffect, useState } from "react";

const fullCode = `const developer = {
  name: "Md Tanveer Alam",
  role: "Full Stack Developer",

  frontend: ["React", "Tailwind", "JavaScript"],
  backend: ["Node", "Express", "REST API"],
  database: ["MongoDB", "MySQL"],
  tools: ["Git", "GitHub", "Postman"],

  hireable: true
};`;

const CodeBlock = () => {
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setTypedText(fullCode.slice(0, index));
      index++;
      if (index > fullCode.length) clearInterval(typing);
    }, 25);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden
                    bg-[#0d1117] border border-indigo-500/30
                    shadow-[0_0_40px_rgba(99,102,241,0.15)]">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#161b22] border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          developer.js
        </span>
      </div>

      {/* Code Area */}
      <div className="relative p-6 font-mono text-sm md:text-base whitespace-pre-wrap">

        {/* Invisible full code to fix height */}
        <div className="invisible">
          {fullCode}
        </div>

        {/* Typed text overlay */}
        <div className="absolute top-6 left-6 text-green-400">
          {typedText}
          <span className="animate-pulse">|</span>
        </div>

      </div>
    </div>
  );
};

export default CodeBlock;