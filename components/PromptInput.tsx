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
}: PromptInputProps) => {
  const handleSubmit = useCallback(() => {
    if (promptText.trim() && !isLoading && onSubmit) {
      onSubmit();
    }
  }, [promptText, isLoading, onSubmit]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // Submit on Ctrl/Cmd + Enter
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !isLoading) {
        e.preventDefault();
        handleSubmit();
      }
      
      // Submit on Enter (without Shift)
      if (e.key === "Enter" && !e.shiftKey && !isLoading) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [isLoading, handleSubmit] // Add handleSubmit to dependencies
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (maxLength && e.target.value.length > maxLength) return;
      setPromptText(e.target.value);
    },
    [maxLength, setPromptText]
  );

  const isSubmitDisabled = !promptText.trim() || isLoading;

  return (
    <div className="bg-background">
      <InputGroup
        className={cn(
          "min-h-[172px] rounded-3xl bg-background shadow-sm transition-shadow hover:shadow-md focus-within:shadow-md",
          className
        )}
      >
        <InputGroupTextarea
          className="text-base resize-none py-2.5 focus-visible:ring-2 focus-visible:ring-primary/20"
          placeholder={placeholder}
          value={promptText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          disabled={isLoading}
          aria-label="AI design prompt input"
          aria-describedby={maxLength ? "character-counter" : undefined}
        />

        {maxLength && (
          <div className="absolute bottom-16 right-4 text-xs text-muted-foreground">
            <span id="character-counter">
              {promptText.length}/{maxLength}
            </span>
          </div>
        )}

        <InputGroupAddon
          align="block-end"
          className="flex items-center justify-between px-4"
        >
          <div className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to submit •{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Shift + Enter</kbd> for new line
          </div>

          {!hideSubmitBtn && (
            <InputGroupButton
              variant="default"
              size="sm"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}
              aria-label={isLoading ? "Generating design..." : "Generate design"}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Spinner className="size-4" />
                  Designing...
                </>
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