import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { api } from './api/client';

// Định nghĩa kiểu dữ liệu chuẩn cho TypeScript
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
}

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Lấy danh sách sự kiện từ Gateway
  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      const eventData = res.data.events || res.data;
      const formatted = eventData.map((evt: any) => ({
        id: evt.id || evt._id,
        title: evt.title,
        start: evt.start_time || evt.startTime,
        end: evt.end_time || evt.endTime,
        description: evt.description,
      }));
      setEvents(formatted);
    } catch (err) {
      console.error('Lỗi lấy danh sách sự kiện:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]);

  // Xử lý Xạ thực (Đăng nhập / Đăng ký)
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await api.post('/auth/register', { email, password, fullName });
        alert('Đăng ký thành công! Hãy đăng nhập.');
        setIsRegister(false);
      } else {
        const res = await api.post('/auth/login', { email, password });
        const accessToken = res.data.token;
        localStorage.setItem('token', accessToken);
        setToken(accessToken);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Thao tác thất bại! Kiểm tra lại thông tin.';
      alert(msg);
    }
  };

  // Click chọn ngày trên Lịch để tạo sự kiện
  const handleDateSelect = async (selectInfo: any) => {
    const title = prompt('Nhập tên sự kiện mới:');
    if (title) {
      try {
        await api.post('/events', {
          title,
          startTime: selectInfo.startStr,
          endTime: selectInfo.endStr,
        });
        fetchEvents(); // Reload danh sách
      } catch (err) {
        alert('Tạo sự kiện không thành công!');
      }
    }
  };

  // Click vào sự kiện có sẵn để xem / xóa
  const handleEventClick = async (clickInfo: any) => {
    if (confirm(`Bạn có muốn xóa sự kiện "${clickInfo.event.title}" không?`)) {
      try {
        await api.delete(`/events/${clickInfo.event.id}`);
        clickInfo.event.remove();
      } catch (err) {
        alert('Xóa sự kiện thất bại!');
      }
    }
  };

  // Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setEvents([]);
  };

  // Màn hình Form Xác thực
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
        <form onSubmit={handleAuth} className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4 text-slate-800">
          <h2 className="text-2xl font-bold text-center text-slate-900">
            {isRegister ? '📝 Đăng Ký Tài Khoản' : '📅 Đăng Nhập System'}
          </h2>

          {isRegister && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Họ và tên</label>
              <input
                type="text"
                required
                className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Phạm Cường"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cuong@gmail.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white text-slate-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition">
            {isRegister ? 'Tạo Tài Khoản' : 'Đăng Nhập'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              {isRegister ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Màn hình Lịch làm việc
  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">📅 Calendar & Scheduling System</h1>
          <p className="text-slate-500 text-sm">Hệ thống Lịch Microservices</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Đăng xuất
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-slate-800">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          selectable={true}
          editable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
        />
      </div>
    </div>
  );
}