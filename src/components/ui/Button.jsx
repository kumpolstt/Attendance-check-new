import * as React from 'react';
import { cn } from '../../lib/utils';

const Button = React.forwardRef(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-lg shadow-primary/10',
      secondary: 'bg-secondary-container text-on-secondary-container hover:bg-surface-variant',
      outline: 'border border-outline-variant/30 bg-transparent hover:bg-surface-container-low text-on-surface',
      ghost: 'bg-transparent hover:bg-surface-container-low text-on-surface',
      error: 'bg-error text-on-error hover:bg-error-container hover:text-on-error-container',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs',
      md: 'px-6 py-3 text-sm font-bold',
      lg: 'px-8 py-4 text-base font-bold',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none font-headline',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
