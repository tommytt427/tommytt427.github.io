layout: default title: Home
{: .profile-image}

Thomas Tran | Computer & Electrical Engineer
About Me
<div class="featured-content">
Hello! I'm Thomas, a Computer Engineering student at the University of Michigan with a passion for embedded systems, control systems, and avionics. I thrive on bridging the gap between hardware and software to create complex, functional systems. This portfolio highlights my key projects in robotics, autonomous systems, and aerospace engineering.
</div>

Featured Projects
<div class="project-grid">
<div class="project-card">
<img src="https://www.google.com/search?q=https://placehold.co/600x400/2d3748/ffffff%3Ftext%3DGantry%2BSystem" alt="Multi-Modal Robotic Gantry Control System" class="project-thumbnail">
<div class="project-card-content">
<h3>Multi-Modal Robotic Gantry Control System</h3>
<p>An STM32-based control system for a 2-axis gantry with three distinct control modes: autonomous ball-tracking via OpenCV, manual control via a PS2 controller, and wireless control using a custom Wii remote interface.</p>
<a href="{{ site.baseurl }}/projects/gantry-system" class="project-link">
View Details <i class="fas fa-arrow-right"></i>
</a>
</div>
</div>

<div class="project-card">
<img src="https://www.google.com/search?q=https://placehold.co/600x400/2d3748/ffffff%3Ftext%3DACC%2BSystem" alt="Model-Based Adaptive Cruise Control" class="project-thumbnail">
<div class="project-card-content">
<h3>Model-Based Adaptive Cruise Control & Autonomous Steering</h3>
<p>A multi-mode ACC system developed in Simulink for an NXP S32K144. This project involved processing CAN bus data for vehicle detection and tuning a PD controller for stable, autonomous lane-keeping with haptic feedback.</p>
<a href="{{ site.baseurl }}/projects/adaptive-cruise-control" class="project-link">
View Details <i class="fas fa-arrow-right"></i>
</a>
</div>
</div>

<div class="project-card">
<img src="https://www.google.com/search?q=https://placehold.co/600x400/2d3748/ffffff%3Ftext%3DMASA%2BAvionics" alt="MASA High-Altitude Rocket Telemetry System" class="project-thumbnail">
<div class="project-card-content">
<h3>MASA: High-Altitude Rocket Telemetry System</h3>
<p>As Avionics Subteam Lead for the Michigan Aeronautical Science Association, I drove the development of a 2.4GHz LoRa-based telemetry system for real-time flight data transmission from high-altitude rockets up to 75,000 feet.</p>
<a href="{{ site.baseurl }}/projects/masa-avionics" class="project-link">
View Details <i class="fas fa-arrow-right"></i>
</a>
</div>
</div>
</div>

Documents & Resources
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

Contact Me
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
