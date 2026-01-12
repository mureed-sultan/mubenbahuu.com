import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Glow Effects */}
      <div className="hero-glow top-0 left-1/3" />
      <div className="hero-glow bottom-0 right-1/3 bg-accent/10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center pulse-glow">
            <Mail className="w-10 h-10 text-primary-foreground" />
          </div>
          
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Ready to </span>
            <span className="text-gradient">Transform</span>
            <span className="text-foreground"> Your Business?</span>
          </h2>
          
          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
            Let's discuss how the right ERP solution can streamline your operations, 
            boost productivity, and drive growth. Get in touch for a free consultation.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold px-8 py-6 text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                Schedule a Call
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href="mailto:mubeen@erpspecialist.com">
              <Button size="lg" variant="outline" className="border-primary/50 text-foreground px-8 py-6 text-lg hover:bg-primary/10 hover:border-primary transition-all duration-300">
                <Mail className="mr-2 w-5 h-5" />
                Email Me
              </Button>
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm">Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm">Quick Response</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-sm">No Obligation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
