---
layout: project-guide
title: "PWM Implementation for Haptic Control"
type: section
permalink: /projects/haptic/pwm-implementation/
section: "haptic"
status: "Completed"
last_updated: "2025-02-28"
project_image: "/assets/images/haptic/pwm-banner.jpg"
sections:
  - id: overview
    title: "PWM Overview"
    icon: "fa-info-circle"
  - id: implementation
    title: "Implementation Details"
    icon: "fa-code"
  - id: challenges
    title: "Challenges & Solutions"
    icon: "fa-exclamation-triangle"
  - id: optimization
    title: "Optimization & Performance"
    icon: "fa-tachometer-alt"
---

## PWM Overview {#overview}
Pulse Width Modulation (PWM) is a technique used to control analog circuits with a digital signal. In this project, we use PWM to precisely control the torque applied by a DC motor to create haptic feedback.

Two critical PWM signals are generated in this implementation:
1. A motor control PWM signal at 20 kHz with variable duty cycle (24%-76%)
2. A filter clock PWM signal at 1 MHz with 50% duty cycle

### PWM Principle
PWM works by rapidly switching a digital signal between on and off states, with the proportion of time spent in the "on" state (duty cycle) determining the average power delivered to the load. The switching is done at a frequency high enough that the load responds to the average value rather than the individual pulses.

![PWM Signals](/assets/images/haptic/pwm-signals.jpg)
{: .project-image}
*Oscilloscope capture showing PWM signals with different duty cycles*

## Implementation Details {#implementation}

### FlexTimer Configuration
The S32K144 microcontroller's FlexTimer Module (FTM) is used to generate the PWM signals. We configure:

- FTM0 Channel 0 for motor control (20 kHz, variable duty cycle)
- FTM3 Channel 0 for filter clock (1 MHz, 50% duty cycle)

The key registers configured include:
- `SC` (Status and Control) for clock source and PWM channel enable
- `MODE` for write protection disable
- `CnSC` (Channel Status and Control) for Edge-Aligned PWM with high-true pulses
- `MOD` and `CNTIN` for counter range
- `CnV` for duty cycle threshold values

### PWM Implementation Code
Here's the core implementation for initializing and setting PWM signals:

```c
void initPWM(int submodule, int channel, int frequency, float dutyCycle)
{
    uint16_t cmax;
    cmax = PWM_CLOCK_FREQ / frequency - 1;
    
    // Disable write protection
    FTM_MODULE[submodule]->MODE |= FTM_MODE_WPDIS_MASK;
    
    // Clear the status and control register
    FTM_MODULE[submodule]->SC = 0x00000000;
    
    // Select external clock
    FTM_MODULE[submodule]->SC |= FTM_SC_CLKS_MASK;
    
    // Clear combine register for basic PWM mode
    FTM_MODULE[submodule]->COMBINE = 0x00000000;
    
    // Enable the respective channel
    FTM_MODULE[submodule]->SC |= 0b1<<(FTM_SC_PWMEN0_SHIFT+channel);
    
    // Configure for Edge Aligned PWM with High-true pulses
    FTM_MODULE[submodule]->CONTROLS[channel].CnSC = 0;
    FTM_MODULE[submodule]->CONTROLS[channel].CnSC |= FTM_CnSC_MSB(1);
    FTM_MODULE[submodule]->CONTROLS[channel].CnSC |= FTM_CnSC_MSA(1);
    FTM_MODULE[submodule]->CONTROLS[channel].CnSC |= FTM_CnSC_ELSB(1);
    FTM_MODULE[submodule]->CONTROLS[channel].CnSC |= FTM_CnSC_ELSA(0);
    
    // Set counter initial and maximum values
    FTM_MODULE[submodule]->CNTIN = 0;
    FTM_MODULE[submodule]->MOD = cmax;
    
    // Enable in debug mode (optional)
    FTM_MODULE[submodule]->CONF |= FTM_CONF_BDMMODE(0b11);
    
    // Set the initial PWM duty cycle
    setPWM(submodule, channel, frequency, dutyCycle);
}

void setPWM(int submodule, int channel, int frequency, float dutyCycle)
{
    uint16_t cthres;
    uint16_t cmax;
    
    cmax = PWM_CLOCK_FREQ / frequency - 1;
    cthres = (cmax + 1) * dutyCycle;
    
    FTM_MODULE[submodule]->MOD = cmax;
    FTM_MODULE[submodule]->CONTROLS[channel].CnV = cthres;
}
```

### Torque Control Implementation
The PWM duty cycle is mapped to motor torque using this function:

```c
void outputTorque(float torque)
{
    // Convert torque from N-mm to N-m
    float motorTorque = torque / 1000;
    
    // Calculate duty cycle (linear mapping)
    float dutyCycle = motorTorque / 3.1625 + 0.5;
    
    // Apply safety limits
    if (dutyCycle < DC_LOWER_LIMIT) {
        dutyCycle = DC_LOWER_LIMIT;
    }
    else if (dutyCycle > DC_UPPER_LIMIT) {
        dutyCycle = DC_UPPER_LIMIT;
    }
    
    // Update the motor PWM
    setPWM(MOTOR_SUBMODULE, MOTOR_CHANNEL, MOTOR_FREQUENCY, dutyCycle);
}
```

## Challenges & Solutions {#challenges}

### Duty Cycle Resolution
One key challenge was balancing PWM frequency with duty cycle resolution. With the FTM clock at 10 MHz:

- At 20 kHz, the counter maximum (`cmax`) is 499
- This gives a duty cycle resolution of 1/500 = 0.2%
- This resolution is sufficient for smooth torque control

### Avoiding PWM Update Glitches
To prevent glitches when updating the PWM duty cycle during operation, we rely on the double-buffering feature of the FTM module. This ensures that duty cycle updates occur only at the end of a PWM period, providing smooth transitions.

### Filter Clock Stability
The switched capacitor filter requires a stable 1 MHz clock with precise 50% duty cycle. Any deviation affects the filter characteristics and distorts the analog output signal. Our implementation maintains tight control of both frequency and duty cycle for this critical signal.

## Optimization & Performance {#optimization}

### Frequency Selection
The 20 kHz PWM frequency for motor control was chosen to be:
- Above the human audible range (>20 kHz) to eliminate noise
- Low enough to provide adequate duty cycle resolution (0.2%)
- High enough for smooth torque control without perceivable stepping

### Duty Cycle Limits
The duty cycle limits (24% to 76%) were established to:
- Maintain the linear relationship between duty cycle and torque
- Protect the motor driver from excessive current
- Provide a symmetrical range around the zero-torque point (50%)

### Execution Time Analysis
The PWM setup functions execute only at initialization, with minimal runtime impact. The `outputTorque()` and `setPWM()` functions are called in the main control loop with these performance characteristics:

- `setPWM()`: ~5 μs execution time
- `outputTorque()`: ~8 μs execution time (including calculations)

These execution times are small compared to the overall control loop time of ~50 μs, ensuring minimal impact on system responsiveness.

<!-- Back to main guide link -->
<div class="guide-navigation">
  <a href="{{ site.baseurl }}/projects/haptic" class="back-to-guide">
    <i class="fas fa-arrow-left"></i> Back to Main Guide
  </a>
</div>
