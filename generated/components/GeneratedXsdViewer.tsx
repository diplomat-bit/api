import React, { useState } from 'react';
import { 
  FileCode, Layers, Search, Copy, Check, Download, ChevronRight, 
  ChevronDown, ExternalLink, ShieldCheck, Tag
} from 'lucide-react';
import { SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml } from './specs/SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml';
import { SpecUI_XML_Schema_Common_Groups_xsd_xml } from './specs/SpecUI_XML_Schema_Common_Groups_xsd_xml';

export const GeneratedXsdViewer: React.FC = () => {
  const [activeSchema, setActiveSchema] = useState<'complextypes' | 'groups'>('complextypes');

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Schema Selector Bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-semibold text-white tracking-wide">Enterprise XML Schema Definitions</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveSchema('complextypes')}
              className={`px-3 py-1 rounded-md transition font-medium cursor-pointer ${
                activeSchema === 'complextypes'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Common_ComplexTypes.xsd.xml (42 Types)
            </button>
            <button
              onClick={() => setActiveSchema('groups')}
              className={`px-3 py-1 rounded-md transition font-medium cursor-pointer ${
                activeSchema === 'groups'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Common_Groups.xsd.xml (28 Groups)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
            Target Namespace: urn:visa:schema:common:v5
          </span>
        </div>
      </div>

      {/* Render selected XSD UI */}
      <div className="flex-1 min-h-0">
        {activeSchema === 'complextypes' ? (
          <SpecUI_XML_Schema_Common_ComplexTypes_xsd_xml />
        ) : (
          <SpecUI_XML_Schema_Common_Groups_xsd_xml />
        )}
      </div>
    </div>
  );
};
