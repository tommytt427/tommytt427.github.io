---
layout: project-guide
title: "Haptic Interface Virtual Worlds"
type: main
description: "Implementation of virtual haptic environments with an S32K144 microcontroller using PWM modulation and torque control"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/haptic-interface/banner.jpg"
sections:
  - id: overview
    title: "Project Overview"
    icon: "fa-info-circle"
  - id: implementation
    title: "Implementation"
    icon: "fa-microchip"
  - id: virtual-worlds
    title: "Virtual Worlds"
    icon: "fa-globe"
  - id: results
    title: "Results & Analysis"
    icon: "fa-chart-line"
---

## Project Overview {#overview}
This project explores the design and implementation of virtual haptic environments using an S32K144 microcontroller. By combining quadrature decoding for position sensing with Pulse Width Modulation (PWM) for motor control, I created a system that can simulate various physical properties like springs, walls, and dampers through touch.

The haptic interface provides force feedback based on the position of a rotary wheel, allowing users to physically "feel" virtual objects through the sense of touch. This project demonstrates fundamental concepts in embedded control systems, digital signal processing, and human-computer interaction.

## Implementation {#implementation}
The system architecture combines multiple embedded control techniques:

### Hardware Components
- **S32K144 Microcontroller** - Core processing unit
- **DC Motor with Encoder** - Provides haptic feedback and position sensing
- **Switched Capacitor Filter** - 4th order Butterworth filter for PWM-to-analog conversion
- **Power Amplifier** - Drives the motor with the appropriate current

### Key Technical Features
- **Quadrature Decoding** - Tracks wheel position with 4000 counts per revolution
- **PWM Modulation** - Generates precise duty cycles (24%-76%) at 20kHz
- **Real-time Control Loop** - Reads position, calculates forces, and updates PWM output
- **Torque Mapping** - Converts desired torque (N·mm) to appropriate duty cycle values

![System Architecture](/assets/images/haptic-interface/system-architecture.jpg)
{: .project-image}
*Hardware architecture showing the signal flow from microcontroller to haptic feedback*

## Virtual Worlds {#virtual-worlds}
I implemented several virtual haptic environments, each with unique physical properties:

### Virtual Spring
The spring model applies a restoring torque proportional to angular displacement:

```c
float virtualSpring(float angle)
{
    float k_spring = 5;  // Spring constant (N·mm/degree)
    float torque = -k_spring * angle;
    return torque;
}
```

This creates a sensation of pushing against a spring, with increasing resistance as the wheel rotates further from the center position.

### Virtual Wall
The wall model creates a rigid boundary at a specific angular position:

```c
float virtualWall(float angle)
{
    float torque = 0;
    float k_wall = 500;  // Wall stiffness (N·mm/degree)
    if (angle < WALL_POSITION)
    {
        torque = -k_wall * (angle - WALL_POSITION);
    }
    return torque;
}
```

Users feel free movement on one side of the boundary, but encounter resistance when attempting to move through the virtual wall.

![Virtual World Models](/assets/images/haptic-interface/virtual-world-models.jpg)
{: .project-image}
*Visualization of virtual spring (left) and virtual wall (right) force profiles*

## Results & Analysis {#results}
The implementation demonstrated several interesting findings:

### Spring Oscillation Analysis
For a spring constant of 5 N·mm/degree with a wheel moment of inertia of 6.4×10^-4 kg·m²/radian, the theoretical oscillation frequency was 1.4 Hz. In practice, the measured oscillation frequency was 1.2 Hz, with the difference attributed to:

- Software execution time creating a delay in the control loop
- Mechanical friction providing damping to the system
- Motor dynamics affecting the response

### Wall Stiffness Trade-offs
While increasing the wall spring constant (k_wall) made the wall feel more rigid, extremely high values (>1000 N·mm/degree) resulted in oscillatory behavior as the system repeatedly corrected position. The optimal value was found to be approximately 500 N·mm/degree, providing a good balance between:

- Wall rigidity and stability
- Smooth transitions between free movement and wall contact
- Prevention of torque saturation (limited to ±800 N·mm)

The project successfully demonstrated that convincing haptic environments can be created with relatively simple control algorithms and careful tuning of system parameters.
