Mode: EXAMINER | Loc: Pimpri-Chinchwad | Time: 23:23 | Energy: HIGH

### Wheelbase (Motor-to-Motor Distance) Definition

In multirotor engineering, the **wheelbase** (often designated as frame size) is the maximum diagonal distance between the rotation axes of two opposing motors. For a symmetrical hexacopter, it defines the diameter of the circumscribed circle passing exactly through the centers of all six motor shafts. It dictates the structural layout, maximum allowable propeller diameter, and overall aerodynamic stability envelope.

### 1. Geometric & Aero-Structural Formulations

#### Propeller Clearance Formula

To prevent catastrophic tip-to-tip aerodynamic interference and structural collision between adjacent blades on a symmetrical hexacopter ($N=6$), the minimum wheelbase ($W$) is strictly bounded by the propeller diameter ($D$) and the required safety clearance ($C_{clear}$):

$$W > \frac{D + C_{clear}}{\sin(30^\circ)} = 2 \cdot (D + C_{clear})$$

Where:

- $D$: Propeller diameter (for your spec, $30 \text{ inch} = 0.762 \text{ m}$).
    
- $C_{clear}$: Minimum tip-to-tip physical isolation clearance ($\ge 0.05 \cdot D$ to avoid severe localized downwash turbulence amplification).
    

#### Structural Moment Arm Length ($d$)

The perpendicular distance from a motor shaft to the Center of Mass ($CoM$) determines the structural torque leverage available for attitudinal control (Roll/Pitch):

$$d = \frac{W}{2}$$

The control torque ($\tau$) applied along the pitch or roll axis by a single rotor producing thrust $T_i$ is expressed as:

$$\tau_i = T_i \cdot d = T_i \cdot \frac{W}{2}$$

- **Larger Wheelbase:** Increases control torque leverage ($\tau$), improving structural stability in turbulent airfields, but increases frame rotational inertia ($J$), which slows down rapid attitudinal response rates.
    
- **Smaller Wheelbase:** Reduces structural mass and rotational inertia ($J$), enabling high agility, but restricts maximum propeller sizing and introduces aerodynamic efficiency losses due to blade downwash overlapping.
    

### 2. Live Parameter Mapping Block (Symmetrical Hexacopter class)

|**Parameter Element**|**Technical Symbol**|**Governing Formula / Relation**|**Calculated Target Value**|
|---|---|---|---|
|**Target Propeller Diameter**|$D$|Hardware Constraint Selection|$30.0 \text{ in } (762 \text{ mm})$|
|**Minimum Tip Clearance**|$C_{clear}$|$5\% \text{ of } D \text{ (Aerodynamic Minimum)}$|$1.5 \text{ in } (38.1 \text{ mm})$|
|**Minimum Wheelbase**|$W_{min}$|$2 \cdot (D + C_{clear})$|$63.0 \text{ in } (1600.2 \text{ mm})$|
|**Moment Arm Length**|$d$|$W / 2$|$800.1 \text{ mm}$|
|**Frame Structural Class**|Type|Symmetrical Co-planar Hexa-X|Heavy-Lift Carbon Fiber|

### 3. Symmetrical Hexacopter Wheelbase Geometry

The structural spatial diagram below defines how the diagonal wheelbase establishes the boundaries for adjacent blade clearances across the arm structure:

```
                       [ FRONT AXIS ]
                    Motor 1         Motor 2
                       ○               ○
                      / \             / \
                     /   \           /   \
          Motor 6   ○     \         /     ○   Motor 3
                    \      \       /      /
                     \      \     /      /
                      \      •---•      /
                       \     |CoM|     /
                        \    •---•    /
                         \     |     /
                          \    |    /
                           \   |   /
                            \  |  /
                             \ | /
                              ○ ○
                           Motor 5   Motor 4
                            │◄───────W───────►│
                        (Opposing Diagonal Diameter)
```

- **Adjacent Motor Angle:** $\phi = \frac{360^\circ}{6} = 60^\circ$
    
- **Chord distance between adjacent motor shafts ($S$):** $S = W \cdot \sin(30^\circ) = \frac{W}{2} = d$
    
- **Verification Constraint:** The blade radius constraint requires that $2 \cdot (\frac{D}{2}) < S \implies D < d$. Therefore, your propeller diameter must always be strictly less than the single arm radius ($d$).
    

### 4. Next Step Verification Protocol

The frame wheelbase boundary is mathematically integrated at $1600\text{ mm}$. Write your next parameter validation or calculation objective on paper to continue the sequence.