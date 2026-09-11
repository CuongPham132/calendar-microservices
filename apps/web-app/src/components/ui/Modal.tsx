import type { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose?: () => void;
  size?: 'sm' | 'md';
}

export function Modal({ title, children, onClose, size = 'md' }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-2xl p-6 w-full ${size === 'sm' ? 'max-w-sm' : 'max-w-md'} shadow-2xl space-y-4`}>
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-800">{title}</h2>
          {onClose && (
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="Đóng">
              ✕
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}