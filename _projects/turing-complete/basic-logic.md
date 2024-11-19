---
layout: project-guide
title: "Basic Logic"
type: section
permalink: /projects/turing-complete/basic-logic/
section: "turing-complete"
status: "Completed"
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
In this section, we will go through all the Basic Logic levels. These include digital logic gates such as NOR, NOT, NAND, and others. Note that we are skipping the first level since it is simply connecting two nodes with a wire(Which, if you need an explanation, is how we get a signal to flow from the input to the output).

## Quick Navigation {#navigation}

<div class="subsection-grid">
  <div class="subsection-card">
    <h3>NAND Gate</h3>
    <p>Basic Logic Level 2</p>
    <a href="#nand-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>AND Gate</h3>
    <p>Combining inputs with AND logic</p>
    <a href="#and-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <!-- Add more subsection cards as needed -->
</div>

## Challenges {#challenges}

### NAND Gate {#nand-gate}
What is a NAND gate? Think of a NAND gate like a doorman at a club with two switches. Both switches must be turned ON (we call them 1 and 2) for the doorman to say NO (our output, which would be 0). In any other situation - if either switch or both switches are OFF - the doorman says YES (which would output 1). It's one of the most basic building blocks in computers which you can use these simple yes/no decisions to create all the complex operations that happen in modern electronics.

<div class="image-grid">
  ![Circuit Design](/assets/images/BasicLogic/NANDGATE.png)
  {: .grid-image}
</div>


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
