import Header from "@/components/layout/Header";
import ResumeScreeningForm from "@/components/dashboard/ResumeScreeningForm";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-teal-400 animate-gradient-x tracking-tight">
            Unlock Your Hiring Potential
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Leverage TalentFlow AI to instantly screen resumes and identify top talent for your Software Engineer roles.
            Streamline your recruitment process with cutting-edge artificial intelligence.
          </p>
        </div>
        <ResumeScreeningForm />
      </main>
      <footer className="py-8 text-center border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TalentFlow AI. Advancing Recruitment.
        </p>
      </footer>
    </div>
  );
}

// Add gradient animation to tailwind.config.ts if not already present
// or define it in globals.css if preferred.
// For globals.css:
// @keyframes gradient-x {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }
// .animate-gradient-x {
//   background-size: 200% 200%;
//   animation: gradient-x 5s ease infinite;
// }
// For tailwind.config.ts (preferred):
// theme: {
//   extend: {
//     animation: {
//       'gradient-x': 'gradient-x 5s ease infinite',
//     },
//     keyframes: {
//       'gradient-x': {
//         '0%, 100%': { 'background-position': '0% 50%' },
//         '50%': { 'background-position': '100% 50%' },
//       },
//     },
//   },
// },
