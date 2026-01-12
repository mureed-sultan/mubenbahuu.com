import { Link } from 'react-router-dom';
import { 
  Database, 
  Code2, 
  Server, 
  Layers, 
  ArrowRight,
  Workflow,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Database,
    title: 'Odoo Implementation',
    description: 'Complete Odoo ERP setup, customization, and integration for seamless business operations.',
    features: ['Module Customization', 'Data Migration', 'Training & Support'],
    color: 'from-primary to-glow-blue',
  },
  {
    icon: Server,
    title: 'Oracle ERP Solutions',
    description: 'Enterprise-grade Oracle implementations for large-scale business transformations.',
    features: ['Oracle Cloud', 'E-Business Suite', 'JD Edwards'],
    color: 'from-accent to-glow-purple',
  },
  {
    icon: Code2,
    title: 'Custom ERP Development',
    description: 'Tailored ERP solutions built from scratch to match your unique business processes.',
    features: ['Scalable Architecture', 'API Integration', 'Real-time Analytics'],
    color: 'from-glow-blue to-primary',
  },
  {
    icon: Layers,
    title: 'Spring Framework',
    description: 'Robust enterprise applications using Spring Boot, Spring Cloud, and microservices.',
    features: ['Microservices', 'Spring Security', 'Cloud Native'],
    color: 'from-success to-primary',
  },
  {
    icon: Workflow,
    title: 'Business Process Automation',
    description: 'Streamline workflows and automate repetitive tasks for maximum efficiency.',
    features: ['Workflow Design', 'RPA Integration', 'Process Optimization'],
    color: 'from-warning to-accent',
  },
  {
    icon: Shield,
    title: 'ERP Consulting',
    description: 'Strategic guidance to select, implement, and optimize the right ERP for your business.',
    features: ['Requirements Analysis', 'Vendor Selection', 'ROI Assessment'],
    color: 'from-glow-purple to-primary',
  },
];

export default function ServicesSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="hero-glow top-0 right-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
            What I Do
          </span>
          <h2 className="section-heading">
            Enterprise Solutions
          </h2>
          <p className="section-subheading">
            Comprehensive ERP services to digitize, automate, and transform your business operations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card-hover rounded-2xl p-8 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              
              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {service.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Link */}
              <Link 
                to="/services" 
                className="inline-flex items-center text-primary font-medium text-sm group/link"
              >
                Learn More 
                <ArrowRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link to="/services">
            <Button size="lg" className="bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold px-8">
              View All Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
