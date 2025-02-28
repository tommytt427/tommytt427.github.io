---
layout: project-guide
title: "Virtual Wall Implementation"
type: section
permalink: /projects/haptic/virtual-wall/
section: "haptic"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/haptic/wall-banner.jpg"
sections:
  - id: overview
    title: "Implementation Overview"
    icon: "fa-info-circle"
  - id: theory
    title: "Physical Model & Theory"
    icon: "fa-book"
  - id: implementation
    title: "Code Implementation"
    icon: "fa-code"
  - id: results
    title: "Results & Analysis"
    icon: "fa-chart-line"
---

## Implementation Overview {#overview}
The virtual wall implementation creates a haptic boundary that restricts movement in one direction. Unlike the virtual spring which applies force proportionally in all directions, the virtual wall creates a distinctly asymmetric force profile: zero force when outside the wall, and a strong opposing force when attempting to penetrate the wall.

This simulates the experience of encountering a physical barrier, providing intuitive feedback for boundary constraints in a virtual environment.

Key features of this implementation:
- Unilateral constraint model with configurable wall position
- High stiffness coefficient for realistic rigidity
- Clear transition between free space and constraint
- Conditional force computation based on position relative to the wall boundary

## Physical Model & Theory {#theory}

### Wall Physics
A virtual wall is modeled as a unilateral constraint with the following characteristics:

1. When the position is outside the wall boundary, no force is applied
2. When the position penetrates the wall boundary, a strong spring-like restoring force is applied

This can be expressed mathematically as:

$$\tau = \begin{cases} 
-k_{wall} \cdot (\theta - \theta_{wall}) & \text{if } \theta < \theta_{wall} \\
0 & \text{if } \theta \geq \theta_{wall}
\end{cases}$$

Where:
- $\tau$ is the torque in N⋅mm
- $k_{wall}$ is the wall stiffness constant in N⋅mm/degree
- $\theta$ is the current angular position in degrees
- $\theta_{wall}$ is the wall boundary position in degrees

### Stability Considerations
The virtual wall implementation presents several stability challenges:

1. **Sampling Delays**: The discrete-time implementation creates a delay between position measurement and force application
2. **Z-width Limitations**: The maximum achievable stiffness is limited by both hardware constraints and sampling rate
3. **Passivity**: Ensuring the wall doesn't add energy to the system, which could cause unstable oscillations

The stiffness coefficient must be carefully chosen to balance between realism (higher stiffness) and stability (lower stiffness).

## Code Implementation {#implementation}

### Virtual Wall Function
The virtual wall is implemented with a simple conditional statement that applies force only when the position is on the "inside" of the wall:

```c
float virtualWall(float angle)
{
    float torque = 0;
    float k_wall = 500;  // Wall stiffness in N-mm/degree
    
    if (angle < WALL_POSITION) {
        torque = -k_wall * (angle - WALL_POSITION);
    }
    
    return torque;
}
```

This implementation sets the wall at the position defined by `WALL_POSITION` (typically 0 degrees) and applies a stiff spring-like force when penetrating the wall.

### Integration with Control Loop
The wall function is integrated into the same control loop structure used for the virtual spring:

```c
while(1)
{
    // Read current angle
    angle = updateAngle();
    
    // Calculate wall torque
    torque = virtualWall(angle);
    
    // Apply torque to motor
    outputTorque(torque);
}
```

### Handle Angle Wraparound
When the encoder counts exceed one full rotation, we need to properly handle angle wraparound to ensure the wall remains at a consistent position:

```c
// Enhanced wall function that handles wraparound
float virtualWall(float angle)
{
    float torque = 0;
    float k_wall = 500;  // Wall stiffness in N-mm/degree
    
    // Normalize angle to 0-360 range
    while (angle < 0) angle += 360;
    while (angle >= 360) angle -= 360;
    
    if (angle < WALL_POSITION || angle > WALL_POSITION+359) {
        torque = -k_wall * (angle - WALL_POSITION);
    }
    
    return torque;
}
```

## Results & Analysis {#results}

### Stiffness Optimization
We tested various stiffness coefficients to find the optimal balance between rigidity and stability:

| Wall Stiffness (N⋅mm/degree) | Perceived Hardness | System Stability |
|------------------------------|-------------------|-----------------|
| 100                          | Soft, penetrable  | Very stable     |
| 300                          | Moderate          | Stable          |
| 500                          | Firm              | Good balance    |
| 1000                         | Very hard         | Slight oscillation |
| 2000                         | Extremely rigid   | Unstable at impacts |

A stiffness coefficient of 500 N⋅mm/degree provided the best balance between a convincing hard surface feel and stable operation.

### Penetration Analysis
With the selected stiffness of 500 N⋅mm/degree and maximum torque of 824 N⋅mm, the maximum penetration into the wall before torque saturation is 1.65 degrees. This small displacement creates a convincing illusion of a solid barrier while maintaining stability.

### Torque Profiles
The oscilloscope measurements of the PWM duty cycle showed the expected patterns:
- Constant 50% duty cycle when outside the wall (zero torque)
- Rapid transition to high or low duty cycle when contacting the wall
- Proportionally changing duty cycle based on penetration depth

![Wall Torque Profile](/assets/images/haptic/wall-torque-profile.jpg)
{: .project-image}
*Oscilloscope capture showing PWM duty cycle transitions at wall contact*

### Effect of Extremely High Stiffness
When testing very high stiffness values (>1000 N⋅mm/degree), we observed:
1. Increased oscillations when contacting the wall
2. "Chattering" at the boundary where the system rapidly switched between applying force and not applying force
3. In extreme cases, unstable behavior that could potentially damage the hardware

This demonstrates the fundamental tradeoff between wall hardness and system stability in haptic rendering.

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href="{{ site.baseurl }}/projects/haptic" class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
