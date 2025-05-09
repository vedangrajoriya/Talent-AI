"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { screenResumeAction, generateJobDescriptionAction } from "@/lib/actions";
import type { ResumeSkillMatcherOutput } from "@/ai/flows/resume-skill-matcher";
import MatchingResultsDisplay from "./MatchingResultsDisplay";
import { FileText, Briefcase, Sparkles, Loader2, Wand2 } from "lucide-react";

const formSchema = z.object({
  resume: z.string().min(50, { message: "Resume content must be at least 50 characters." }).max(15000, { message: "Resume content must be at most 15000 characters." }),
  jobDescription: z.string().min(50, { message: "Job description must be at least 50 characters." }).max(15000, { message: "Job description must be at most 15000 characters." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ResumeScreeningForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingJD, setIsGeneratingJD] = useState(false);
  const [results, setResults] = useState<ResumeSkillMatcherOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: "",
      jobDescription: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResults(null);
    try {
      const screeningResults = await screenResumeAction({
        resume: data.resume,
        jobDescription: data.jobDescription,
      });
      setResults(screeningResults);
      toast({
        title: "Screening Matrix Generated",
        description: "Candidate profile analysis complete.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Screening Protocol Failed",
        description: (error as Error).message || "An unexpected anomaly occurred during analysis.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateJD = async () => {
    setIsGeneratingJD(true);
    try {
      const jdResult = await generateJobDescriptionAction({
        jobTitle: "Software Engineer (Futuristic Tech Stack)",
        keywords: "Quantum Computing, Neural Networks, Advanced AI, WebAssembly, Rust, Decentralized Systems, Cybersecurity",
      });
      form.setValue("jobDescription", jdResult.jobDescription);
      toast({
        title: "Job Description Synthesized",
        description: "A role for a 'Software Engineer (Futuristic Tech Stack)' has been populated.",
      });
    } catch (error) {
      toast({
        title: "JD Synthesis Failed",
        description: (error as Error).message || "Could not synthesize job description.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingJD(false);
    }
  };

  return (
    <>
      <Card className="shadow-2xl w-full max-w-4xl mx-auto border-accent/30 bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden">
        <CardHeader className="border-b border-border/50 p-6">
          <CardTitle className="text-3xl flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-400">
            <Sparkles className="h-7 w-7" />
            AI-Powered Screening Matrix
          </CardTitle>
          <CardDescription className="text-foreground/70 text-sm">
            Input resume and job description data streams to compute candidate-role alignment.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8 p-6 md:p-8">
              <FormField
                control={form.control}
                name="resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg flex items-center gap-2 font-semibold text-primary"><FileText className="h-5 w-5"/>Resume Data Stream</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the full resume text here for analysis..."
                        className="min-h-[250px] bg-background/70 border-border/70 focus:border-accent focus:ring-accent text-base rounded-lg shadow-inner"
                        {...field}
                        aria-label="Resume Content Input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-1">
                      <FormLabel className="text-lg flex items-center gap-2 font-semibold text-primary"><Briefcase className="h-5 w-5"/>Job Description Matrix</FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleGenerateJD}
                        disabled={isGeneratingJD}
                        className="text-accent border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 group"
                      >
                        {isGeneratingJD ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Wand2 className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                        )}
                        Synthesize JD
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Paste job description, or synthesize one for a 'Software Engineer (Futuristic Tech Stack)'."
                        className="min-h-[250px] bg-background/70 border-border/70 focus:border-accent focus:ring-accent text-base rounded-lg shadow-inner"
                        {...field}
                        aria-label="Job Description Input"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="p-6 md:p-8 border-t border-border/50">
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground text-lg py-3 rounded-lg shadow-lg hover:shadow-accent/30 transition-all duration-300 group" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-5 w-5 group-hover:animate-ping" />
                )}
                Initiate Screening Protocol
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {results && <MatchingResultsDisplay results={results} />}
    </>
  );
}
