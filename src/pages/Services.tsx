import { Suspense, lazy } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Database, Code2, Server, Layers, Workflow, Shield, CheckCircle2 } from 'lucide-react';

const ServicesScene3D = lazy(() => import('@/components/3d/ServicesScene3D'));

const services = [
  {
    icon: Database,
    title: 'Odoo Implementation',
    description: 'End-to-end Odoo ERP deployment tailored to your business needs.',
    features: ['Module Customization', 'Data Migration', 'Third-party Integrations', 'Training & Support', 'Performance Optimization'],
    color: 'from-primary to-glow-blue',
  },
  {
    icon: Server,
    title: 'Oracle ERP Solutions',
    description: 'Enterprise-grade Oracle implementations for complex business requirements.',
    features: ['Oracle Cloud ERP', 'E-Business Suite', 'JD Edwards', 'PeopleSoft', 'NetSuite Integration'],
    color: 'from-accent to-glow-purple',
  },
  {
    icon: Code2,
    title: 'Custom ERP Development',
    description: 'Bespoke ERP solutions built from the ground up for unique requirements.',
    features: ['Scalable Architecture', 'API-First Design', 'Real-time Analytics', 'Mobile-Ready', 'Cloud Deployment'],
    color: 'from-glow-blue to-primary',
  },
  {
    icon: Layers,
    title: 'Spring Framework',
    description: 'Robust enterprise applications using modern Spring technologies.',
    features: ['Spring Boot', 'Spring Cloud', 'Microservices', 'Spring Security', 'Reactive Programming'],
    color: 'from-success to-primary',
  },
  {
    icon: Workflow,
    title: 'Business Process Automation',
    description: 'Streamline operations with intelligent workflow automation.',
    features: ['Workflow Design', 'RPA Integration', 'Process Mining', 'Document Automation', 'Task Scheduling'],
    color: 'from-warning to-accent',
  },
  {
    icon: Shield,
    title: 'ERP Consulting',
    description: 'Strategic guidance for ERP selection and implementation success.',
    features: ['Requirements Analysis', 'Vendor Evaluation', 'ROI Assessment', 'Change Management', 'Post-Go-Live Support'],
    color: 'from-glow-purple to-primary',
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero with 3D */}
        <section className="relative min-h-[40vh] flex items-center overflow-hidden mb-8">
          <Suspense fallback={null}>
            <ServicesScene3D />
          </Suspense>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center">
              <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">Services</span>
              <h1 className="section-heading">What I <span className="text-glow">Offer</span></h1>
              <p className="section-subheading">Comprehensive ERP solutions to transform your business operations.</p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div key={service.title} className="glass-card-hover rounded-2xl p-8">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
