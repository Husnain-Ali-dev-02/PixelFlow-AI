"use client";

import { cn } from "@/lib/utils";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "./ui/input-group";
import { CornerDownLeftIcon } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { KeyboardEvent, useCallback } from "react";

interface PromptInputProps {
  promptText: string;
  setPromptText: (value: string) => void;
  isLoading?: boolean;
  className?: string;
  hideSubmitBtn?: boolean;
  onSubmit?: () => void;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
  disabled?: boolean; // <-- added
}

const PromptInput = ({
  promptText,
  setPromptText,
  isLoading = false,
  className,
  hideSubmitBtn = false,
  onSubmit,
  placeholder = "I want to design an app that...",
  maxLength = 1000,
  autoFocus = false,
  disabled = false, // default to false
}: PromptInputProps) => {
  // Disable submission if prompt is empty, loading, or disabled
  const canSubmit = promptText.trim().length > 0 && !isLoading && !disabled;

  const handleSubmit = useCallback(() => {
    if (!canSubmit || !onSubmit) return;
    onSubmit();
  }, [canSubmit, onSubmit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setPromptText(e.target.value);
    },
    [setPromptText]
  );

  return (
    <div className="bg-background">
      <InputGroup
        className={cn(
          "relative min-h-[172px] rounded-3xl bg-background",
          "border border-border",
          "transition-colors duration-200",
          "hover:border-muted-foreground/40",
          "focus-within:border-primary",
          className
        )}
      >
        <InputGroupTextarea
          className="
            text-base resize-none py-3 leading-relaxed
            bg-transparent
            outline-none
            ring-0
            shadow-none
            focus:ring-0
            focus:outline-none
            focus-visible:ring-0
            focus-visible:ring-offset-0
          "
          placeholder={placeholder}
          value={promptText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          disabled={isLoading || disabled} // <-- updated
          maxLength={maxLength}
          aria-label="AI design prompt input"
          aria-describedby="character-counter"
        />

        {/* Character Counter */}
        {maxLength && (
          <div
            id="character-counter"
            className="absolute bottom-16 right-4 text-xs text-muted-foreground"
          >
            {promptText.length}/{maxLength}
          </div>
        )}

        <InputGroupAddon
          align="block-end"
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-2"
        >
          <div className="text-xs text-muted-foreground">
            Press{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
              Ctrl / Cmd + Enter
            </kbd>{" "}
            to submit
          </div>

          {!hideSubmitBtn && (
            <InputGroupButton
              variant="default"
              size="sm"
              disabled={!canSubmit}
              onClick={handleSubmit}
              aria-label={
                isLoading ? "Generating design…" : "Generate design"
              }
              className="gap-2"
            >
              {isLoading ? (
                <span role="status" className="flex items-center gap-2">
                  <Spinner className="size-4" />
                  Designing…
                </span>
              ) : (
                <>
                  Design
                  <CornerDownLeftIcon className="size-4" />
                </>
              )}
            </InputGroupButton>
          )}
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default PromptInput;
