import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import type { CalendarEvent } from '../types';

interface EventDetailModalProps {
  event: CalendarEvent;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export function EventDetailModal({ event, onClose, onDelete }: EventDetailModalProps) {
  return (
    <Modal title="Chi tiết sự kiện" onClose={onClose} size="sm">
      <div className="space-y-2 text-sm text-slate-600">
        <p><span className="font-semibold text-slate-800">Tên:</span> {event.title}</p>
        <p><span className="font-semibold text-slate-800">Bắt đầu:</span> {new Date(event.start).toLocaleString()}</p>
        <p><span className="font-semibold text-slate-800">Kết thúc:</span> {event.end ? new Date(event.end).toLocaleString() : 'N/A'}</p>
      </div>
      <div className="flex justify-end gap-3 pt-3">
        <Button variant="secondary" onClick={onClose}>Đóng</Button>
        <Button variant="danger" onClick={onDelete}>Xóa sự kiện</Button>
      </div>
    </Modal>
  );
}