---
layout: default
title: Home
---

![Profile Picture](/assets/images/ttrannEdit1.JPG){: .profile-image}

# Welcome to My Portfolio

## About Me
<div class="featured-content">
 Hello! My name is Thomas and I am currently a senior undergraduate student studying Computer Engineering at the University of Michigan College of Engineering. I have a passion for the hardware side of things, pursuing a path in computer systems architecture. You can look around and see what projects I have or am working on!
</div>

<div class="video-banner-container">
  <video class="video-banner" autoplay loop muted playsinline>
    <source src="/assets/videos/masa-banner.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div class="banner-overlay">
    <div class="banner-title">Michigan Autonomous Aerial Systems</div>
    <div class="banner-role">Electrical Subteam Member</div>
    <div class="banner-duration">September 2023 - Present</div>
    <div class="banner-description">
      <ul class="banner-highlights">
        <li>Developed autonomous flight control systems for UAV competitions</li>
        <li>Collaborated with interdisciplinary team of 50+ members</li>
        <li>Implemented computer vision algorithms for object detection</li>
        <li>Contributed to system architecture design and integration</li>
      </ul>
    </div>
  </div>
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
    <form action="https://api.web3forms.com/submit" method="POST">
     <input type="hidden" name="access_key" value="e52531c3-0d82-4041-8805-a10f0a1665dd">
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
         <!-- Honeypot Spam Protection -->
    <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
      <button type="submit" class="submit-button">
        Send Message <i class="fas fa-paper-plane"></i>
      </button>
    </form>
  </div>
</div>
