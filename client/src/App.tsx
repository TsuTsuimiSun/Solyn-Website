import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ServicesList from "./pages/ServicesList";
import ServiceDetail from "./pages/ServiceDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Privacy from "./pages/Privacy";
import Accessibility from "./pages/Accessibility";
import Terms from "./pages/Terms";
import MAServiceDetail from "./pages/MAServiceDetail";
import FinancialServiceDetail from "./pages/FinancialServiceDetail";
import OverseasServiceDetail from "./pages/OverseasServiceDetail";
import HRServiceDetail from "./pages/HRServiceDetail";
import ITServiceDetail from "./pages/ITServiceDetail";
import AdminDashboard from "./pages/AdminDashboard";
import Contact from "./pages/Contact";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/services" component={ServicesList} />
      <Route path="/services/ma" component={MAServiceDetail} />
      <Route path="/services/financial" component={FinancialServiceDetail} />
      <Route path="/services/overseas" component={OverseasServiceDetail} />
      <Route path="/services/hr" component={HRServiceDetail} />
      <Route path="/services/it" component={ITServiceDetail} />
      <Route path="/services/:serviceId" component={ServiceDetail} />
      <Route path="/news" component={News} />
      <Route path="/news/:newsId" component={NewsDetail} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/accessibility" component={Accessibility} />
      <Route path="/terms" component={Terms} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Navigation />
          <main className="pt-16 md:pt-20">
            <Router />
          </main>
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
