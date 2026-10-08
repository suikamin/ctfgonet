"use client";

import * as React from "react";

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = React.createContext<PopoverContextType | null>(null);

export interface PopoverProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const triggerRef = React.useRef<HTMLElement | null>(null);

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block text-left">{children}</div>
    </PopoverContext.Provider>
  );
}

export interface PopoverTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export function PopoverTrigger({
  children,
  asChild,
  className,
  onClick,
  ...props
}: PopoverTriggerProps) {
  const context = React.useContext(PopoverContext);
  if (!context) {
    throw new Error("PopoverTrigger must be used within a Popover");
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    if (!e.defaultPrevented) {
      context.setOpen(!context.open);
    }
  };

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ref: context.triggerRef,
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props?.onClick?.(e);
        if (!e.defaultPrevented) {
          handleClick(e);
        }
      },
      "aria-haspopup": "dialog",
      "aria-expanded": context.open,
    });
  }

  return (
    <button
      ref={context.triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}

export interface PopoverContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function PopoverContent({
  children,
  className = "",
  align = "center",
  sideOffset = 8,
  ...props
}: PopoverContentProps) {
  const context = React.useContext(PopoverContext);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  if (!context) {
    throw new Error("PopoverContent must be used within a Popover");
  }

  React.useEffect(() => {
    if (!context.open) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        context.triggerRef.current &&
        !context.triggerRef.current.contains(target)
      ) {
        context.setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        context.setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [context]);

  if (!context.open) return null;

  const alignClass =
    align === "end"
      ? "right-0"
      : align === "start"
      ? "left-0"
      : "left-1/2 -translate-x-1/2";

  return (
    <div
      ref={contentRef}
      style={{ marginTop: sideOffset }}
      className={`absolute z-50 bg-background text-foreground border border-border rounded-lg shadow-xl outline-none focus:outline-none transition duration-150 ${alignClass} ${className}`}
      role="dialog"
      aria-modal="true"
      {...props}
    >
      {children}
    </div>
  );
}

