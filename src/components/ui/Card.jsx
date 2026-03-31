import * as React from 'react';
import { cn } from '../../lib/utils';

const Card = React.forwardRef(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-surface-container shadow-sm',
      low: 'bg-surface-container-low shadow-sm',
      lowest: 'bg-surface-container-lowest shadow-sm',
      primary: 'bg-primary text-on-primary shadow-xl shadow-primary/20',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-[2rem] p-6 transition-all', variants[variant], className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card };
