import React from 'react';
import { ArrowUpRight, BarChart2, PieChart, Binary, Bot, TrendingUp, TrendingDown } from 'lucide-react';
import './home.css';

const Home = () => {
  const marketData = [
    { name: "NIFTY 50", value: "19,425.35", change: "+1.2%" },
    { name: "SENSEX", value: "64,112.65", change: "+0.8%" },
    { name: "BANK NIFTY", value: "43,356.20", change: "-0.3%" }
  ];

  const features = [
    {
      icon: <PieChart size={24} />,
      title: "Fundamental Analysis",
      description: "Dive into financial health metrics and company fundamentals"
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Technical Analysis",
      description: "Analyze price trends with advanced charting tools and indicators"
    },
    {
      icon: <Binary size={24} />,
      title: "Future Options",
      description: "Plan your derivatives strategies with tailored tools"
    },
    {
      icon: <Bot size={24} />,
      title: "AI Trading Assistant",
      description: "Get instant trading advice and answers to your questions"
    }
  ];

  const testimonials = [
    {
      quote: "This platform revolutionized how I approach market analysis.",
      author: "Sarah Chen",
      role: "Professional Trader"
    },
    {
      quote: "The AI insights have been game-changing for my portfolio.",
      author: "Michael Rodriguez",
      role: "Investment Analyst"
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Master the Markets with Data-Driven Insights</h1>
          <p>Your one-stop platform for fundamental analysis, technical tools, and future options trading. Make smarter decisions with AI-powered insights and real-time data.</p>
          <div className="hero-buttons">
            <button className="primary-button">
              Explore Features <ArrowUpRight size={16} />
            </button>
            <button className="secondary-button">Get Started</button>
          </div>
        </div>
      </section>

      {/* Market Overview */}
      <section className="market-overview">
        <h2>Market Pulse</h2>
        <div className="market-cards">
          {marketData.map((item, index) => (
            <div key={index} className="market-card">
              <div className="market-card-header">
                <span>{item.name}</span>
                <span className={`change ${item.change.startsWith('+') ? 'positive' : 'negative'}`}>
                  {item.change}
                </span>
              </div>
              <div className="market-card-value">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose Us?</h2>
        <div className="why-us-content">
          <div className="why-us-point">
            <TrendingUp size={24} />
            <div>
              <h3>AI-Driven Insights</h3>
              <p>Make informed decisions with our advanced AI analysis tools</p>
            </div>
          </div>
          <div className="why-us-point">
            <BarChart2 size={24} />
            <div>
              <h3>Comprehensive Data</h3>
              <p>Access detailed market data, perfect for both beginners and pros</p>
            </div>
          </div>
          <div className="why-us-point">
            <TrendingDown size={24} />
            <div>
              <h3>Real-Time Updates</h3>
              <p>Stay ahead with instant market updates and alerts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Traders Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p>"{testimonial.quote}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to elevate your trading game?</h2>
        <p>Join thousands of traders making smarter decisions with our platform</p>
        <button className="primary-button">
          Get Started Now <ArrowUpRight size={16} />
        </button>
      </section>
    </div>
  );
};

export default Home;