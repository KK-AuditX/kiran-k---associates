/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import NetworkConnectorBackground from './components/NetworkConnectorBackground';
import { BlogPost, loadAllBlogs } from './blogParser';

// Load all markdown blog files using Vite's glob import
const blogModules = import.meta.glob('./blogs/*.md', { eager: true, query: '?raw', import: 'default' });
const BLOG_POSTS: BlogPost[] = loadAllBlogs(blogModules);
import { 
    ShieldCheckIcon, 
    BrainCircuitIcon, 
    TrendingUpIcon, 
    FileSearchIcon, 
    BuildingIcon,
    ArrowRightIcon,
    MenuIcon,
    XIcon,
    CheckCircleIcon,
    UploadIcon,
    CalculatorIcon,
    ClipboardListIcon,
    CoinsIcon,
    LightbulbIcon
} from './components/Icons';

// Blog posts are now loaded from markdown files in ./blogs/ folder
// To add a new blog: create a .md file in the blogs/ folder with frontmatter

// --- Career Form Component (Inline) ---
const CareerForm: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [fileName, setFileName] = useState<string>('');
    
    // Form refs for collecting data
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const experienceRef = useRef<HTMLInputElement>(null);
    const qualificationRef = useRef<HTMLSelectElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        
        const firstName = firstNameRef.current?.value || '';
        const lastName = lastNameRef.current?.value || '';
        const email = emailRef.current?.value || '';
        const phone = phoneRef.current?.value || '';
        const experience = experienceRef.current?.value || '';
        const qualification = qualificationRef.current?.value || '';
        
        try {
            const response = await fetch('/api/career', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    phone,
                    experience,
                    qualification,
                    resumeNote: fileName ? false : true
                }),
            });
            
            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error('Submission error:', error);
            // Fallback to mailto if API fails
            const subject = encodeURIComponent(`Career Application: ${firstName} ${lastName}`);
            const body = encodeURIComponent(
                `CAREER APPLICATION\n` +
                `==================\n\n` +
                `Name: ${firstName} ${lastName}\n` +
                `Email: ${email}\n` +
                `Phone: ${phone}\n` +
                `Experience: ${experience} years\n` +
                `Qualification: ${qualification}\n` +
                `Resume: ${fileName || 'Not uploaded'}\n\n` +
                `Note: Please attach your resume to this email before sending.`
            );
            window.location.href = `mailto:ca.kirankrishna@gmail.com?subject=${subject}&body=${body}`;
            setStatus('success');
        }
    };

    if (status === 'success') {
        return (
            <div className="career-success-message fade-in">
                <CheckCircleIcon />
                <h3>Application Submitted!</h3>
                <p>Thank you for your application. We will review it and get back to you soon.</p>
                <button className="btn-outline" onClick={() => { setStatus('idle'); setFileName(''); }} style={{marginTop: '20px'}}>Submit Another Response</button>
            </div>
        );
    }

    return (
        <form className="career-inline-form fade-in" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="input-group">
                    <label>First Name <span className="required">*</span></label>
                    <input type="text" placeholder="First Name" required className="form-input" ref={firstNameRef} />
                </div>
                <div className="input-group">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" placeholder="Last Name" required className="form-input" ref={lastNameRef} />
                </div>
            </div>
            
            <div className="form-row">
                <div className="input-group">
                    <label>Email Address <span className="required">*</span></label>
                    <input type="email" placeholder="john@example.com" required className="form-input" ref={emailRef} />
                </div>
                <div className="input-group">
                    <label>Phone Number <span className="required">*</span></label>
                    <input 
                        type="tel" 
                        placeholder="+91 98765 43210" 
                        required 
                        className="form-input" 
                        ref={phoneRef}
                        pattern="[+]?[0-9\s-]{10,15}"
                        title="Please enter a valid phone number (10-15 digits)"
                    />
                </div>
            </div>
            
            <div className="form-row">
                <div className="input-group">
                    <label>Total Experience (Years) <span className="required">*</span></label>
                    <input 
                        type="number" 
                        placeholder="e.g. 3.5" 
                        step="0.1" 
                        min="0" 
                        max="50"
                        required 
                        className="form-input" 
                        ref={experienceRef}
                    />
                </div>
                <div className="input-group">
                    <label>Qualification <span className="required">*</span></label>
                    <select className="form-input" required style={{ color: 'var(--text-primary)' }} ref={qualificationRef}>
                        <option value="">Select Qualification...</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Masters">Masters</option>
                        <option value="CA Completed">CA Completed</option>
                        <option value="Pursuing CA">Pursuing CA</option>
                    </select>
                </div>
            </div>
            
            <div className="form-row">
                <div className="input-group file-group">
                    <label>Resume (PDF/DOC) - Attach to email</label>
                    <div className={`file-upload-box ${fileName ? 'file-selected' : ''}`}>
                        <UploadIcon />
                        <span>{fileName || 'Click to Select Resume'}</span>
                        <input 
                            type="file" 
                            accept=".pdf,.doc,.docx" 
                            className="hidden-file-input" 
                            onChange={handleFileChange}
                        />
                    </div>
                    {fileName && <small style={{color: 'var(--primary-teal)', marginTop: '8px', display: 'block'}}>Selected: {fileName}</small>}
                </div>
            </div>

            <button type="submit" className="btn-primary submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Opening Email Client...' : 'Submit Application'}
            </button>
        </form>
    );
};

// --- Sub-Components for Pages ---

const HomePage = ({ onContactSubmit, contactStatus, onResetContact, nameRef, emailRef, phoneRef, queryRef, scrollToSection, onBlogClick }: any) => {
    return (
        <>
        <section id="hero" className="hero-section">
            <NetworkConnectorBackground intensity={1} />
            <div className="hero-content">
                <div className="hero-pill">
                    <ShieldCheckIcon /> 
                    <span>ISO 27001 Certified Practices</span>
                </div>
                <h1 className="hero-headline">
                    Future-Ready Financial<br />Intelligence & Compliance.
                </h1>
                <p className="hero-subheadline">
                    We bridge the gap between traditional Audit and the Digital Age. 
                    Specializing in Forensic Analytics, AI Automation, and Information System Security.
                </p>
                <div className="hero-actions">
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="btn-primary">Reach Out</a>
                    <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }} className="btn-outline">Explore Services</a>
                </div>
            </div>
        </section>

        <section id="services" className="services-section">
            <NetworkConnectorBackground intensity={0.5} interactive={false} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <span className="section-subtitle">Our Expertise</span>
                <h2 className="section-title">Strategic Solutions for the Digital Era</h2>
                
                <div className="services-grid">
                    <div className="service-card">
                        <div className="card-icon"><ShieldCheckIcon /></div>
                        <h3>Information System Audit (ISA)</h3>
                        <p>Comprehensive assessment of your IT infrastructure, ensuring data integrity, security compliance, and resilience against cyber threats.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><FileSearchIcon /></div>
                        <h3>Forensic Accounting</h3>
                        <p>Advanced financial investigation to detect fraud, analyze complex data trails, and provide litigation support for digital enterprises.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><BrainCircuitIcon /></div>
                        <h3>AI & Process Automation</h3>
                        <p>Leveraging Artificial Intelligence to streamline financial workflows, automate tax compliance, and generate predictive financial insights.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><TrendingUpIcon /></div>
                        <h3>Virtual CFO</h3>
                        <p>Strategic financial leadership for startups and growth-stage companies. We handle the numbers so you can focus on scale.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><BuildingIcon /></div>
                        <h3>Internal & Statutory Audit</h3>
                        <p>Rigorous, independent examination of financial statements ensuring transparency and adherence to global accounting standards.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><CalculatorIcon /></div>
                        <h3>Accounting</h3>
                        <p>End-to-end bookkeeping and accounting services to ensure your financial records are accurate, up-to-date, and compliant.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><ClipboardListIcon /></div>
                        <h3>Compliances</h3>
                        <p>Handling all regulatory filings and corporate governance requirements to keep your business penalty-free and legally sound.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><CoinsIcon /></div>
                        <h3>Taxation</h3>
                        <p>Expert direct and indirect tax planning, filing, and dispute resolution to optimize liabilities and ensure full statutory compliance.</p>
                    </div>

                    <div className="service-card">
                        <div className="card-icon"><LightbulbIcon /></div>
                        <h3>Advisory</h3>
                        <p>Strategic business consulting, deal structuring, and financial guidance to help navigate complex growth and investment decisions.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="blogs" className="blogs-section">
            <div className="container">
                <span className="section-subtitle">Insights</span>
                <h2 className="section-title">Thought Leadership</h2>
                
                {BLOG_POSTS.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '60px 20px' }}>
                        <p>No blog posts available at the moment. Check back soon!</p>
                    </div>
                ) : (
                    <div className="blogs-grid">
                        {BLOG_POSTS.map(blog => (
                            <div key={blog.id} className="blog-card" onClick={() => onBlogClick(blog)} style={{cursor: 'pointer'}} tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') onBlogClick(blog); }}>
                                <div className="blog-date">{blog.date}</div>
                                <h3>{blog.title}</h3>
                                <p>{blog.summary}</p>
                                <a href="#" className="read-more" onClick={(e) => { e.preventDefault(); onBlogClick(blog); }}>Read Insight <ArrowRightIcon /></a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>

        <section id="about" className="about-section">
            <NetworkConnectorBackground intensity={0.3} interactive={false} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="about-text-content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '3.8rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.1 }}>
                        Kiran.K
                    </h2>
                    <h3 style={{ 
                        fontSize: '2.2rem', 
                        fontWeight: 600, 
                        color: 'var(--primary-teal)', 
                        marginBottom: '2.5rem',
                        letterSpacing: '1px'
                    }}>
                        Managing Partner in Finance and audit
                    </h3>

                    <p className="about-quote" style={{ fontSize: '1.5rem', fontStyle: 'italic', marginBottom: '2.5rem' }}>
                        "A multidimensional leader blending financial expertise with advanced technical proficiency in Information Systems and AI."
                    </p>
                
                    <div className="about-paragraphs" style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '760px', margin: '0 auto 3rem' }}>
                        <p>
                            Kiran K represents a new breed of Chartered Accountants who understand that in a digital world, financial oversight must be technological oversight.
                        </p>
                        <p>
                            With a unique blend of traditional CA rigour and cutting-edge certifications in Information Systems Audit and Forensic Accounting, he leads the firm with a vision to modernize the Indian financial compliance landscape.
                        </p>
                    </div>
                
                    <div className="credentials-section" style={{ marginBottom: '2.5rem' }}>
                        <h4 style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>CREDENTIALS & CERTIFICATIONS</h4>
                        <div className="badges-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                            <span className="badge">CA</span>
                            <span className="badge">CS</span>
                            <span className="badge">ISA 3.0</span>
                            <span className="badge">FAFD</span>
                            <span className="badge">AICA L2</span>
                        </div>
                    </div>

                    <div className="specialties-list" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                        <div className="specialty-item"><span className="icon-wrapper"><CheckCircleIcon /></span> Expert in Forensic Audit & Fraud Detection</div>
                        <div className="specialty-item"><span className="icon-wrapper"><CheckCircleIcon /></span> Specialist in Information Systems Audit (ISA)</div>
                        <div className="specialty-item"><span className="icon-wrapper"><CheckCircleIcon /></span> Pioneer in AI-driven Financial Automations</div>
                    </div>
                </div>
            </div>
        </section>

        <section id="contact" className="contact-section">
            <NetworkConnectorBackground intensity={0.4} interactive={false} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <span className="section-subtitle">Get In Touch</span>
                <h2 className="section-title">Reach Out</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 40px' }}>
                    Have questions about our services? Ready to transform your financial operations? We'd love to hear from you.
                </p>
                
                <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                    <div style={{ 
                        background: 'var(--glass-surface)', 
                        border: '1px solid var(--glass-border)', 
                        borderRadius: '20px',
                        padding: '40px' 
                    }}>
                        {contactStatus === 'success' ? (
                            <div className="career-success-message fade-in">
                                <CheckCircleIcon />
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for reaching out. We'll get back to you shortly.</p>
                                <button className="btn-outline" onClick={onResetContact} style={{marginTop: '20px'}}>Send Another Message</button>
                            </div>
                        ) : (
                            <form className="contact-form fade-in" onSubmit={onContactSubmit}>
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Name <span className="required">*</span></label>
                                        <input type="text" placeholder="Your Name" required className="form-input" ref={nameRef} />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Email Address <span className="required">*</span></label>
                                        <input type="email" placeholder="you@example.com" required className="form-input" ref={emailRef} />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Phone Number <span className="required">*</span></label>
                                        <input 
                                            type="tel" 
                                            placeholder="+91 98765 43210" 
                                            required 
                                            className="form-input" 
                                            ref={phoneRef}
                                            pattern="[+]?[0-9\s-]{10,15}"
                                            title="Please enter a valid phone number (10-15 digits)"
                                        />
                                    </div>
                                </div>
                                
                                <div className="form-row">
                                    <div className="input-group">
                                        <label>Ask Your Queries <span className="required">*</span></label>
                                        <textarea 
                                            placeholder="Tell us about your requirements or questions..." 
                                            required 
                                            className="form-input" 
                                            ref={queryRef}
                                            rows={5}
                                            style={{ resize: 'vertical', minHeight: '120px' }}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="btn-primary submit-btn" disabled={contactStatus === 'sending'}>
                                    {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
        </>
    );
};

const CareersPage = () => {
    return (
        <div style={{ paddingTop: '140px', minHeight: '80vh', paddingBottom: '80px', position: 'relative' }}>
            <NetworkConnectorBackground intensity={0.4} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <span className="section-subtitle">Careers</span>
                    <h2 className="section-title">Join the Future of Finance</h2>
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1.1rem' }}>
                        We are constantly looking for talented individuals who share our passion for technology and financial integrity. 
                        Please fill out the form below to apply.
                    </p>
                    
                    <div className="career-form-container" style={{ 
                        background: 'var(--glass-surface)', 
                        border: '1px solid var(--glass-border)', 
                        borderRadius: '20px',
                        padding: '40px' 
                    }}>
                        <CareerForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlogDetailPage = ({ blog, onBack }: { blog: BlogPost, onBack: () => void }) => {
    return (
        <div style={{ paddingTop: '120px', minHeight: '80vh', paddingBottom: '80px', position: 'relative' }}>
            <NetworkConnectorBackground intensity={0.3} />
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <button 
                    onClick={onBack} 
                    className="btn-outline" 
                    style={{ marginBottom: '32px', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px' }}
                >
                    <span style={{ transform: 'rotate(180deg)', display: 'inline-block' }}><ArrowRightIcon /></span> Back to Blogs
                </button>
                
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div style={{ marginBottom: '16px', color: 'var(--primary-teal)', fontWeight: 600 }}>{blog.date}</div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '24px', lineHeight: 1.2 }}>{blog.title}</h1>
                    <div style={{ 
                        background: 'var(--glass-surface)', 
                        border: '1px solid var(--glass-border)', 
                        borderRadius: '20px',
                        padding: '40px' 
                    }}>
                        {blog.content.map((paragraph, index) => (
                            <p key={index} style={{ 
                                color: 'var(--text-secondary)', 
                                lineHeight: '1.8', 
                                marginBottom: '24px', 
                                fontSize: '1.1rem' 
                            }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

function App() {
  const [view, setView] = useState<'home' | 'careers' | 'blog-detail'>('home');
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  // Contact Form Refs
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const queryRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic page titles for SEO
  useEffect(() => {
    const baseTitle = 'Kiran K & Associates | Chartered Accountants';
    if (view === 'careers') {
      document.title = `Careers - ${baseTitle}`;
    } else if (view === 'blog-detail' && selectedBlog) {
      document.title = `${selectedBlog.title} - ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  }, [view, selectedBlog]);

  // Handle scroll after view change
  useEffect(() => {
    if (view === 'home' && scrollTarget) {
        // Short timeout to allow render
        const timeoutId = setTimeout(() => {
            const el = document.getElementById(scrollTarget);
            if (el) {
                const navbarHeight = 80;
                const elementPosition = el.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
            
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
            setScrollTarget(null);
        }, 100);
        return () => clearTimeout(timeoutId);
    } else if (view !== 'home' || (view === 'home' && !scrollTarget)) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [view, scrollTarget]);

  const handleNavigation = (target: string, id?: string) => {
    if (target === 'home') {
        if (view !== 'home') {
            setView('home');
            if (id) setScrollTarget(id);
        } else {
            if (id) {
                const el = document.getElementById(id);
                if (el) {
                    const navbarHeight = 80;
                    const elementPosition = el.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    } else if (target === 'careers') {
        setView('careers');
    }
    setMobileMenuOpen(false);
  };

  const handleBlogClick = (blog: BlogPost) => {
      setSelectedBlog(blog);
      setView('blog-detail');
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setContactStatus('sending');

      const name = nameRef.current?.value || '';
      const email = emailRef.current?.value || '';
      const phone = phoneRef.current?.value || '';
      const query = queryRef.current?.value || '';

      try {
          const response = await fetch('/api/contact', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name, email, phone, query, type: 'contact' }),
          });
          
          if (response.ok) {
              setContactStatus('success');
              // Clear form
              if(nameRef.current) nameRef.current.value = '';
              if(emailRef.current) emailRef.current.value = '';
              if(phoneRef.current) phoneRef.current.value = '';
              if(queryRef.current) queryRef.current.value = '';
          } else {
              throw new Error('Failed to submit');
          }
      } catch (error) {
          console.error('Submission error:', error);
          // Fallback to mailto if API fails
          const subject = encodeURIComponent(`Website Query from ${name}`);
          const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nQuery:\n${query}`);
          window.location.href = `mailto:ca.kirankrishna@gmail.com?subject=${subject}&body=${body}`;
          setContactStatus('success');
          
          // Clear form
          if(nameRef.current) nameRef.current.value = '';
          if(emailRef.current) emailRef.current.value = '';
          if(phoneRef.current) phoneRef.current.value = '';
          if(queryRef.current) queryRef.current.value = '';
      }
  };

  return (
    <>
        <nav className={`navbar ${isScrolled || view === 'careers' || view === 'blog-detail' ? 'scrolled' : ''}`}>
            <div className="container nav-content">
                <div className="logo" onClick={() => handleNavigation('home')} style={{cursor: 'pointer'}}>
                    <img 
                        src="/download.png"
                        alt="Kiran K & Associates Logo"
                        className="nav-logo-img" 
                    />
                    <div>
                        Kiran K <span>& Associates</span>
                        <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 500, marginTop: '2px'}}>Chartered Accountants</div>
                    </div>
                </div>
                
                {/* Desktop Navigation */}
                <div className="nav-links">
                    <a href="#services" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'services'); }}>Services</a>
                    <a href="#blogs" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'blogs'); }}>Blogs</a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'about'); }}>About Us</a>
                    <a href="#careers" onClick={(e) => { e.preventDefault(); handleNavigation('careers'); }} className={view === 'careers' ? 'active-link' : ''} style={view === 'careers' ? {color: 'var(--primary-teal)'} : {}}>Careers</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'contact'); }} className="btn-primary" style={{ padding: '8px 24px', fontSize: '0.9rem' }}>Contact Us</a>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
                    <MenuIcon />
                </button>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div 
            className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
            onClick={(e) => {
                // Close menu if clicking on the overlay background (not the content)
                if (e.target === e.currentTarget) {
                    setMobileMenuOpen(false);
                }
            }}
        >
            <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-menu-header">
                    <div className="logo">
                        <img 
                            src="/download.png"
                            alt="Kiran K & Associates Logo"
                            className="nav-logo-img"
                        />
                        <div>
                            Kiran K <span>& Associates</span>
                            <div style={{fontSize: '0.65rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 500, marginTop: '2px'}}>Chartered Accountants</div>
                        </div>
                    </div>
                    <button className="close-menu-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                        <XIcon />
                    </button>
                </div>
                <div className="mobile-menu-links">
                    <a href="#services" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'services'); }}>Services</a>
                    <a href="#blogs" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'blogs'); }}>Blogs</a>
                    <a href="#about" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'about'); }}>About Us</a>
                    <a href="#careers" onClick={(e) => { e.preventDefault(); handleNavigation('careers'); }}>Careers</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'contact'); }}>Contact Us</a>
                </div>
            </div>
        </div>

        {view === 'home' && (
            <HomePage 
                onContactSubmit={handleContactSubmit}
                contactStatus={contactStatus}
                onResetContact={() => setContactStatus('idle')}
                nameRef={nameRef}
                emailRef={emailRef}
                phoneRef={phoneRef}
                queryRef={queryRef}
                scrollToSection={(id: string) => handleNavigation('home', id)}
                onBlogClick={handleBlogClick}
            />
        )}

        {view === 'careers' && <CareersPage />}
        
        {view === 'blog-detail' && selectedBlog && (
            <BlogDetailPage 
                blog={selectedBlog} 
                onBack={() => handleNavigation('home', 'blogs')} 
            />
        )}

        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <div className="logo" style={{fontSize: '1.25rem'}}>
                            <img 
                                src="/download.png"
                                alt="Kiran K & Associates Logo"
                                className="nav-logo-img"
                                loading="lazy"
                            />
                            <div>
                                Kiran K <span>& Associates</span>
                                <div style={{fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: 500, marginTop: '4px'}}>Chartered Accountants</div>
                            </div>
                        </div>
                        <p style={{color: 'var(--text-secondary)', lineHeight: '1.6'}}>
                            #24, 1st Floor, Beside Sai Castle,<br />
                            Balaji Layout, Kodigehalli,<br />
                            Bangalore - 560092
                        </p>
                        <a 
                            href="https://maps.app.goo.gl/zBfn6gb6mMN6htCb9?g_st=awb" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                color: 'var(--primary-teal)',
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                marginTop: '8px'
                            }}
                        >
                            📍 View on Google Maps
                        </a>
                        <p style={{marginTop: '12px'}}>
                            A future-ready firm combining financial expertise with digital trust.
                        </p>
                    </div>
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'services'); }}>Information System Audit</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'services'); }}>Forensic Accounting</a></li>
                            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('home', 'services'); }}>Virtual CFO</a></li>
                        </ul>
                    </div>
                    <div className="footer-col footer-quick-links">
                        <h4>Quick Links</h4>
                        <div className="quick-links-columns">
                            <div className="quick-links-col">
                                <a href="https://www.icai.org/" target="_blank" rel="noopener noreferrer">ICAI</a>
                                <a href="https://www.icsi.edu/" target="_blank" rel="noopener noreferrer">ICSI</a>
                                <a href="https://icmai.in/" target="_blank" rel="noopener noreferrer">ICMAI</a>
                                <a href="https://www.isaca.org/" target="_blank" rel="noopener noreferrer">ISACA</a>
                                <a href="https://www.theiia.org/" target="_blank" rel="noopener noreferrer">IIA</a>
                            </div>
                            <div className="quick-links-col">
                                <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noopener noreferrer">Income Tax</a>
                                <a href="https://www.gst.gov.in/" target="_blank" rel="noopener noreferrer">GST</a>
                                <a href="https://www.mca.gov.in/" target="_blank" rel="noopener noreferrer">MCA</a>
                                <a href="https://www.rbi.org.in/" target="_blank" rel="noopener noreferrer">RBI</a>
                                <a href="https://www.sebi.gov.in/" target="_blank" rel="noopener noreferrer">SEBI</a>
                            </div>
                            <div className="quick-links-col">
                                <a href="https://www.meity.gov.in/" target="_blank" rel="noopener noreferrer">MeitY</a>
                                <a href="https://www.cert-in.org.in/" target="_blank" rel="noopener noreferrer">CERT-IN</a>
                                <a href="https://www.nist.gov/" target="_blank" rel="noopener noreferrer">NIST</a>
                                <a href="https://dpiit.gov.in/" target="_blank" rel="noopener noreferrer">DPIIT</a>
                                <a href="https://www.nfrtonline.gov.in/NFSU/" target="_blank" rel="noopener noreferrer">NFSU</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-col">
                        <h4>Connect</h4>
                        <ul>
                            <li><a href="mailto:ca.kirankrishna@gmail.com">ca.kirankrishna@gmail.com</a></li>
                            <li><a href="https://www.linkedin.com/in/kiran-k-46b22516a/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                        </ul>
                    </div>
                </div>
                <div className="copyright">
                    © {new Date().getFullYear()} Kiran K & Associates. All rights reserved.
                </div>
            </div>
        </footer>

        {/* Scroll to Top Button */}
        <button 
            className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
        >
            <ArrowRightIcon />
        </button>
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
