 

### KV Rating (Motor Velocity Constant) Definition

The **KV rating** ($K_v$) of a brushless DC (BLDC) motor is its **velocity constant**, defined as the number of revolutions per minute (RPM) that the motor will turn per 1 Volt of applied direct current (DC) under no-load conditions. It is a strict physical constant determined by the internal winding topology (number of turns per slot) and magnetic flux density ($B$) of the rotor.

### 1. Electro-Mechanical Physics Formulations

#### The Voltage-to-RPM Fundamental Relationship

Under zero-load conditions, the theoretical maximum rotational speed ($\omega_{max}$) is strictly linear to the applied armature voltage ($V_a$):

$$\omega_{no\_load} = K_v \cdot V_a$$

Where:

- $\omega_{no\_load}$: Rotational velocity in Revolutions Per Minute ($\text{RPM}$).
    
- $K_v$: Motor Velocity Constant ($\text{RPM/V}$).
    
- $V_a$: Armature voltage applied by the FOC ESC ($\text{V}$).
    

#### Back-Electromotive Force (Back-EMF) and the Torque Link ($K_t$)

As a motor spins, it acts as a generator, producing an internal counter-voltage known as Back-EMF ($e$). The Back-EMF constant ($K_e$) is the inverse of the velocity constant ($K_v$).

By conservation of energy, the motor torque constant ($K_t$), which dictates how much mechanical torque ($\tau$) is produced per Ampere ($I$) of current, is inversely proportional to $K_v$:

$$K_t = \frac{60}{2\pi \cdot K_v} \approx \frac{9.549}{K_v}$$

$$\tau = K_t \cdot I_{motor}$$

Where:

- $K_t$: Torque constant in Newton-meters per Ampere ($\text{N}\cdot\text{m/A}$).
    
- $I_{motor}$: Armature current line draw ($\text{A}$).
    
- **Low KV (e.g., 120 KV):** Fewer wire turns of thick gauge. High torque constant ($K_t$). Produces massive turning force per Ampere, allowing it to spin very large propellers ($30\text{ inch}$) efficiently at lower RPMs without overheating.
    
- **High KV (e.g., 2000 KV):** More turns of thin wire. Low torque constant ($K_t$), high RPM output. Optimized for small, low-inertia props ($5\text{ inch}$) that require rapid velocity spikes rather than raw lifting torque.
    

### 2. Live Parameter Mapping Block (Propulsion Core)

|**Parameter Element**|**Technical Symbol**|**Governing Formula / Relation**|**Calculated Asset Value**|
|---|---|---|---|
|**Selected Motor KV**|$K_v$|Physical hardware specification|$120.0 \text{ RPM/V}$|
|**Nominal Bus Voltage**|$V_{sys}$|$12\text{S Semi-Solid Array}$|$44.4 \text{ V}$|
|**Theoretical Max RPM**|$\omega_{no\_load}$|$K_v \cdot V_{sys}$|$5,328 \text{ RPM}$|
|**Loaded Efficiency Index**|$\eta_{load}$|Under aerodynamic blade load ($\approx 80\%$)|$4,262 \text{ RPM}$|
|**Derived Torque Constant**|$K_t$|$9.549 / K_v$|$0.0796 \text{ N}\cdot\text{m/A}$|

### 3. KV Winding Topology & Electrical Behavior

The internal relationship between voltage, back-EMF, and torque generation follows this electrical layout:

```
             [ FOC ESC Driver ]
            /        |        \
     (Phase A)   (Phase B)   (Phase C)
           \         |         /
      [ Low KV: 120 RPM/V Configuration ]
       • Thick Copper Wire Gauges
       • Low Internal Resistance (R_m)
       • High Magnetic Flux Interception
                     |
         Generates High Back-EMF (e) 
         Limits top speed but unlocks:
   ===► High Mechanical Torque output (N·m) ◄===
```

- **The Loaded Speed Drop:** When the $30\times9.0$ inch carbon propeller is bolted to the motor, air resistance exerts a counter-torque. The motor draws current ($I$) to match this torque, causing an internal voltage drop across the motor's winding resistance ($R_m$):
    

$$\omega_{loaded} = K_v \cdot (V_a - I \cdot R_m)$$

### 4. Next Step Verification Protocol

The motor velocity constant ($120\text{ KV}$) and its inverse torque relationship are mathematically integrated. Write your next hardware parameter or subsystem evaluation on paper to continue the sequence.