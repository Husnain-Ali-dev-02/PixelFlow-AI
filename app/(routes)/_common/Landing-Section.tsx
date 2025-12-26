"use client";

import React, { useState } from "react";
import Header from "./Header";
import PromptInput from "@/components/PromptInput";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import { useCreateProject, useGetProjects } from "@/features/use-project";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Spinner } from "@/components/ui/spinner";
import ProjectCard from "@/components/ProjectCard";
import { ProjectType } from "@/types/project";
import { suggestions } from "@/constants/suggestions";

const LandingSection = () => {
  const { user } = useKindeBrowserClient();
  const userid = user?.id || "";

  const [promptText, setPromptText] = useState("");

  const { data: projects, isLoading, isError } = useGetProjects(userid);
  const { mutate, isPending } = useCreateProject();

  const handleSubmit = () => {
    if (!promptText) return;
    mutate(promptText);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-28 text-center">
        <div className="mx-auto max-w-6xl px-4 flex flex-col items-center">
          <h1 className="font-semibold tracking-tight text-3xl sm:text-4xl md:text-5xl">
            Design mobile apps <br className="md:hidden" />
            <span className="text-primary"> in minutes</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg font-medium text-foreground leading-relaxed">
            Go from idea to beautiful app mockups in minutes by chatting with AI.
          </p>

          {/* Prompt Input + Suggestions */}
          <div className="relative z-50 mt-8 w-full max-w-3xl flex flex-col items-center gap-6">
            <PromptInput
              className="ring-2 ring-primary"
              promptText={promptText}
              setPromptText={setPromptText}
              isLoading={isPending}
              onSubmit={handleSubmit}
            />

            <div className="flex flex-wrap justify-center gap-2 px-4">
              <Suggestions>
                {suggestions.map((s) => (
                  <Suggestion
                    key={s.label}
                    suggestion={s.value}
                    aria-label={`Use ${s.label} template`}
                    className="h-7 px-2.5 pt-1 text-xs"
                    onClick={() => setPromptText(s.value)}
                  >
                    <span aria-hidden="true">{s.icon}</span>
                    <span>{s.label}</span>
                  </Suggestion>
                ))}
              </Suggestions>
            </div>
          </div>
        </div>

        {/* Background Glow (can extract to a separate component if desired) */}
        <div className="absolute -translate-x-1/2 left-1/2 w-[5000px] h-[3000px] top-[80%] -z-10">
          <div className="-translate-x-1/2 absolute bottom-[calc(100%-300px)] left-1/2 h-[2000px] w-[2000px] opacity-20 bg-radial-primary"></div>
          <div className="absolute -mt-2.5 size-full rounded-[50%] bg-primary/20 opacity-70 [box-shadow:0_-15px_24.8px_var(--primary)]"></div>
          <div className="absolute z-0 size-full rounded-[50%] bg-background"></div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="w-full py-10">
        <div className="mx-auto max-w-3xl px-4">
          {userid && (
            <>
              <h2 className="text-xl font-medium tracking-tight mb-3">Recent Projects</h2>

              {isLoading ? (
                <div className="flex items-center justify-center py-2">
                  <Spinner className="h-10 w-10" />
                </div>
              ) : isError ? (
                <p className="text-center text-red-500">Failed to load projects.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {projects?.map((project: ProjectType) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingSection;
