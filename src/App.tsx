import './App.css'
import Chatbox from './ChatBox'

function App() {
  return (
    <>
      <div className="home-page">
        <div className="bg-mandala"></div>
        <div className="bg-spice-dots"></div>

        <header className="hero">
          <div className="hero-badge">🌶 RAG-Powered AI</div>
          <h1 className="hero-title">
            <span className="title-namaste">नमस्ते</span>
            <span className="title-main">Rasoi Assistant</span>
          </h1>
          <p className="hero-subtitle">
            Your intelligent Indian cuisine companion — powered by Spring AI, Ollama &amp; Qdrant vector search.
            Ask me anything about recipes, spices, cooking techniques &amp; more.
          </p>
          <div className="cta-hint">
            <span className="cta-arrow">↘</span>
            <span>Click the sparkle button to start chatting</span>
          </div>
        </header>

        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">🍛</div>
            <h3>Recipe Knowledge</h3>
            <p>Deep knowledge from curated Indian recipe PDFs via RAG retrieval</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Streaming</h3>
            <p>Responses stream token-by-token using Spring Flux &amp; SSE</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Context-Aware</h3>
            <p>Qdrant vector DB finds the most relevant recipe context for each query</p>
          </div>
        </section>

        <section className="suggestions">
          <h2 className="suggestions-title">Try asking...</h2>
          <div className="suggestion-pills">
            <span className="pill">How do I make Dal Makhani?</span>
            <span className="pill">What spices go in Biryani?</span>
            <span className="pill">Recipe for Paneer Butter Masala</span>
            <span className="pill">How to make Idli batter?</span>
            <span className="pill">What is garam masala made of?</span>
          </div>
        </section>

        <section className="tech-stack">
          <p className="tech-label">Built with</p>
          <div className="tech-badges">
            <span className="tech-badge spring">Spring AI</span>
            <span className="tech-badge ollama">Ollama</span>
            <span className="tech-badge qdrant">Qdrant</span>
            <span className="tech-badge react">React + Vite</span>
          </div>
        </section>

        <section className="github-links">
          <a href="https://github.com/raghavtilak/ragchatbot-ui" target="_blank" rel="noopener noreferrer" className="github-card">
            <div className="github-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <div className="github-text">
              <span className="github-name">ragchatbot-ui</span>
              <span className="github-desc">Frontend · React + Vite chatbot UI</span>
            </div>
            <span className="github-arrow">↗</span>
          </a>

          <a href="https://github.com/raghavtilak/Spring-AI-RAG-Chatbot-Ollama-Qdrant" target="_blank" rel="noopener noreferrer" className="github-card">
            <div className="github-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </div>
            <div className="github-text">
              <span className="github-name">Spring-AI-RAG-Chatbot</span>
              <span className="github-desc">Backend · Spring AI + Ollama + Qdrant</span>
            </div>
            <span className="github-arrow">↗</span>
          </a>
        </section>

        <footer className="footer">
          Made with ❤️ by <a href="https://github.com/raghavtilak" target="_blank" rel="noopener noreferrer">raghavtilak</a>
        </footer>
      </div>

      <Chatbox />
    </>
  )
}

export default App
