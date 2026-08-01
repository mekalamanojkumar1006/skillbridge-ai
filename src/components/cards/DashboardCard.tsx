import React from "react";

export interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  children,
  className = "",
  header,
  footer,
  title,
  subtitle,
  icon,
  action
}) => {
  return (
    <div className={`glass-card flex flex-col h-full card-equal-height p-6 relative overflow-hidden transition-all duration-300 ${className}`}>
      {(header || title || icon || action) && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
          {header || (
            <div className="flex items-center space-x-3">
              {icon && <div className="p-2 rounded-xl bg-[#6D5DF6]/10 text-[#6D5DF6]">{icon}</div>}
              <div>
                {title && <h3 className="text-sm font-bold text-[var(--color-text-primary)]">{title}</h3>}
                {subtitle && <p className="text-xs text-[var(--color-text-tertiary)] font-mono">{subtitle}</p>}
              </div>
            </div>
          )}
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="flex-grow flex flex-col">{children}</div>
      {footer && <div className="pt-4 mt-4 border-t border-[var(--color-border)]">{footer}</div>}
    </div>
  );
};

export default DashboardCard;
