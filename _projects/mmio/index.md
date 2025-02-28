---
layout: project-guide
title: "Memory-Mapped I/O Implementation"
type: main
description: "Implementing memory-mapped I/O interfaces between a microcontroller and FPGA"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/mmio/banner.jpg"
sections:
  - id: overview
    title: "Project Overview"
    icon: "fa-info-circle"
  - id: concepts
    title: "MMIO Concepts"
    icon: "fa-microchip"
  - id: implementation
    title: "Implementation Details"
    icon: "fa-code"
  - id: sections
    title: "Lab Sections"
    icon: "fa-book"
---

## Project Overview {#overview}
This project explores Memory-Mapped I/O (MMIO) interfaces, a fundamental concept in embedded systems. I implemented a custom MMIO system connecting an STM32 microcontroller to a GOWIN FPGA, allowing the microcontroller to directly read push buttons and control LEDs on the FPGA through memory access operations.

The project demonstrates how standard memory read/write operations can be used to interact with external hardware, bridging the gap between software and hardware interfaces in embedded system design.

## MMIO Concepts {#concepts}
Memory-Mapped I/O is a technique where hardware devices are mapped to specific memory addresses, allowing the CPU to communicate with peripherals using standard memory access instructions.

In this project:
- The STM32's Flexible Memory Controller (FMC) is configured to interface with the FPGA
- The FPGA implements custom memory registers to store and retrieve data
- Memory transactions (reads/writes) are transmitted over a parallel bus interface
- D-latches and tri-state buffers are used to implement the memory-mapped registers

![MMIO Concept](/assets/images/mmio/mmio-concept.jpg)
{: .project-image}
*Memory-Mapped I/O allows peripherals to be accessed through memory addresses*

## Implementation Details {#implementation}
The implementation involves both hardware design (Verilog HDL) and software (C code) components:

### Hardware Components
- **GOWIN FPGA** - Implements the memory registers and I/O interfaces
- **STM32 Nucleo** - Provides the processor and memory controller
- **Custom Interposer PCB** - Connects the FPGA and microcontroller

### Software Elements
- **STM32 FMC Configuration** - Sets up the memory controller interface
- **Memory Access Code** - C code that reads/writes to memory-mapped addresses
- **Verilog HDL** - Implements the memory interface logic in the FPGA

## Lab Sections {#sections}

<div class="guide-sections">
  <div class="section-card">
    <a href="{{ site.baseurl }}/projects/mmio/lab3" class="section-link">
      <h3><i class="fas fa-microchip"></i> Lab 3: Basic MMIO</h3>
      <p>Implementation of basic MMIO interfaces with an FPGA</p>
      <span class="section-status completed">Completed</span>
    </a>
  </div>

  <div class="section-card">
    <a href="{{ site.baseurl }}/projects/mmio/advanced" class="section-link">
      <h3><i class="fas fa-cogs"></i> Advanced MMIO</h3>
      <p>Extending MMIO concepts with multiple devices</p>
      <span class="section-status in-progress">Planned</span>
    </a>
  </div>
</div>
