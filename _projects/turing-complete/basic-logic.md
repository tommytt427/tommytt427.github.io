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
    <h3>NOT Gate</h3>
    <p>Basic Logic Level 3</p>
    <a href="#not-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>AND Gate</h3>
    <p>Basic Logic Level 4</p>
    <a href="#and-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>NOR Gate</h3>
    <p>Basic Logic Level 5</p>
    <a href="#nor-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>OR Gate</h3>
    <p>Basic Logic Level 6</p>
    <a href="#or-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>ALWAYS On</h3>
    <p>Basic Logic Level 7</p>
    <a href="#always-on" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>Second Tick</h3>
    <p>Basic Logic Level 8</p>
    <a href="#second-tick" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>XOR Gate</h3>
    <p>Basic Logic Level 9</p>
    <a href="#xor-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>Bigger OR Gate</h3>
    <p>Basic Logic Level 10</p>
    <a href="#bigger-or-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>Bigger AND Gate</h3>
    <p>Basic Logic Level 11</p>
    <a href="#bigger-and-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>

  <div class="subsection-card">
    <h3>XNOR Gate</h3>
    <p>Basic Logic Level 12</p>
    <a href="#xnor-gate" class="subsection-link">Jump to solution <i class="fas fa-arrow-right"></i></a>
  </div>
  

  <!-- Add more subsection cards as needed -->
</div>

## Challenges {#challenges}

### NAND Gate {#nand-gate}
What is a NAND gate? Think of a NAND gate like a doorman at a club with two switches. Both switches must be turned ON (we call them 1 and 2) for the doorman to say NO (our output, which would be 0). In any other situation - if either switch or both switches are OFF - the doorman says YES (which would output 1). It's one of the most basic building blocks in computers which you can use these simple yes/no decisions to create all the complex operations that happen in modern electronics.

![Circuit Design](/assets/images/BasicLogic/NANDGATE.png)
{: .project-image}
*NAND gates are the introverts of logic—they prefer NOT to AND together.*


### NOT Gate {#not-gate}
A NOT gate is like a light switch that does the opposite of what you tell it - when you say ON (1), it gives you OFF (0), and when you say OFF (0), it gives you ON (1). It's like opposite day, except a circuit!

![Circuit Design](/assets/images/BasicLogic/NOTGATE.png)
{: .project-image}

### AND Gate {#and-gate}
Now let's say this - we only have NOT and NAND gates at our disposal and we want to create a gate where when both inputs are 1, then our output is ON. Think of an AND gate as a clever combination of gates: we take a NAND gate and then add a NOT gate after it. This flips the NAND's output to give us what we want - now we only get YES (1) when both inputs are ON (1), and NO (0) for everything else.

![Circuit Design](/assets/images/BasicLogic/ANDGATE.png)
{: .project-image}
*A clever way of creating an AND gate with just a NOT and a NAND gate!*

### NOR Gate {#nor-gate}
Let us say we want the opposite of OR's outputs, in this case, a NOR gate. How do we make this with just NAND and NOT gates? We can first NOT both inputs of NAND to flip our outputs, and then NOT the output of NAND to get the opposite of our outputs!

![Circuit Design](/assets/images/BasicLogic/NORGATE.png)
{: .project-image}




<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href=".." class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
