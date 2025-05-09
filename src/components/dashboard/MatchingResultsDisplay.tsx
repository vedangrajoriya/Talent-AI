"use client";

import type { ResumeSkillMatcherOutput } from "@/ai/flows/resume-skill-matcher";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, ListChecks, Star, FileText, Briefcase, Activity } from "lucide-react";

interface MatchingResultsDisplayProps {
  results: ResumeSkillMatcherOutput;
}

export default function MatchingResultsDisplay({ results }: MatchingResultsDisplayProps) {
  const scorePercentage = Math.round(results.overallSuitabilityScore * 100);

  return (
    <Card className="mt-12 shadow-2xl border-accent/50 bg-card/80 backdrop-blur-sm rounded-xl overflow-hidden">
      <CardHeader className="border-b border-border/50 p-6">
        <CardTitle className="text-3xl flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-accent to-teal-400">
          <Activity className="h-7 w-7" />
          Alignment Matrix
        </CardTitle>
        <CardDescription className="text-foreground/70 text-sm">
          Detailed analysis of candidate's profile against job requirements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 p-6 md:p-8">
        <div className="p-4 rounded-lg bg-background/50 shadow-inner">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
            <Star className="h-6 w-6 text-accent" />
            Overall Suitability Index
          </h3>
          <div className="flex items-center gap-4">
            <Progress value={scorePercentage} className="w-full h-5 bg-secondary rounded-full shadow-inner" indicatorClassName="bg-gradient-to-r from-primary to-accent" aria-label={`Suitability score: ${scorePercentage}%`} />
            <span className="text-2xl font-bold text-accent tabular-nums">{scorePercentage}%</span>
          </div>
           <p className="text-xs text-muted-foreground mt-2">
            A composite score (0-100) indicating the candidate's overall match to the role profile.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-background/50 shadow-inner">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-primary">
            <ListChecks className="h-6 w-6 text-accent" />
            Skill Resonance
          </h3>
          {results.matchingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {results.matchingSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-4 py-1.5 bg-accent/20 text-accent-foreground border-accent/50 rounded-md shadow-sm hover:bg-accent/30 transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground italic">No specific skill resonance identified from current data streams.</p>
          )}
        </div>

        <div className="p-4 rounded-lg bg-background/50 shadow-inner">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
            <Briefcase className="h-6 w-6 text-accent" />
            Experience Vector Analysis
          </h3>
          <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{results.matchingExperience || "Experience data not applicable or insufficient for analysis."}</p>
        </div>

        <div className="p-4 rounded-lg bg-background/50 shadow-inner">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-primary">
            <FileText className="h-6 w-6 text-accent" />
            Qualification Signatures
          </h3>
          <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{results.matchingQualifications || "Qualification signatures not applicable or insufficient for analysis."}</p>
        </div>
      </CardContent>
    </Card>
  );
}
