const SummaryView = ({ summary }) => {
return (
<div className="summary-container border-l-4 border-blue-500 bg-blue-50 p-4 rounded">
<h3 className="font-semibold text-lg mb-2">Document Summary</h3>
<div className="summary-content whitespace-pre-wrap">
{summary || 'Upload a document to see the summary'}
</div>
</div>
);
};


export default SummaryView;