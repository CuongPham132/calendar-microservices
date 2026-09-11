import { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { SocialLoginButtons } from './SocialLoginButtons';

interface LoginFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    try {
      await onSubmit({ email, password });
    } catch {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Đăng nhập</h1>
          <p className="text-sm text-slate-500 mt-1">Truy cập lịch biểu của bạn</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
          <Input label="Mật khẩu" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
          <Button type="submit" className="w-full">Đăng nhập</Button>
        </form>
        <div className="relative text-center text-xs text-slate-400"><span className="bg-white px-2 relative z-10">hoặc</span><span className="absolute inset-x-0 top-1/2 border-t border-slate-200" /></div>
        <SocialLoginButtons />
      </section>
    </main>
  );
}