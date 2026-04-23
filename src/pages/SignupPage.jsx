import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    setTimeout(() => {
      signup(form.name, form.email, form.password);
      setLoading(false);
      navigate('/');
    }, 800);
  };

  const fields = [
    { label: 'Full Name', key: 'name', type: 'text', icon: User, placeholder: 'John Doe' },
    { label: 'Email address', key: 'email', type: 'email', icon: Mail, placeholder: 'you@example.com' },
    { label: 'Password', key: 'password', type: showPass ? 'text' : 'password', icon: Lock, placeholder: '••••••••' },
    { label: 'Confirm Password', key: 'confirm', type: showPass ? 'text' : 'password', icon: Lock, placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <Link to="/" className="flex items-center gap-0.5 mb-6">
        <span className="text-amazon font-extrabold text-3xl">amazon</span>
        <span className="text-amazon-orange font-extrabold text-3xl">.in</span>
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
        <p className="text-gray-500 text-sm mb-6">Join millions of shoppers on Amazon!</p>

        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {fields.map(({ label, key, type, icon: Icon, placeholder }) => (
            <div key={key}>
              <label className="text-sm font-medium text-gray-700 block mb-1">{label}</label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={type}
                  value={form[key]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={placeholder}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-amazon-orange"
                />
                {(key === 'password') && (
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button type="submit" disabled={loading} className="w-full bg-amazon-yellow hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition text-sm shadow-sm mt-1">
            {loading ? 'Creating Account...' : 'Create your Amazon account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-amazon-orange font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
