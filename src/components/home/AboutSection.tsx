import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const highlights = [
  '8+ years of ERP implementation experience',
  'Certified Odoo & Oracle consultant',
  'Full-stack development expertise',
  'Agile project management',
  'Remote & on-site collaboration',
  '24/7 post-implementation support',
];

const technologies = [
  'Odoo', 'Oracle', 'SAP', 'Spring Boot', 'Python', 'Java', 
  'PostgreSQL', 'Docker', 'AWS', 'REST APIs', 'Microservices', 'React'
];

export default function AboutSection() {
  return (
    <section className="relative py-24 bg-card/30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Driving </span>
              <span className="text-gradient">Digital Transformation</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              I'm Mubeen Bahuu, a passionate ERP specialist dedicated to helping businesses 
              optimize their operations through intelligent enterprise solutions. With extensive 
              experience in Odoo, Oracle, and custom ERP development, I bring a unique blend of 
              technical expertise and business acumen to every project.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              My mission is to bridge the gap between complex enterprise systems and 
              practical business needs, delivering solutions that are not just powerful, 
              but also intuitive and scalable.
            </p>
            
            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
            
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold">
                Let's Work Together
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Right - Tech Stack */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            
            <div className="glass-card rounded-2xl p-8 relative">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 rounded-lg glass-card text-sm font-medium text-foreground hover:bg-primary/10 hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Experience Card */}
              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-4xl font-bold text-gradient">8+</p>
                    <p className="text-sm text-muted-foreground">Years of Experience</p>
                  </div>
                  <div className="w-px h-16 bg-border" />
                  <div>
                    <p className="text-4xl font-bold text-gradient">50+</p>
                    <p className="text-sm text-muted-foreground">Projects Delivered</p>
                  </div>
                  <div className="w-px h-16 bg-border" />
                  <div>
                    <p className="text-4xl font-bold text-gradient">30+</p>
                    <p className="text-sm text-muted-foreground">Happy Clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
