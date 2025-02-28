---
layout: project-guide
title: "Virtual Spring Implementation"
type: section
permalink: /projects/haptic/virtual-spring/
section: "haptic"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/haptic/spring-banner.jpg"
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
The virtual spring implementation creates a simulation of an elastic torsional element that applies restorative torque proportional to the angular displacement from a reference position. This creates a tactile sensation similar to turning a spring-loaded knob or dial, providing intuitive haptic feedback to the user.

Key features of this implementation:
- Linear spring model with configurable spring constant
- Real-time force computation based on angular position
- Stable oscillatory behavior matching theoretical predictions
- High-resolution position feedback via quadrature decoding

## Physical Model & Theory {#theory}

### Spring Physics
A basic torsional spring exerts torque according to Hooke's law:

$$\tau = -k \cdot \theta$$

Where:
- $\tau$ is the torque in N⋅mm
- $k$ is the spring constant in N⋅mm/degree
- $\theta$ is the angular displacement in degrees
- The negative sign indicates that the torque acts to restore the equilibrium position

### System Dynamics
When coupled with the inertia of the haptic wheel, the spring creates a second-order system with the equation of motion:

$$J\frac{d^2\theta}{dt^2} + k\theta = 0$$

Where $J$ is the moment of inertia of the wheel (approximately $6.4 \times 10^{-4}$ kg⋅m²/rad in our system).

This second-order system oscillates at a natural frequency:

$$f_n = \frac{1}{2\pi}\sqrt{\frac{k}{J}}$$

For a spring constant of 5 N⋅mm/degree, the expected oscillation frequency is approximately 1.41 Hz.

## Code Implementation {#implementation}

### Virtual Spring Function
The core implementation of the virtual spring is remarkably simple - we calculate the torque as directly proportional to the angle of displacement:

```c
float virtualSpring(float angle)
{
    float k_spring = 5;  // Spring constant in N-mm/degree
    float torque;
    
    torque = -k_spring * angle;
    return torque;
}
```

### Integration with Control Loop
The spring function is integrated into a real-time control loop that:
1. Reads the current angle from the encoder
2. Calculates the appropriate spring torque
3. Outputs the torque command to the motor via PWM

```c
while(1)
{
    // Read current angle
    angle = updateAngle();
    
    // Calculate spring torque
    torque = virtualSpring(angle);
    
    // Apply torque to motor
    outputTorque(torque);
}
```

### Torque Output Function
The `outputTorque()` function converts torque values to appropriate PWM duty cycles, ensuring the output is within the safe operating range:

```c
void outputTorque(float torque)
{
    // Calculate duty cycle
    float motorTorque = torque/1000;  // Convert to N-m
    float dutyCycle = motorTorque/3.1625 + 0.5;
    
    // Apply limits (24% to 76%)
    if(dutyCycle < DC_LOWER_LIMIT) {
        dutyCycle = DC_LOWER_LIMIT;
    }
    else if(dutyCycle > DC_UPPER_LIMIT) {
        dutyCycle = DC_UPPER_LIMIT;
    }
    
    // Update PWM
    setPWM(MOTOR_SUBMODULE, MOTOR_CHANNEL, MOTOR_FREQUENCY, dutyCycle);
}
```

## Results & Analysis {#results}

### Oscillation Frequency
We measured the oscillation frequency by releasing the wheel from a small initial angle and capturing the resulting motion:

- Theoretical frequency: 1.41 Hz
- Measured frequency: 1.38 Hz
- Difference: ~2.1%

This close agreement validates our implementation and physical model.

### Stiffness Variations
We experimented with different spring constants to determine the optimal feel:

| Spring Constant (N⋅mm/degree) | Perceived Stiffness | Oscillation Frequency |
|-------------------------------|---------------------|----------------------|
| 1                             | Very soft           | 0.63 Hz              |
| 5                             | Moderate            | 1.38 Hz              |
| 20                            | Stiff               | 2.76 Hz              |
| 50                            | Very stiff          | 4.35 Hz              |

### Torque Saturation
With a maximum duty cycle of 76%, the maximum torque output is 824 N⋅mm. For the implemented spring constant of 5 N⋅mm/degree, this means the torque would saturate at displacements beyond 164.8 degrees.

For a spring constant of 50 N⋅mm/degree, saturation would occur at just 16.5 degrees of displacement, significantly reducing the usable range of motion for the virtual spring.

### Execution Time Impact
The total execution time of the control loop, measured at approximately 50 μs, introduces a small phase delay in the feedback. At the measured oscillation frequency of 1.38 Hz, this represents a phase delay of about 0.025 degrees, which is negligible for human perception.

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href="{{ site.baseurl }}/projects/haptic" class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
