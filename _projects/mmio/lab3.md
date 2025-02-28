---
layout: project-guide
title: "Lab 3: MMIO Implementation"
type: section
permalink: /projects/mmio/lab3/
section: "mmio"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/mmio/lab3-banner.jpg"
sections:
  - id: overview
    title: "Lab Overview"
    icon: "fa-info-circle"
  - id: setup
    title: "Hardware Setup"
    icon: "fa-tools"
  - id: implementation
    title: "Implementation"
    icon: "fa-code"
    subsections:
      - id: write-register
        title: "Write Register"
      - id: read-register
        title: "Read Register"
      - id: full-implementation
        title: "Full Implementation"
  - id: results
    title: "Results & Analysis"
    icon: "fa-chart-line"
---

## Lab Overview {#overview}
This lab explores the fundamentals of Memory-Mapped I/O (MMIO) by creating a direct interface between an STM32 microcontroller and a GOWIN FPGA. The lab demonstrates how memory access operations can be used to control external hardware and read input states.

### Objectives
- Understand the principles of Memory-Mapped I/O
- Configure the Flexible Memory Controller (FMC) on the STM32
- Implement memory registers in Verilog HDL on the FPGA
- Create a bidirectional interface for reading switches and controlling LEDs

## Hardware Setup {#setup}
The lab uses a custom interposer board to connect the STM32 Nucleo and the GOWIN Tang Nano FPGA. This setup establishes a parallel bus interface between the two devices through the STM32's FMC controller.

![Hardware Setup](/assets/images/mmio/hardware-setup.jpg)
{: .project-image}
*The FPGA and STM32 connected via the interposer board*

### Components Used
- STM32 Nucleo board
- Tang Nano FPGA (GW1NZ-LV1QN48C6/I5)
- Custom interposer PCB
- Logic analyzer for debugging

### Connections
The connections between the STM32 and FPGA include:
- Data lines (D0-D7)
- Address lines (A0-A3)
- Control signals (NE1, NWE, NOE, NWAIT)

![Signal Connections](/assets/images/mmio/signal-connections.jpg)
{: .project-image}
*Logic analyzer connections to the memory interface signals*

## Implementation {#implementation}

### Write Register {#write-register}
The first implementation was a simple write register that allows the STM32 to control an LED on the FPGA. This involves using a D-latch in the FPGA to store the value written to a specific memory address.

```verilog
module my_mmio(
  input NE1,      // Chip select for address range 0x60000000-0x63FFFFFF
  input NWE,      // Write enable (active low)
  input NOE,      // Output enable
  output NWAIT,   // Wait signal (unused)
  input [3:0] ADDR, // Address bus
  inout [7:0] DATA, // Data bus
  output reg LED_B  // Blue LED output
);

  assign NWAIT = 1;
  wire d_latch_enable;
  assign d_latch_enable = ~NE1 & ~NWE;
  
  always@(d_latch_enable or DATA) begin
    if(d_latch_enable) begin
      LED_B <= DATA[0];
    end
  end
endmodule
```

The C code to control this LED looks like:

```c
// Turn LED on
*((uint8_t *)0x60000000) = 0x01;

// Delay
for (int i = 0; i < 1000000; i++);

// Turn LED off
*((uint8_t *)0x60000000) = 0x00;
```

![Write Transaction](/assets/images/mmio/write-transaction.jpg)
{: .project-image}
*Logic analyzer capture of a write transaction*

### Read Register {#read-register}
The second part involved implementing a read register that allows the STM32 to read the state of a push button on the FPGA. This uses a tri-state buffer to place the button state on the data bus when the specific memory address is read.

```verilog
// Additional code for the read functionality
wire read_switch_enable;
assign read_switch_enable = ~NE1 & NWE & (ADDR == 4);
assign DATA[0] = (read_switch_enable) ? PB_A : 'bz;
```

The C code to read this switch:

```c
uint8_t x;
x = *((uint8_t *)0x60000004); // Reading the switch state
```

![Read Transaction](/assets/images/mmio/read-transaction.jpg)
{: .project-image}
*Logic analyzer capture of a read transaction*

### Full Implementation {#full-implementation}
The final implementation combined both read and write functionality, allowing control of all three RGB LED colors and reading both push buttons on the FPGA:

```verilog
module my_mmio(
  input NE1,      // Chip select
  input NWE,      // Write enable
  input NOE,      // Output enable
  output NWAIT,   // Wait bus
  input [3:0] ADDR, // Address bus
  inout [7:0] DATA, // Bidirectional data bus
  input PB_A,     // Push button A
  input PB_B,     // Push button B
  output reg LED_B, // Blue LED
  output reg LED_R, // Red LED
  output reg LED_G  // Green LED
);

  assign NWAIT = 1;
  wire write_enable, read_enable;
  
  // Write to LEDs when address is 0
  assign write_enable = ~NE1 & ~NWE & (ADDR == 0);
  
  // Read buttons when address is 4
  assign read_enable = ~NE1 & NWE & (ADDR == 4);
  
  // Drive data bus during reads
  assign DATA[0] = (read_enable) ? PB_A : 1'bz;
  assign DATA[1] = (read_enable) ? PB_B : 1'bz;
  
  // Latch LED values during writes
  always@(write_enable or DATA) begin
    if(write_enable) begin
      LED_B <= DATA[0];
      LED_R <= DATA[1];
      LED_G <= DATA[2];
    end
  end
endmodule
```

The C code was enhanced to cycle through colors and adjust timing based on button presses:

```c
#define DELAY_BASE 10000 // Base delay amount
volatile int delay = DELAY_BASE; // Current delay

while (1) {
  // Read buttons
  uint8_t buttons = *((uint8_t *)0x60000004);
  
  // Check for button A press - increase delay
  if((buttons & 0x01)) {
    delay += DELAY_BASE/10;
  }
  
  // Check for button B press - decrease delay
  if((buttons & 0x02)) {
    delay -= DELAY_BASE/10;
    if(delay < DELAY_BASE/10) 
      delay = DELAY_BASE/10; // Minimum delay
  }
  
  // Cycle through colors
  *((uint8_t *)0x60000000) = 0x01; // Blue
  for(volatile int i = 0; i < delay; i++);
  
  *((uint8_t *)0x60000000) = 0x02; // Red
  for(volatile int i = 0; i < delay; i++);
  
  *((uint8_t *)0x60000000) = 0x04; // Green
  for(volatile int i = 0; i < delay; i++);
}
```

## Results & Analysis {#results}

The lab successfully demonstrated key MMIO concepts:

1. **Write operations**: The STM32 could control the FPGA's LEDs by writing to memory addresses
2. **Read operations**: The STM32 could read the state of the FPGA's push buttons
3. **Address decoding**: Different functions were implemented at different memory addresses
4. **Bus transactions**: Logic analyzer captures showed the detailed timing of memory operations

### Bus Analysis
The lab also explored the behavior of different memory access widths (byte, half-word, word) and observed the resulting bus transactions:

- **Byte access**: Single transaction at the specified address
- **Half-word access**: Two sequential byte transactions
- **Word access**: Four sequential byte transactions

![Word Access](/assets/images/mmio/word-access.jpg)
{: .project-image}
*Logic analyzer capture showing multiple transactions for a 32-bit word access*

### Key Learnings
- MMIO provides a direct way to interface processors with external devices
- The hardware interface must carefully manage timing requirements
- D-latches and tri-state buffers are essential components for implementing MMIO interfaces
- Bus analysis tools are critical for debugging memory interface issues
- Memory access width affects the number of bus transactions that occur

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href=".." class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
