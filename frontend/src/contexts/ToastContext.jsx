import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toastSuccess = (msg) => addToast(msg, 'success');
  const toastError = (msg) => addToast(msg, 'danger', 5000);
  const toastWarning = (msg) => addToast(msg, 'warning');
  const toastInfo = (msg) => addToast(msg, 'info');

  return (
    <ToastContext.Provider value={{ addToast, toastSuccess, toastError, toastWarning, toastInfo }}>
      {children}
      {/* Toast Container */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast show align-items-center text-white bg-${toast.type} border-0 shadow-lg mb-2`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center gap-2">
                {toast.type === 'success' && <i className="bi bi-check-circle-fill"></i>}
                {toast.type === 'danger' && <i className="bi bi-exclamation-octagon-fill"></i>}
                {toast.type === 'warning' && <i className="bi bi-exclamation-triangle-fill"></i>}
                {toast.type === 'info' && <i className="bi bi-info-circle-fill"></i>}
                <span>{toast.message}</span>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => removeToast(toast.id)}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
