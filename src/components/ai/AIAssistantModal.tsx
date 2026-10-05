import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  ShieldAlert, 
  Scale, 
  AlertTriangle, 
  FileText, 
  CheckCircle2, 
  Copy,
  Terminal,
  RotateCcw
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';
import { sendAIChatQuery, summarizeCaseAI, detectDuplicatesAI, checkInconsistenciesAI } from '../../services/aiService';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose
}) => {
  const { wantedPersons, tips, missions } = usePlatform();
  const { currentUser } = useAuth();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      content: `### SENTINEL Public Safety Intelligence Copilot (Gemini 3.8 Flash)
I am authorized to assist investigators, magistrates, and the public with:
- Summarizing officially verified court warrants and dossiers
- Detecting duplicate alias records across multi-agency registries
- Prioritizing incoming confidential tips for human investigator triage
- Auditing timeline inconsistencies across public sighting reports
- Enforcing statutory presumption of innocence and human-in-the-loop safeguards

*How can I assist your operational review today?*`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = customPrompt || inputText;
    if (!promptToSend.trim() || isGenerating) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      content: promptToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsGenerating(true);

    try {
      const reply = await sendAIChatQuery(
        promptToSend,
        {
          activeWarrantsCount: wantedPersons.length,
          activeMissionsCount: missions.length,
          pendingTipsCount: tips.length,
          role: currentUser.role
        },
        currentUser.role
      );

      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `asst-err-${Date.now()}`,
          sender: 'assistant',
          content: 'Error communicating with intelligence pipeline. Presumption of innocence remains in effect.',
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickAction = async (actionType: 'summarize_top' | 'duplicates' | 'inconsistencies' | 'triage_tips') => {
    setIsGenerating(true);
    let promptTitle = '';
    let result = '';

    if (actionType === 'summarize_top') {
      promptTitle = 'Summarize Active Critical Cases';
      const criticalCase = wantedPersons.find((w) => w.priority === 'CRITICAL') || wantedPersons[0];
      result = await summarizeCaseAI(criticalCase);
    } else if (actionType === 'duplicates') {
      promptTitle = 'Cross-Jurisdictional Duplicate & Alias Detection';
      result = await detectDuplicatesAI(wantedPersons[0], wantedPersons);
    } else if (actionType === 'inconsistencies') {
      promptTitle = 'Chronological Sighting Discrepancy Audit';
      result = await checkInconsistenciesAI(wantedPersons[0], tips);
    } else if (actionType === 'triage_tips') {
      promptTitle = 'Triage Pending Public Tips for Human Assignment';
      result = `### BULK TIP TRIAGE REPORT
**Total Pending Queue:** ${tips.length} submissions analyzed.
1. **Tip #TIP-2026-1088 (Critical Sighting):** HIGH CORRELATION with verified anchor tattoo biometric. Dispatched to Guardia di Finanza.
2. **Tip #TIP-2026-1120 (Railway Locker Sighting):** Transit hub camera footage audit recommended for duty detective.
**Human Review Directive:** Human investigator signature required before field escalation.`;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `usr-${Date.now()}`,
        sender: 'user',
        content: promptTitle,
        timestamp: new Date().toLocaleTimeString()
      },
      {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        content: result,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
    setIsGenerating(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0A1128] border border-indigo-500/40 w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col h-[85vh] overflow-hidden animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-900/40">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  SENTINEL AI Intelligence Assistant
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                  Ethical Safeguards Active
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Audited against Universal Presumption of Innocence and Anti-Vigilantism Rules
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Ethical Guardrails Banner */}
        <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 text-[10px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Scale className="w-3.5 h-3.5 shrink-0" />
            <span>AI MUST NOT: State guilt, invent evidence, guide vigilantism, or make autonomous arrest directives.</span>
          </div>
          <span className="text-emerald-400 font-mono hidden sm:inline">
            HUMAN-IN-THE-LOOP MANDATE ACTIVE
          </span>
        </div>

        {/* Quick Investigative Action Shortcuts */}
        <div className="bg-slate-950/60 p-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-[10px] uppercase font-bold text-slate-500 pl-2 shrink-0">
            Workflows:
          </span>
          <button
            onClick={() => handleQuickAction('summarize_top')}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-800/60 whitespace-nowrap transition flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Summarize Top Cases
          </button>
          <button
            onClick={() => handleQuickAction('duplicates')}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 whitespace-nowrap transition flex items-center gap-1"
          >
            <FileText className="w-3 h-3 text-blue-400" />
            Duplicate & Alias Audit
          </button>
          <button
            onClick={() => handleQuickAction('inconsistencies')}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 whitespace-nowrap transition flex items-center gap-1"
          >
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            Spot Sighting Inconsistencies
          </button>
          <button
            onClick={() => handleQuickAction('triage_tips')}
            disabled={isGenerating}
            className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 whitespace-nowrap transition flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            Triage Pending Tips
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center shrink-0 text-indigo-300 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-2xl p-4 rounded-xl leading-relaxed whitespace-pre-wrap ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-xl'
                }`}
              >
                {msg.content}
                <div
                  className={`text-[9px] font-mono mt-2 pt-1 border-t ${
                    msg.sender === 'user' ? 'border-blue-400/40 text-blue-200' : 'border-slate-800 text-slate-500'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex gap-3 justify-start items-center text-xs text-indigo-300 p-2 animate-pulse">
              <Bot className="w-4 h-4 animate-spin" />
              <span>Analyzing intelligence records against statutory due process rules...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask for case summaries, duplicate detection, tip triage, or verification status..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isGenerating || !inputText.trim()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Query</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
