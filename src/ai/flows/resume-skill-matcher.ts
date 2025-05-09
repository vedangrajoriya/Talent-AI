// src/ai/flows/resume-skill-matcher.ts
'use server';
/**
 * @fileOverview A resume skill matching AI agent.
 *
 * - resumeSkillMatcher - A function that handles the resume skill matching process.
 * - ResumeSkillMatcherInput - The input type for the resumeSkillMatcher function.
 * - ResumeSkillMatcherOutput - The return type for the resumeSkillMatcher function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ResumeSkillMatcherInputSchema = z.object({
  resume: z.string().describe('The resume content as a string.'),
  jobDescription: z.string().describe('The job description content as a string.'),
});
export type ResumeSkillMatcherInput = z.infer<typeof ResumeSkillMatcherInputSchema>;

const ResumeSkillMatcherOutputSchema = z.object({
  matchingSkills: z.array(z.string()).describe('The skills from the resume that match the job description.'),
  matchingExperience: z.string().describe('The experience from the resume that matches the job description.'),
  matchingQualifications: z.string().describe('The qualifications from the resume that match the job description.'),
  overallSuitabilityScore: z.number().describe('A score from 0 to 1 indicating the overall suitability of the candidate.'),
});
export type ResumeSkillMatcherOutput = z.infer<typeof ResumeSkillMatcherOutputSchema>;

export async function resumeSkillMatcher(input: ResumeSkillMatcherInput): Promise<ResumeSkillMatcherOutput> {
  return resumeSkillMatcherFlow(input);
}

const prompt = ai.definePrompt({
  name: 'resumeSkillMatcherPrompt',
  input: {schema: ResumeSkillMatcherInputSchema},
  output: {schema: ResumeSkillMatcherOutputSchema},
  prompt: `You are an AI resume screener for a software engineering role.

  Given a resume and a job description, identify the matching skills, experience, and qualifications.
  Also, provide an overall suitability score from 0 to 1.

  Resume:
  {{resume}}

  Job Description:
  {{jobDescription}}`,
});

const resumeSkillMatcherFlow = ai.defineFlow(
  {
    name: 'resumeSkillMatcherFlow',
    inputSchema: ResumeSkillMatcherInputSchema,
    outputSchema: ResumeSkillMatcherOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
