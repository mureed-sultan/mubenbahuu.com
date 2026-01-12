import { useParams, Link, Navigate } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getPostBySlug, getRelatedPosts, BlogPost as BlogPostType } from '@/data/blogPosts';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NetworkGraph3D from '@/components/3d/NetworkGraph3D';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [progress, setProgress] = useState(0);
  
  const post = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug, 3) : [];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = window.location.href;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
              
              <span className="inline-block px-3 py-1 rounded-full glass-card text-primary text-sm font-medium mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 max-w-4xl">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readTime} read
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div 
                className="prose prose-invert prose-lg max-w-none
                  prose-headings:font-display prose-headings:text-foreground
                  prose-h1:text-3xl prose-h1:text-gradient
                  prose-h2:text-2xl prose-h2:text-primary prose-h2:border-b prose-h2:border-border prose-h2:pb-2
                  prose-h3:text-xl prose-h3:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground
                  prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-card prose-pre:border prose-pre:border-border
                  prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
                  prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                  prose-li:marker:text-primary
                  prose-table:border-collapse prose-th:bg-muted prose-th:p-3 prose-td:p-3 prose-td:border-border
                "
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                    .replace(/^\*\*(.*)\*\*$/gm, '<p><strong>$1</strong></p>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
                    .replace(/^\- (.*$)/gm, '<li>$1</li>')
                    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
                    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
                    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
                    .replace(/\n\n/g, '</p><p>')
                    .replace(/^(?!<[hupob])/gm, '<p>')
                    .replace(/(?<![>])$/gm, '</p>')
                }}
              />
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-border">
                <Tag className="w-4 h-4 text-muted-foreground" />
                {post.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full glass-card text-sm text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-4 mt-8">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> Share:
                </span>
                <a 
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  LinkedIn
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* 3D Visual */}
                <div className="glass-card rounded-2xl overflow-hidden">
                  <Suspense fallback={<div className="h-[200px] bg-muted animate-pulse" />}>
                    <NetworkGraph3D className="h-[200px]" />
                  </Suspense>
                </div>

                {/* Author Card */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">About the Author</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-primary-foreground">
                      MB
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Mubeen Bahuu</div>
                      <div className="text-sm text-muted-foreground">ERP Specialist</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    8+ years of experience in Odoo, Oracle, and custom ERP development. Helping businesses transform their operations.
                  </p>
                  <Link to="/contact">
                    <Button className="w-full mt-4 bg-gradient-to-r from-primary to-glow-blue">
                      Get in Touch
                    </Button>
                  </Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="glass-card rounded-2xl p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map(relatedPost => (
                        <Link 
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <div className="flex gap-3">
                            <img 
                              src={relatedPost.image} 
                              alt={relatedPost.title}
                              className="w-20 h-16 object-cover rounded-lg"
                            />
                            <div>
                              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                {relatedPost.title}
                              </h4>
                              <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* CTA Section */}
          <div className="mt-20 glass-card rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how the right ERP solution can streamline your operations and drive growth.
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-glow-blue text-primary-foreground font-semibold px-8">
                Schedule a Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
