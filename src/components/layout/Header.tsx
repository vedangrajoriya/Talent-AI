import { BotMessageSquare } from 'lucide-react'; // Using a more futuristic icon
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-primary hover:opacity-80 transition-opacity duration-300">
          <BotMessageSquare className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-bold tracking-tighter">
            TalentFlow <span className="text-accent">AI</span>
          </h1>
        </Link>
        {/* Navigation items can be added here if needed 
        <nav className="flex gap-4">
          <Link href="/features" className="text-sm text-foreground/80 hover:text-accent transition-colors">Features</Link>
          <Link href="/pricing" className="text-sm text-foreground/80 hover:text-accent transition-colors">Pricing</Link>
          <Link href="/contact" className="text-sm text-foreground/80 hover:text-accent transition-colors">Contact</Link>
        </nav>
        */}
      </div>
    </header>
  );
}
