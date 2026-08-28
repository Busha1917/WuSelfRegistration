import React from 'react';
import Button from '@/components/ui/Button';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export default function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      {icon && <div className="text-wu-gold mb-4 text-5xl">{icon}</div>}
      <h3 className="text-lg font-semibold font-heading text-wu-ink mb-2">{title}</h3>
      {description && <p className="text-sm text-neutral max-w-md">{description}</p>}
      {action && (
        <Button onClick={action.onClick} className="mt-4">
          {action.label}
        </Button>
      )}
    </div>
  );
}
