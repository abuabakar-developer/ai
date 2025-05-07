import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const variantClasses = {
  default: 'bg-white text-blue-700 hover:bg-blue-50',
  outline: 'border border-gray-300 text-blue-900 hover:bg-gray-100',
  ghost: 'text-gray-700 hover:bg-gray-100',
  destructive: 'bg-red-500 text-white hover:bg-red-600',
  bookdemo: 'bg-white text blue border border-blue-500',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-2.5 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
