import { Suspense, lazy } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FloatingCube3D = lazy(() => import('@/components/3d/FloatingCube3D'));

const faqs = [
  {
    question: 'What ERP systems do you specialize in?',
    answer: 'I specialize in Odoo, Oracle ERP (including Oracle Cloud, E-Business Suite, JD Edwards, and NetSuite), custom-built ERP solutions, and Spring Framework-based enterprise applications. Each project is tailored to the specific needs of your business.',
  },
  {
    question: 'How long does an ERP implementation typically take?',
    answer: 'Implementation timelines vary based on complexity. A basic Odoo setup can take 4-8 weeks, while enterprise-grade Oracle implementations may require 3-6 months. Custom ERP development typically ranges from 4-12 months depending on scope.',
  },
  {
    question: 'Do you provide post-implementation support?',
    answer: 'Absolutely! I offer comprehensive post-go-live support including bug fixes, performance optimization, user training, and ongoing maintenance. Support packages can be customized based on your needs.',
  },
  {
    question: 'Can you help migrate data from our existing system?',
    answer: 'Yes, data migration is a core part of my services. I follow a structured approach including data mapping, cleansing, validation, and migration with zero data loss. I\'ve successfully migrated data from legacy systems, spreadsheets, and other ERPs.',
  },
  {
    question: 'What industries have you worked with?',
    answer: 'I\'ve implemented ERP solutions across manufacturing, logistics, retail, healthcare, and professional services industries. Each industry has unique requirements, and I bring relevant domain expertise to every project.',
  },
  {
    question: 'How do you ensure project success?',
    answer: 'My approach includes thorough requirements analysis, agile methodology with regular check-ins, comprehensive testing, and phased rollouts. I also focus on change management and user training to ensure adoption.',
  },
  {
    question: 'What is the cost of an ERP implementation?',
    answer: 'Costs depend on scope, complexity, and timeline. I provide transparent pricing after an initial consultation. Options include fixed-price projects for well-defined scopes and time-and-materials for flexible engagements.',
  },
  {
    question: 'Can you integrate ERP with other business tools?',
    answer: 'Yes, I specialize in integrations with CRMs (Salesforce, HubSpot), e-commerce platforms (Shopify, WooCommerce), payment gateways, BI tools, and custom APIs. Seamless integration is key to maximizing ERP value.',
  },
];

export default function FAQSection() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background 3D Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-30 pointer-events-none hidden lg:block">
        <Suspense fallback={null}>
          <FloatingCube3D />
        </Suspense>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <p className="section-subheading">
            Everything you need to know about ERP implementation
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left font-display text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
