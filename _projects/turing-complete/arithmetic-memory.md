---
layout: project-guide
title: "Arithmetic & Memory"
type: section
permalink: /projects/turing-complete/arithmetic-memory/
section: "turing-complete"
status: "Completed"
last_updated: "2024-11-26"
project_image: "/assets/images/turing-complete/arithmetic-memory-banner.png"
sections:
  - id: overview
    title: "Section Overview"
    icon: "fa-info-circle"
  - id: arithmetic
    title: "Arithmetic Operations"
    icon: "fa-calculator"
    subsections:
      - id: double-trouble
        title: "Double Trouble"
      - id: full-adder
        title: "Full Adder"
      - id: multi-bit-adder
        title: "Multi-Bit Adder"
      - id: subtractor
        title: "Subtractor"
  - id: memory
    title: "Memory Components"
    icon: "fa-memory"
    subsections:
      - id: d-latch
        title: "D-Latch"
      - id: d-flip-flop
        title: "D Flip-Flop"
      - id: register
        title: "Register"
  - id: advanced
    title: "Advanced Circuits"
    icon: "fa-microchip"
    subsections:
      - id: multiplexer
        title: "Multiplexer"
      - id: demultiplexer
        title: "Demultiplexer"
      - id: decoder
        title: "Decoder"
---

## Section Overview {#overview}
In this section, we explore arithmetic operations and memory components - the building blocks that allow computers to perform calculations and store information. We'll start with basic arithmetic circuits like adders, then move on to memory elements that can store and maintain state, and finally cover some advanced circuits that tie everything together.

## Quick Navigation {#navigation}

### Arithmetic Operations
<div class="subsection-grid">
  <div class="subsection-card">
    <h3>Double Trouble</h3>
    <p>This level has 4 inputs. Output is high when 2 or more of them are high.</p>
    <a href="#double-trouble" class="subsection-link">View solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>Full Adder</h3>
    <p>1-bit addition with carry</p>
    <a href="#full-adder" class="subsection-link">View solution <i class="fas fa-arrow-right"></i></a>
  </div>
  
  <!-- Add other arithmetic subsections -->
</div>

### Memory Components
<div class="subsection-grid">
  <div class="subsection-card">
    <h3>D-Latch</h3>
    <p>Basic memory element</p>
    <a href="#d-latch" class="subsection-link">View solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>D Flip-Flop</h3>
    <p>Edge-triggered storage</p>
    <a href="#d-flip-flop" class="subsection-link">View solution <i class="fas fa-arrow-right"></i></a>
  </div>
  
  <!-- Add other memory subsections -->
</div>

### Advanced Circuits
<div class="subsection-grid">
  <div class="subsection-card">
    <h3>Multiplexer</h3>
    <p>Data selection circuit</p>
    <a href="#multiplexer" class="subsection-link">View solution <i class="fas fa-arrow-right"></i></a>
  </div>
  
  <!-- Add other advanced circuit subsections -->
</div>

## Arithmetic Operations {#arithmetic}

### Double Trouble {#double-trouble}
In this level, we are tasked to create a circuit that outputs high if at least two inputs are on. This is also known as a majority logic circuit! These are commonly used for fault-tolerant systems or for decision making processes such as a voting system or controls!

![Half Adder Circuit](/assets/images/ArithmeticMemory/DOUBLETROUBLE.png)
{: .project-image}


#### Design Steps
1. We use six AND gates to detect when each pair of inputs is high
2. We use OR gates to combine the outputs of all pairs, so if any pair is high, the output is high.
3. We connect the final OR gate to the output.

### Full Adder {#full-adder}
[Content for full adder...]

## Memory Components {#memory}

### D-Latch {#d-latch}
[Content for D-Latch...]

## Advanced Circuits {#advanced}

### Multiplexer {#multiplexer}
[Content for multiplexer...]

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href=".." class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
