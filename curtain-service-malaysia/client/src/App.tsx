/**
 * Design reminder for this file: Tropical Editorial Heritage.
 * Routes should preserve a calm, premium, editorial flow across all pages.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import {
  ContactPage,
  GalleryPage,
  HomePage,
  ProcessPage,
  ServicesPage,
  SiteLayout,
} from "./pages/Home";

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/gallery" component={GalleryPage} />
        <Route path="/services" component={ServicesPage} />
        <Route path="/how-it-works" component={ProcessPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
