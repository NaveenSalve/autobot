import { useRef, useState } from 'react';
import { FileText, UploadCloud } from 'lucide-react';
import { api } from '../lib/api';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/Card';

export function ResumeUploader({ onExtracted }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Upload PDF, DOCX, TXT, MD, or RTF. AI will extract your BD profile.');

  async function handleFile(file) {
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    setMessage('Parsing and extracting profile...');
    try {
      const result = await api.uploadProfile(file);
      onExtracted?.(result.profile);
      setMessage(`Extracted profile from ${result.filename || file.name} (${result.chars || 0} chars). Review before saving.`);
    } catch (error) {
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return <Card className="border-dashed">
    <CardContent>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"><FileText size={20}/></div>
          <div>
            <h3 className="font-semibold">Resume / profile upload</h3>
            <p className="mt-1 text-sm text-muted">{message}</p>
            {fileName && <p className="mt-1 text-xs text-subtle">Selected: {fileName}</p>}
          </div>
        </div>
        <input ref={inputRef} type="file" accept=".pdf,.docx,.txt,.md,.rtf" className="hidden" onChange={e => handleFile(e.target.files?.[0])}/>
        <Button type="button" variant="secondary" disabled={loading} onClick={() => inputRef.current?.click()}><UploadCloud size={16}/>{loading ? 'Extracting...' : 'Upload'}</Button>
      </div>
    </CardContent>
  </Card>;
}
