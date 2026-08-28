import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: { value: number; positive: boolean };
  color?: string;
}

export default function StatCard({ title, value, icon, trend, color = 'bg-wu-maroon' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-neutral font-medium">{title}</p>
          <p className="text-2xl font-bold text-wu-ink mt-1">{value}</p>
          {trend && (
            <p className={`text-xs mt-1 ${trend.positive ? 'text-success' : 'text-danger'}`}>
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        {icon && (
          <div className={`p-3 rounded-lg ${color} text-white`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
