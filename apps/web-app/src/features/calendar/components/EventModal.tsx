import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Modal } from '../../../components/ui/Modal';
import { CATEGORIES, type CreateEventInput } from '../types';

interface EventModalProps {
  date: string;
  onClose: () => void;
  onSubmit: (event: CreateEventInput) => Promise<void>;
}

export function EventModal({ date, onClose, onSubmit }: EventModalProps) {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [category, setCategory] = useState('study');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;
    const selectedCategory = CATEGORIES.find((item) => item.id === category);
    try {
      await onSubmit({
        title,
        startTime: `${date}T${startTime}:00`,
        endTime: `${date}T${endTime}:00`,
        category,
        color: selectedCategory?.color,
      });
      onClose();
    } catch {
      alert('Tạo sự kiện thất bại!');
    }
  };

  return (
    <Modal title="Tạo sự kiện mới" onClose={onClose}>
      <p className="text-sm text-slate-500">Ngày chọn: <span className="font-semibold text-blue-600">{date}</span></p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Tên sự kiện" required placeholder="Ví dụ: Họp đồ án Microservices" value={title} onChange={(event) => setTitle(event.target.value)} />
        <label className="block text-sm font-semibold text-slate-700">
          <span className="block mb-1">Phân loại sự kiện</span>
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="w-full p-2.5 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900">
            {CATEGORIES.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Giờ bắt đầu" type="time" required value={startTime} onChange={(event) => setStartTime(event.target.value)} />
          <Input label="Giờ kết thúc" type="time" required value={endTime} onChange={(event) => setEndTime(event.target.value)} />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>Hủy</Button>
          <Button type="submit">Lưu sự kiện</Button>
        </div>
      </form>
    </Modal>
  );
}