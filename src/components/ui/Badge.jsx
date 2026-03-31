import * as React from 'react';
import { cn } from '../../lib/utils';

const Badge = React.forwardRef(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary/10 text-primary',
      secondary: 'bg-secondary-container text-on-secondary-container',
      error: 'bg-error-container text-on-error-container',
      tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      outline: 'border border-outline-variant/30 text-on-surface-variant',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest inline-flex items-center justify-center',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
