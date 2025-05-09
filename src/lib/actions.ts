// src/lib/actions.ts
"use server";

import { resumeSkillMatcher, type ResumeSkillMatcherInput, type ResumeSkillMatcherOutput } from "@/ai/flows/resume-skill-matcher";
import { generateJobDescription, type GenerateJobDescriptionInput, type GenerateJobDescriptionOutput } from "@/ai/flows/generate-job-description";

export async function screenResumeAction(input: ResumeSkillMatcherInput): Promise<ResumeSkillMatcherOutput> {
  try {
    const result = await resumeSkillMatcher(input);
    return result;
  } catch (error) {
    console.error("Error in screenResumeAction:", error);
    throw new Error("Failed to screen resume. Please try again.");
  }
}

export async function generateJobDescriptionAction(input: GenerateJobDescriptionInput): Promise<GenerateJobDescriptionOutput> {
  try {
    const result = await generateJobDescription(input);
    return result;
  } catch (error) {
    console.error("Error in generateJobDescriptionAction:", error);
    throw new Error("Failed to generate job description. Please try again.");
  }
}
