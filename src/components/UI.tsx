import * as React from 'react';
import { cn } from '@/src/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-opacity-90',
      secondary: 'bg-ink text-white hover:bg-opacity-90',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      ghost: 'text-ink hover:bg-primary/10',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-6 py-3',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-2xl font-medium transition-all active:scale-95 disabled:opacity-50',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

export const Card = ({ className, children }: { className?: string; children: React.ReactNode }) => (
  <div className={cn('bg-white rounded-3xl shadow-sm border border-black/5 overflow-hidden', className)}>
    {children}
  </div>
);

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-2xl border border-black/10 bg-cream/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all',
        className
      )}
      {...props}
    />
  )
);

export const Badge = ({ children, variant = 'primary' }: { children: React.ReactNode, variant?: 'primary' | 'secondary' }) => (
  <span className={cn(
    'px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full',
    variant === 'primary' ? 'bg-primary/10 text-primary' : 'bg-ink/10 text-ink'
  )}>
    {children}
  </span>
);
