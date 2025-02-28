---
layout: project-guide
title: "Haptic Interface Virtual Worlds"
type: main
description: "Implementation of virtual haptic environments using embedded control systems with PWM and quadrature decoding"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/haptic/banner.jpg"
sections:
  - id: overview
    title: "Project Overview"
    icon: "fa-info-circle"
  - id: concepts
    title: "Virtual World Concepts"
    icon: "fa-globe"
  - id: implementation
    title: "Implementation Details"
    icon: "fa-microchip"
  - id: worlds
    title: "Virtual World Implementations"
    icon: "fa-cube"
  - id: results
    title: "Results & Analysis"
    icon: "fa-chart-line"
---

## Project Overview {#overview}
This project implements a real-time haptic interface that simulates various virtual environments with force feedback. Using an STM32K144 microcontroller interfaced with a DC motor and quadrature encoder, the system creates tangible virtual worlds that users can interact with through a haptic wheel.

By combining precise PWM-based torque control with high-resolution position tracking, the system can simulate physical properties like springs, walls, and dampers - allowing users to "feel" these virtual objects through the haptic wheel. This creates an intuitive, tactile experience where the boundary between digital simulation and physical reality blurs.

Key project achievements include:
- Implementation of various virtual environments with realistic haptic feedback
- High-precision torque control using PWM modulation techniques
- Quadrature decoding for accurate position tracking
- Real-time force computation for responsive haptic interaction

## Virtual World Concepts {#concepts}
The virtual worlds in this project are based on physical models that translate position and velocity information into appropriate force feedback. Each model produces different tactile sensations that simulate distinct physical experiences.

### Virtual Spring
A virtual spring creates a proportional restoring force based on displacement from a reference position. The further the wheel is rotated from its equilibrium position, the stronger the opposing force becomes.

![Virtual Spring Concept](/assets/images/haptic/spring-concept.jpg)
{: .project-image}
*Virtual spring model: Force is proportional to displacement from equilibrium*

The mathematical model is simple: `F = -k * θ`, where:
- `F` is the force (or torque in our rotational system)
- `k` is the spring constant (determining stiffness)
- `θ` is the angular displacement from equilibrium

### Virtual Wall
A virtual wall creates a boundary that resists penetration. When the haptic interface is on one side of the boundary, no force is applied. Once the boundary is crossed, a strong opposing force is generated.

![Virtual Wall Concept](/assets/images/haptic/wall-concept.jpg)
{: .project-image}
*Virtual wall model: Force is applied only when the boundary is crossed*

The mathematical model uses a conditional statement:
```
if θ < wall_position:
    F = -k_wall * (θ - wall_position)
else:
    F = 0
```

### Other Virtual Environments
The system architecture supports the implementation of more complex models including:
- Spring-damper systems (adding velocity-dependent resistance)
- Mass-spring systems (simulating inertial properties)
- Textured surfaces (using oscillating force patterns)
- Virtual knobs with detents (discrete positions with snap-in behavior)

## Implementation Details {#implementation}

### Hardware Architecture
The system uses the following components:
- STM32K144 microcontroller for computation and control
- DC motor with power amplifier for force output
- Quadrature encoder for position sensing (4000 counts/revolution)
- Switched capacitor filter to convert PWM to analog signal

![Hardware Architecture](/assets/images/haptic/hardware-architecture.jpg)
{: .project-image}
*System architecture showing signal flow between components*

### PWM-Based Torque Control
The DC motor torque is controlled using Pulse Width Modulation (PWM). The relationship between duty cycle and torque is:

```
Torque (N·mm) = 3162.5 * (Duty Cycle - 0.5)
```

With duty cycle constrained between 0.24-0.76 to maintain linear operation and prevent damage to the hardware.

### Position Tracking
The quadrature encoder provides 4000 counts per revolution, enabling high-resolution position tracking. The system keeps track of absolute position through overflow/underflow handling, allowing for unlimited rotation while maintaining precise position information.

## Virtual World Implementations {#worlds}

<div class="guide-sections">
  <div class="section-card">
    <a href="{{ site.baseurl }}/projects/haptic/virtual-spring" class="section-link">
      <h3><i class="fas fa-compress-alt"></i> Virtual Spring</h3>
      <p>Implementation of elastic force feedback</p>
      <span class="section-status completed">Completed</span>
    </a>
  </div>

  <div class="section-card">
    <a href="{{ site.baseurl }}/projects/haptic/virtual-wall" class="section-link">
      <h3><i class="fas fa-grip-lines-vertical"></i> Virtual Wall</h3>
      <p>Creating boundary-based force feedback</p>
      <span class="section-status completed">Completed</span>
    </a>
  </div>

  <div class="section-card">
    <a href="{{ site.baseurl }}/projects/haptic/advanced-models" class="section-link">
      <h3><i class="fas fa-shapes"></i> Advanced Models</h3>
      <p>Complex models with inertia and damping</p>
      <span class="section-status in-progress">Planned</span>
    </a>
  </div>
</div>

## Results & Analysis {#results}

### Virtual Spring Performance
The virtual spring implementation achieved excellent correlation between theoretical and measured oscillation frequencies. With a spring constant of 5 N·mm/degree, the system produced clean, consistent oscillations that matched predicted behavior.

Key measurements:
- Theoretical oscillation frequency: 1.41 Hz
- Measured oscillation frequency: 1.38 Hz
- Software loop execution time: ~50 μs

![Spring Oscillation](/assets/images/haptic/spring-oscillation.jpg)
{: .project-image}
*Oscilloscope capture showing virtual spring oscillation pattern*

### Virtual Wall Performance
The virtual wall implementation successfully created a convincing boundary sensation. Various spring constants were tested to find the optimal balance between firmness and stability.

Best results were achieved with:
- Wall spring constant: 500 N·mm/degree
- Clear transition between free movement and boundary
- Minimal "bounce-back" effect when hitting the wall at high speed

### Performance Limitations
- Maximum torque is limited by the 24%-76% duty cycle constraint
- Discrete sampling introduces some quantization in the force output
- Software loop execution time creates a small delay in feedback response
