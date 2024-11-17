---
layout: project-guide
title: "Basic Logic"  # Change for each section
section: "turing-complete"
status: "Completed"  # Change as needed
last_updated: "2024-11-16"
project_image: "/assets/images/turing-complete/basic-logic-banner.jpg"
sections:
  - id: overview
    title: "Section Overview"
    icon: "fa-info-circle"
  - id: navigation
    title: "Quick Navigation"
    icon: "fa-list"
  - id: challenges
    title: "Challenges"
    icon: "fa-puzzle-piece"
---

## Section Overview {#overview}
Brief introduction to this section and what will be covered.

## Quick Navigation {#navigation}

<div class="subsection-grid">
  <div class="subsection-card">
    <h3>NOT Gate</h3>
    <p>Building your first logic gate</p>
    <a href="#not-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>AND Gate</h3>
    <p>Combining inputs with AND logic</p>
    <a href="#and-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <!-- Add more subsection cards as needed -->
</div>

## Challenges {#challenges}

### NOT Gate {#not-gate}
Description of the challenge and solution...

[Insert circuit diagram or screenshot]

```verilog
// Example circuit code or explanation
module NOT_Gate (
  input a,
  output out
);
  assign out = !a;
endmodule
```

### AND Gate {#and-gate}
Description of the challenge and solution...

[Insert circuit diagram or screenshot]

```verilog
// Example circuit code or explanation
module AND_Gate (
  input a,
  input b,
  output out
);
  assign out = a & b;
endmodule
```

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href=".." class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
