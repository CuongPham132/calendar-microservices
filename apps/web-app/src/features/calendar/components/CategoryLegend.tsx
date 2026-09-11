import { CATEGORIES } from '../types';

export function CategoryLegend() {
  return (
    <div className="flex flex-wrap gap-4 mb-4 bg-white p-3 rounded-xl shadow-sm border border-slate-100 text-sm">
      <span className="font-semibold text-slate-700">Chú thích phân loại:</span>
      {CATEGORIES.map((category) => (
        <div key={category.id} className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: category.color }} />
          <span className="text-slate-600 font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
}