import React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'clay' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  fullWidth?: boolean;
  glow?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      glow = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'relative inline-flex min-h-11 items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer overflow-hidden tracking-wide';

    const variants = {
      primary: 'bg-[#131A22] text-[#FF9900] hover:bg-[#232F3E] focus:ring-[#FF9900] border border-[#FF9900] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      secondary: 'bg-cream-200 text-charcoal-900 hover:bg-cream-300 focus:ring-cream-300 border border-cream-300',
      clay: 'bg-[#131A22] text-[#FF9900] hover:bg-[#232F3E] focus:ring-[#FF9900] border border-[#FF9900] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0',
      outline: 'border-2 border-[#FF9900] text-black hover:bg-[#FF9900] focus:ring-[#FF9900]',
      ghost: 'text-charcoal-800 hover:bg-cream-200 focus:ring-cream-300',
    };

    const sizes = {
      sm: 'px-4 py-2 text-xs uppercase font-semibold tracking-wider',
      md: 'px-6 py-3 text-sm font-semibold',
      lg: 'px-8 py-4 text-base font-bold',
      xl: 'px-10 py-5 text-lg font-bold shadow-card',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          glow && 'btn-glow',
          className
        )}
        {...props}
      >
        {/* Subtle shine effect on hover */}
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000 ease-out" />
        
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
