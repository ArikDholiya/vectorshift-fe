import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const { nodes, edges } = useStore((state) => ({
        nodes: state.nodes,
        edges: state.edges,
    }));
    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:8000';

    const handleSubmit = async () => {
        setIsLoading(true);
        setErrorMsg('');
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));

            const response = await fetch(`${backendUrl}/pipelines/parse`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setModalData(data);
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            setErrorMsg('Error submitting pipeline. Ensure the backend is running.');
        } finally {
            setIsLoading(false);
        }
    };

    const closeModal = () => {
        setModalData(null);
        setErrorMsg('');
    };

    return (
        <>
            <div className="flex items-center justify-center p-4">
                <button 
                    type="button" 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Submitting...' : 'Submit Pipeline'}
                </button>
            </div>

            {/* Success Modal */}
            {modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all p-6">
                        <div className="text-center mb-6">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <h3 className="text-lg leading-6 font-semibold text-slate-900">
                                Pipeline Analysis Complete
                            </h3>
                            <p className="text-sm text-slate-500 mt-2">
                                The backend has successfully processed the pipeline configuration.
                            </p>
                        </div>
                        
                        <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
                            <ul className="space-y-3">
                                <li className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-slate-600">Total Nodes:</span>
                                    <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">{modalData.num_nodes}</span>
                                </li>
                                <li className="flex justify-between items-center text-sm">
                                    <span className="font-medium text-slate-600">Total Edges:</span>
                                    <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded shadow-sm border border-slate-200">{modalData.num_edges}</span>
                                </li>
                                <li className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
                                    <span className="font-medium text-slate-600">Valid DAG:</span>
                                    <span className={`font-bold px-2 py-1 rounded shadow-sm ${modalData.is_dag ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                                        {modalData.is_dag ? 'Yes' : 'No'}
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="button"
                            onClick={closeModal}
                            className="w-full inline-flex justify-center rounded-lg border border-transparent px-4 py-2 bg-violet-600 text-base font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:text-sm transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Error Modal */}
            {errorMsg && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all p-6 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-lg leading-6 font-semibold text-slate-900 mb-2">
                            Submission Failed
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                            {errorMsg}
                        </p>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="w-full inline-flex justify-center rounded-lg border border-slate-300 px-4 py-2 bg-white text-base font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 sm:text-sm"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};
