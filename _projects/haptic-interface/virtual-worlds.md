---
layout: project-guide
title: "Virtual Worlds Implementation"
type: section
permalink: /projects/haptic-interface/virtual-worlds/
section: "haptic-interface"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/haptic-interface/worlds-banner.jpg"
sections:
  - id: overview
    title: "Implementation Overview"
    icon: "fa-info-circle"
  - id: spring
    title: "Virtual Spring"
    icon: "fa-compress-alt"
  - id: wall
    title: "Virtual Wall"
    icon: "fa-border-style"
  - id: pwm
    title: "PWM Implementation"
    icon: "fa-wave-square"
  - id: performance
    title: "Performance Analysis"
    icon: "fa-tachometer-alt"
---

## Implementation Overview {#overview}
This page details the technical implementation of the virtual haptic environments, including the mathematical models, code implementation, and performance characteristics of each world.

The core of each virtual world is a mathematical model that relates wheel position (measured in degrees or encoder ticks) to motor torque (applied in N·mm). The microcontroller reads the wheel position using a quadrature decoder, calculates the appropriate reaction torque based on the virtual world model, and outputs a PWM signal with the corresponding duty cycle to create that torque.

## Virtual Spring {#spring}
A virtual spring creates a linear relationship between displacement and force, following Hooke's Law: F = -kx.

### Mathematical Model
For a rotational spring:
- Torque (τ) = -k × θ
- Where k is the spring constant (N·mm/degree) and θ is the angular displacement (degrees)

### Implementation
```c
float virtualSpring(float angle)
{
    float k_spring = 5;  // N·mm per degree
    float torque = -k_spring * angle;
    return torque;
}
```

### Oscillation Analysis
When released from an initial displacement, the wheel oscillates with a frequency determined by:

```
f = (1/2π) × √(k/J)
```

Where J is the moment of inertia of the wheel (6.4×10^-4 kg·m²/radian).

Theoretical oscillation frequency: 1.4 Hz
Measured oscillation frequency: 1.2 Hz

![Spring Oscillation](/assets/images/haptic-interface/spring-oscillation.jpg)
{: .project-image}
*Oscilloscope capture showing the oscillation of the wheel when released from an initial displacement*

## Virtual Wall {#wall}
A virtual wall creates a boundary at a specific position, with free movement on one side and resistance when attempting to penetrate the wall.

### Mathematical Model
- If angle > WALL_POSITION: Torque = 0 (free movement)
- If angle < WALL_POSITION: Torque = -k_wall × (angle - WALL_POSITION)

### Implementation
```c
float virtualWall(float angle)
{
    float torque = 0;
    float k_wall = 500;  // N·mm per degree
    if (angle < WALL_POSITION || angle > WALL_POSITION+359)
    {
        torque = -k_wall * (angle - WALL_POSITION);
    }
    return torque;
}
```

### Tuning Considerations
The wall stiffness (k_wall) determines how rigid the wall feels:
- k_wall too low: The wall feels soft and easily penetrable
- k_wall too high: The wall can become unstable with oscillations
- Optimal value: ~500 N·mm/degree provides a convincing wall sensation

![Wall Response](/assets/images/haptic-interface/wall-response.jpg)
{: .project-image}
*Response characteristics of the virtual wall with different spring constants*

## PWM Implementation {#pwm}
The system uses Pulse Width Modulation (PWM) to control the motor torque:

### PWM Configuration
- Frequency: 20 kHz
- Duty cycle range: 24% to 76%
- Resolution: 0.2% (10-bit effective resolution)

### Torque Mapping
```c
void outputTorque(float torque)
{
    // Convert torque in N·mm to motor input (N·m)
    float motorTorque = torque/1000; 
    
    // Map torque to duty cycle (linear relationship)
    float dutyCycle = motorTorque/3.1625 + 0.5;
    
    // Apply duty cycle limits
    if(dutyCycle < DC_LOWER_LIMIT) {
        dutyCycle = DC_LOWER_LIMIT;
    }
    else if(dutyCycle > DC_UPPER_LIMIT) {
        dutyCycle = DC_UPPER_LIMIT;
    }
    
    // Update PWM with new duty cycle
    setPWM(MOTOR_SUBMODULE, MOTOR_CHANNEL, MOTOR_FREQUENCY, dutyCycle);
}
```

## Performance Analysis {#performance}
The performance of the virtual worlds was analyzed based on:

### System Response Time
- Software execution loop time: 42 μs
- Motor electrical time constant: ~1 ms
- Overall system response time: ~5 ms

### Torque Limitations
- Maximum torque: ±800 N·mm (limited by duty cycle constraints)
- For a spring with k = 5 N·mm/degree, this limits displacement to ±160 degrees
- For a wall with k = 500 N·mm/degree, saturation occurs after 1.6 degrees of penetration

### Frequency Response
- Maximum theoretical oscillation frequency: ~7 Hz (limited by system inertia)
- Actual bandwidth: ~3 Hz (limited by software execution time and motor dynamics)

The system provides convincing haptic feedback for low-frequency interactions but cannot accurately reproduce high-frequency effects like vibrations or impacts.

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href=".." class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
