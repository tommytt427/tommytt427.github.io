---
layout: default
title: Home
---

![Profile Picture](/assets/images/ttrannEdit1.JPG){: .profile-image}

# Welcome to My Portfolio

## About Me
<div class="featured-content">
 My name is Thomas Tran and I am a current Computer Engineering undergraduate at the University of Michigan College of Engineering. You can look around and see what projects I have or am working on!
</div>

## Projects
<div class="project-grid">
  {% for project in site.projects %}
    {% if project.type == "main" %}
    <div class="project-card">
      {% if project.project_image %}
        <img src="{{ project.project_image }}" alt="{{ project.title }}" class="project-thumbnail">
      {% endif %}
      <div class="project-card-content">
        <h3>{{ project.title }}</h3>
        <p>{{ project.description }}</p>
        <a href="{{ project.url }}" class="project-link">
          View Details <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
    {% endif %}
  {% endfor %}
</div>

## Documents & Resources
<div class="document-container">
  <div class="pdf-preview" onclick="openPdfViewer('/assets/docs/resume.pdf')">
    <div class="pdf-thumbnail">
      <img src="/assets/docs/resume-thumbnail.jpg" alt="Resume Preview" class="thumbnail-img">
      <div class="pdf-overlay">
        <i class="fas fa-expand-alt"></i>
      </div>
    </div>
    <div class="pdf-info">
      <span class="pdf-title">My Resume</span>
      <span class="pdf-meta">
        <i class="fas fa-file-pdf"></i> Click to view
      </span>
    </div>
  </div>
</div>

<!-- PDF Viewer Modal -->
<div id="pdfModal" class="modal">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Resume</h2>
      <div class="modal-actions">
        <a id="downloadPdf" href="/assets/docs/resume.pdf" download class="download-btn">
          <i class="fas fa-download"></i>
        </a>
        <button class="close-btn" onclick="closePdfViewer()">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="modal-body">
      <iframe id="pdfViewer" width="100%" height="100%" frameborder="0"></iframe>
    </div>
  </div>
</div>

## Contact Me
<div class="social-links">
  <a href="https://github.com/{{ site.social_links.github }}" class="social-link github" data-tooltip="GitHub" target="_blank">
    <i class="fab fa-github"></i>
  </a>
  <a href="https://linkedin.com/in/{{ site.social_links.linkedin }}" class="social-link linkedin" data-tooltip="LinkedIn" target="_blank">
    <i class="fab fa-linkedin"></i>
  </a>
  <a href="mailto:{{ site.social_links.email }}" class="social-link email" data-tooltip="Email">
    <i class="fas fa-envelope"></i>
  </a>
</div>

<!-- Sliding Contact Form -->
<div class="sliding-contact-form">
  <div class="contact-trigger">
    <button class="contact-button" aria-label="Contact Form">
      <i class="fas fa-envelope"></i>
    </button>
  </div>
  <div class="contact-panel">
    <h2>Get In Touch</h2>
    <form id="contact-form" onsubmit="handleContactSubmit(event)" autocomplete="off">
      <div class="form-group">
        <i class="fas fa-user"></i>
        <input type="text" 
               id="name" 
               name="name" 
               placeholder="Your Name" 
               required 
               autocomplete="off">
      </div>
      <div class="form-group">
        <i class="fas fa-envelope"></i>
        <input type="email" 
               id="email" 
               name="email" 
               placeholder="Your Email" 
               required 
               autocomplete="off">
      </div>
      <div class="form-group">
        <textarea id="message" 
                  name="message" 
                  placeholder="Your Message" 
                  required></textarea>
      </div>
      <button type="submit" class="submit-button">
        Send Message <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  </div>
</div>
