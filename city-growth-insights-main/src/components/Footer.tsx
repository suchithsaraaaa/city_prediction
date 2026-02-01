import { Github, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            Built with <Heart className="h-4 w-4 text-destructive" /> for Urban Planning
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              View Source
            </a>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} City Growth Prediction Dashboard. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
