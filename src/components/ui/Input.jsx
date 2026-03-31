import * as React from 'react';
import { cn } from '../../lib/utils';

const Input = React.forwardRef(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative group w-full">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-surface-container-high border-none rounded-xl py-4 pr-4 transition-all focus:ring-2 focus:ring-primary/20 text-on-surface placeholder:text-outline',
            icon ? 'pl-12' : 'pl-4',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
