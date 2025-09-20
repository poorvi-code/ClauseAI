import React, { useState } from 'react';
import axios from 'axios';
import SummaryView from './SummaryView';

const DocumentUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSummary('');
    if (!file) {
      setError('Please choose a file.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/documents', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSummary(res?.data?.summary || '');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Failed to process document');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="document-upload max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="file"
          accept=".pdf,.docx,.txt"
          onChange={(e) => setFile(e.target.files[0] || null)}
          className="block w-full border p-2 rounded"
        />
        <button
          type="submit"
          disabled={isLoading || !file}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {isLoading ? 'Summarizing…' : 'Summarize'}
        </button>
      </form>

      {isLoading && <p className="mt-4">Processing document…</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
      <div className="mt-6">
        <SummaryView summary={summary} />
      </div>
    </div>
  );
};

export default DocumentUpload;
