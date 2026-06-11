import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

const REGIONS = ['서울', '제주', '대구', '부산', '인천', '경기', '기타'];
const INDUSTRIES = ['헤어', '피부', '메이크업', '속눈썹', '왁싱', '네일', '타투', '체형관리', '바디', '세신'];

export default function BusinessRegistrationForm() {
  const [formData, setFormData] = useState({
    company_name: '',
    region: '서울',
    industry: '헤어',
    contact_number: '',
    email_address: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('businesses').insert([formData]);
      if (error) throw error;
      setMessage('성공적으로 등록되었습니다!');
      setFormData({
        company_name: '',
        region: '서울',
        industry: '헤어',
        contact_number: '',
        email_address: '',
      });
    } catch (error) {
      const err = error as Error;
      setMessage(`오류가 발생했습니다: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">업체 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">업체명</label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors"
            placeholder="업체명을 입력해주세요"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">지역</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none bg-white"
          >
            {REGIONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">업종</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none bg-white"
          >
            {INDUSTRIES.map((i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors"
            placeholder="010-0000-0000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
          <input
            type="email"
            name="email_address"
            value={formData.email_address}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none transition-colors"
            placeholder="example@email.com"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-[#D4AF37] text-white py-3 rounded-lg font-bold shadow-md hover:bg-[#b5952f] transition-colors disabled:opacity-50"
        >
          {loading ? '등록 중...' : '등록하기'}
        </button>

        {message && (
          <p className={`text-center text-sm font-medium mt-4 ${message.includes('오류') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
