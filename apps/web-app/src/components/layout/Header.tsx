import { Button } from '../ui/Button';

interface HeaderProps {
  onLogout: () => void;
}

export function Header({ onLogout }: HeaderProps) {
  return (
    <header className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Calendar & Scheduling System</h1>
        <p className="text-xs text-slate-500">Hệ thống Quản lý Lịch biểu & Nhắc nhở</p>
      </div>
      <Button variant="danger" onClick={onLogout} className="text-sm font-semibold">
        Đăng xuất
      </Button>
    </header>
  );
}