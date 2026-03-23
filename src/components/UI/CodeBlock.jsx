import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Terminal, Code2, Cpu } from 'lucide-react'
import { cn } from '../../utils/cn'

const codeLines = [
  { text: 'const', color: 'text-purple-400' },
  { text: ' developer ', color: 'text-blue-300' },
  { text: '=', color: 'text-pink-400' },
  { text: ' {', color: 'text-gray-300' },
  { lineBreak: true },
  { text: '  name:', color: 'text-blue-300', indent: true },
  { text: ' "Md Tanveer Alam"', color: 'text-green-400' },
  { text: ',', color: 'text-gray-300' },
  { lineBreak: true },
  { text: '  role:', color: 'text-blue-300', indent: true },
  { text: ' "Full Stack Developer"', color: 'text-green-400' },
  { text: ',', color: 'text-gray-300' },
  { lineBreak: true },
  { lineBreak: true },
  { text: '  skills:', color: 'text-blue-300', indent: true },
  { text: ' [', color: 'text-gray-300' },
  { lineBreak: true },
  { text: '    "React"', color: 'text-green-400', indent: 2 },
  { text: ', ', color: 'text-gray-300' },
  { text: '"Node"', color: 'text-green-400' },
  { text: ', ', color: 'text-gray-300' },
  { text: '"Express"', color: 'text-green-400' },
  { text: ', ', color: 'text-gray-300' },
  { text: '"MongoDB"', color: 'text-green-400' },
  { lineBreak: true },
  { text: '  ]', color: 'text-gray-300', indent: true },
  { text: ',', color: 'text-gray-300' },
  { lineBreak: true },
  { text: '  passion:', color: 'text-blue-300', indent: true },
  { text: ' "Building Scalable Apps"', color: 'text-green-400' },
  { lineBreak: true },
  { text: '};', color: 'text-gray-300' },
]

const CodeBlock = () => {
  const [visibleTokens, setVisibleTokens] = useState(0)
  const [copied, setCopied] = useState(false)
  const [activeTab] = useState('developer.js')

  const fullCodeString = `const developer = {
  name: "Md Tanveer Alam",
  role: "Full Stack Developer",

  skills: [
    "React", "Node", "Express", "MongoDB"
  ],
  passion: "Building Scalable Apps"
};`

  useEffect(() => {
    if (visibleTokens < codeLines.length) {
      const timer = setTimeout(() => {
        setVisibleTokens(prev => prev + 1)
      }, 40)
      return () => clearTimeout(timer)
    }
  }, [visibleTokens])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullCodeString)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy!', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full font-mono text-sm md:text-base relative group"
    >
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-cyan-500/20 rounded-xl blur-lg group-hover:opacity-100 transition duration-1000 opacity-0"></div>

      <div className="relative bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl">
        {/* Header/Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#161b22]/50 border-b border-white/5">
          <div className="flex items-center gap-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-inner" />
              <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-inner" />
            </div>
            
            <div className="hidden sm:flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-2 px-3 py-1 rounded-md text-xs transition-colors cursor-pointer",
                activeTab === 'developer.js' ? "bg-white/5 text-blue-400" : "text-gray-500 hover:text-gray-300"
              )}>
                <Code2 size={14} />
                developer.js
              </div>
              <div className="text-gray-700">|</div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md text-xs text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">
                <Cpu size={14} />
                config.ts
              </div>
            </div>
          </div>

          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md hover:bg-white/5 text-gray-400 hover:text-white transition-all active:scale-95"
            title="Copy Code"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
        </div>

        {/* Code Body */}
        <div className="p-6 overflow-x-auto min-h-[300px]">
          <div className="flex gap-4">
            {/* Line Numbers */}
            <div className="hidden sm:flex flex-col text-gray-600 text-right select-none pr-4 border-r border-white/5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(num => (
                <div key={num}>{num}</div>
              ))}
            </div>

            {/* Code Content */}
            <div className="flex-1 leading-relaxed">
              {codeLines.slice(0, visibleTokens).map((token, i) => (
                <span key={i}>
                  {token.lineBreak ? (
                    <br />
                  ) : (
                    <span className={cn(
                      token.color,
                      token.indent && "ml-4",
                      token.indent === 2 && "ml-8"
                    )}>
                      {token.text}
                    </span>
                  )}
                </span>
              ))}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-5 bg-blue-500 ml-1 align-middle"
              />
            </div>
          </div>
        </div>

        {/* Footer / Status Bar */}
        <div className="px-4 py-1.5 bg-[#161b22]/80 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Terminal size={10} /> UTF-8</span>
            <span>Ln 12, Col 1</span>
          </div>
          <div className="flex gap-4">
            <span>JavaScript</span>
            <span className="text-green-500/80">● Ready</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CodeBlock