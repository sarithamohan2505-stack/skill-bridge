import React, { useState } from 'react';
import { FLASK_PROJECT_FILES } from '../data/flaskProjectFiles';
import { downloadFlaskProjectZip } from '../utils/zipGenerator';
import { Download, FolderTree, Code2, Terminal, Check, Copy, X, FileText, CheckCircle2 } from 'lucide-react';

interface ProjectSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectSourceModal: React.FC<ProjectSourceModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('app.py');
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'instructions'>('code');

  if (!isOpen) return null;

  const currentFile = FLASK_PROJECT_FILES.find(f => f.path === selectedFile) || FLASK_PROJECT_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    try {
      setDownloading(true);
      await downloadFlaskProjectZip();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Failed to generate zip', err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl h-[88vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FolderTree className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg flex items-center gap-2">
                Python Flask Project Deliverable & Source Code
                <span className="text-xs bg-amber-400/20 text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded-full font-mono">
                  Ready to Run in VS Code
                </span>
              </h3>
              <p className="text-xs text-blue-200">
                Complete college submission package with SQLite, templates, CSV dataset, and Windows launch guide.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={downloading}
              className="flex items-center gap-2 px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs rounded-xl shadow-md transition disabled:opacity-70"
            >
              {downloading ? (
                <span>Generating ZIP...</span>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Complete ZIP</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-4 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'code'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            Browse Files & Source Code
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-3 flex items-center gap-2 border-b-2 transition ${
              activeTab === 'instructions'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4" />
            Windows & VS Code Execution Guide
          </button>
        </div>

        {/* Modal Body */}
        {activeTab === 'code' ? (
          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar File Tree */}
            <div className="w-64 border-r border-slate-200 bg-slate-50/70 p-3 overflow-y-auto">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
                Project Structure
              </div>
              <div className="space-y-1">
                {FLASK_PROJECT_FILES.map((file) => (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file.path)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono flex items-center justify-between transition ${
                      selectedFile === file.path
                        ? 'bg-blue-600 text-white font-bold shadow-sm'
                        : 'text-slate-700 hover:bg-slate-200/70'
                    }`}
                  >
                    <span className="truncate">{file.path}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded uppercase ${
                        selectedFile === file.path
                          ? 'bg-blue-700 text-blue-100'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {file.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content Display */}
            <div className="flex-1 flex flex-col overflow-hidden bg-slate-900 text-slate-100">
              <div className="px-4 py-2 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-300">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span>student_skill_gap_system/{currentFile.path}</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1 bg-slate-700 hover:bg-slate-600 rounded text-slate-200 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-slate-200">
                <pre>{currentFile.content}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-600" />
                  Quick Run on Windows Laptop with VS Code
                </h4>
                <p className="text-slate-600 text-sm mb-4">
                  Follow these 5 simple steps to extract and execute the complete Flask + SQLite system locally for your college project viva:
                </p>

                <ol className="space-y-4 text-sm">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <strong className="text-slate-800">Download and Extract ZIP</strong>
                      <p className="text-slate-600 text-xs mt-1">
                        Click the yellow <strong>"Download Complete ZIP"</strong> button above. Right-click the downloaded <code>student_skill_gap_system.zip</code> and select <strong>Extract All...</strong>.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <strong className="text-slate-800">Open Folder in Visual Studio Code</strong>
                      <p className="text-slate-600 text-xs mt-1">
                        Open VS Code, go to <code>File &gt; Open Folder</code>, and select the extracted <code>student_skill_gap_system</code> folder. Press <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 border rounded text-[11px]">`</kbd> to open the integrated terminal.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <strong className="text-slate-800">Create & Activate Virtual Environment</strong>
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs my-2">
                        python -m venv venv<br />
                        .\venv\Scripts\activate
                      </div>
                      <p className="text-slate-500 text-xs">
                        Then install requirements: <code>pip install -r requirements.txt</code>
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">4</span>
                    <div>
                      <strong className="text-slate-800">Initialize SQLite Database</strong>
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs my-2">
                        python database/init_db.py
                      </div>
                      <p className="text-slate-500 text-xs">
                        This creates <code>skill_gap.db</code> and seeds courses and sample student profiles.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0">5</span>
                    <div>
                      <strong className="text-slate-800">Launch Flask Server</strong>
                      <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs my-2">
                        python app.py
                      </div>
                      <p className="text-slate-600 text-xs">
                        Open your web browser and go to: <strong className="text-blue-600">http://127.0.0.1:5000</strong>
                      </p>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                <strong>Project Viva Tip:</strong> When presenting to your college professor, showcase the formula in <code>app.py</code>: <code>Missing Skills = Required Skills − Existing Skills</code> and explain how the SQLite database records assessments linked to student foreign keys.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
