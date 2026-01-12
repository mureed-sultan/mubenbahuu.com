import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero3DScene from '@/components/3d/Hero3DScene';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Glow Effects */}
      <div className="hero-glow top-1/4 left-1/4" />
      <div className="hero-glow bottom-1/4 right-1/4 bg-accent/10" />
      
      {/* 3D Scene */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for new projects</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Enterprise </span>
            <span className="text-gradient">Solutions</span>
            <br />
            <span className="text-foreground">That </span>
            <span className="text-gradient">Transform</span>
            <span className="text-foreground"> Business</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Hi, I'm <span className="text-primary font-semibold">Mubeen Bahuu</span> — 
            an ERP specialist helping companies streamline operations with 
            <span className="text-primary"> Odoo</span>, <span className="text-primary">Oracle</span>, 
            and <span className="text-primary">Custom ERP</span> solutions.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/contact">
              <Button size="lg" className="group bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold px-8 py-6 text-lg hover:shadow-lg hover:shadow-primary/25 transition-all duration-300">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/services">
              <Button size="lg" variant="outline" className="group border-primary/50 text-foreground px-8 py-6 text-lg hover:bg-primary/10 hover:border-primary transition-all duration-300">
                <Play className="mr-2 w-5 h-5" />
                View Services
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              { value: '50+', label: 'Projects Completed' },
              { value: '8+', label: 'Years Experience' },
              { value: '30+', label: 'Happy Clients' },
              { value: '99%', label: 'Success Rate' },
            ].map((stat) => (
              <div key={stat.label} className="glass-card p-6 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
