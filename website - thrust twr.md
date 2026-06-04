
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- React and ReactDOM CDNs -->
  <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
  <!-- Babel CDN for inline JSX compilation -->
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    /* Custom scrollbar to match Obsidian aesthetic */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0f172a;
    }
    ::-webkit-scrollbar-thumb {
      background: #334155;
      border-radius: 3px;
    }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 font-sans antialiased m-0 p-0">
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect } = React;

    const FLIGHT_PROFILES = {
      RACE: {
        id: "RACE",
        name: "Racing / Freestyle",
        frameSize: "5\" Frame",
        motors: "2300KV Motors",
        motorKV: 2300,
        battery: "6S 1300mAh",
        batteryS: 6,
        batteryCap: 1300,
        fc: "F4/F7 FC",
        firmware: "Betaflight",
        defaultWeight: 650,
        propSize: 5,
        efficiency: 6.0,
        targetTWR: "5.0 - 8.0+",
        color: "#ffcdd2",
        accentColor: "border-red-500/30 bg-red-950/20 text-red-200",
        badgeBg: "bg-red-900/40 text-red-200",
        description: "High-agility, fast response platforms requiring extreme thrust-to-weight ratios for cinematic aerobatics or closed-circuit racing."
      },
      CINE: {
        id: "CINE",
        name: "Cinematic",
        frameSize: "7\" Frame",
        motors: "1500KV Motors",
        motorKV: 1500,
        battery: "6S 3000mAh",
        batteryS: 6,
        batteryCap: 3000,
        fc: "F7/H7 FC",
        firmware: "Betaflight / iNav",
        defaultWeight: 1200,
        propSize: 7,
        efficiency: 7.5,
        targetTWR: "2.5 - 4.0",
        color: "#c8e6c9",
        accentColor: "border-green-500/30 bg-green-950/20 text-green-200",
        badgeBg: "bg-green-900/40 text-green-200",
        description: "Stable, medium-weight structures designed for carrying action or cinema cameras while maintaining smooth flight lines."
      },
      LR: {
        id: "LR",
        name: "Long Range",
        frameSize: "7-10\" Frame",
        motors: "1100KV Motors",
        motorKV: 1100,
        battery: "6S 6000mAh",
        batteryS: 6,
        batteryCap: 6000,
        fc: "F7/H7 FC",
        firmware: "iNav / ArduPilot",
        defaultWeight: 1800,
        propSize: 9,
        efficiency: 8.5,
        targetTWR: "2.0 - 3.0",
        color: "#bbdefb",
        accentColor: "border-blue-500/30 bg-blue-950/20 text-blue-200",
        badgeBg: "bg-blue-900/40 text-blue-200",
        description: "High-efficiency systems designed for long cruise durations, leveraging high-capacity Li-Ion packs and navigation-focused firmware."
      },
      AGI: {
        id: "AGI",
        name: "Agricultural / Heavy Lift",
        frameSize: "Industrial Frame",
        motors: "100KV Motors",
        motorKV: 100,
        battery: "12S 30000mAh",
        batteryS: 12,
        batteryCap: 30000,
        fc: "H7 FC",
        firmware: "ArduPilot / PX4",
        defaultWeight: 15000,
        propSize: 24,
        efficiency: 11.0,
        targetTWR: "1.8 - 2.2",
        color: "#ffe0b2",
        accentColor: "border-orange-500/30 bg-orange-950/20 text-orange-200",
        badgeBg: "bg-orange-900/40 text-orange-200",
        description: "Industrial platforms built for maximum payload capacity, using massive high-torque motors, high-voltage battery links, and redundant flight controllers."
      },
      MICRO: {
        id: "MICRO",
        name: "Indoor / Micro",
        frameSize: "<3\" Frame",
        motors: "11000KV Motors",
        motorKV: 11000,
        battery: "1S 300mAh",
        batteryS: 1,
        batteryCap: 300,
        fc: "F4 AIO FC",
        firmware: "Betaflight",
        defaultWeight: 45,
        propSize: 2,
        efficiency: 4.5,
        targetTWR: "3.5 - 6.0",
        color: "#e1bee7",
        accentColor: "border-purple-500/30 bg-purple-950/20 text-purple-200",
        badgeBg: "bg-purple-900/40 text-purple-200",
        description: "Sub-250g ultra-lightweight drones operating with high motor KVs on low voltages, optimized for indoor maneuvers and safety."
      }
    };

    function App() {
      const [selectedProfile, setSelectedProfile] = useState("RACE");
      const [weight, setWeight] = useState(FLIGHT_PROFILES.RACE.defaultWeight);
      const [batteryS, setBatteryS] = useState(FLIGHT_PROFILES.RACE.batteryS);
      const [batteryCap, setBatteryCap] = useState(FLIGHT_PROFILES.RACE.batteryCap);
      const [motorKV, setMotorKV] = useState(FLIGHT_PROFILES.RACE.motorKV);
      const [motorsCount, setMotorsCount] = useState(4);
      const [estThrustPerMotor, setEstThrustPerMotor] = useState(1200);
      const [copied, setCopied] = useState(false);

      useEffect(() => {
        const profile = FLIGHT_PROFILES[selectedProfile];
        setWeight(profile.defaultWeight);
        setBatteryS(profile.batteryS);
        setBatteryCap(profile.batteryCap);
        setMotorKV(profile.motorKV);
        setMotorsCount(selectedProfile === "AGI" ? 6 : 4);
        const multiplier = selectedProfile === "RACE" ? 6 : selectedProfile === "MICRO" ? 4 : 2.5;
        setEstThrustPerMotor(Math.round((profile.defaultWeight * multiplier) / (selectedProfile === "AGI" ? 6 : 4)));
      }, [selectedProfile]);

      const profile = FLIGHT_PROFILES[selectedProfile];
      const nominalVoltage = batteryS * 3.7;
      const targetRPM = Math.round(motorKV * nominalVoltage);
      const hoverPowerWatts = weight / profile.efficiency;
      const batteryWh = (batteryCap * nominalVoltage) / 1000;
      const usableWh = batteryWh * 0.85;
      const estHoverTimeMinutes = hoverPowerWatts > 0 ? (usableWh / hoverPowerWatts) * 60 : 0;
      const totalMaxThrust = estThrustPerMotor * motorsCount;
      const calculatedTWR = weight > 0 ? (totalMaxThrust / weight).toFixed(2) : "0.00";
      const hoverThrustPerMotor = weight > 0 ? Math.round(weight / motorsCount) : 0;

      const generateMarkdownReport = () => {
        return `### Drone Configuration Specification Sheet
**Generated on**: ${new Date().toLocaleDateString()}
**Design Profile**: ${profile.name}

| Parameter | Selected Value |
| :--- | :--- |
| **Frame Compatibility** | ${profile.frameSize} |
| **Motors Config** | ${motorsCount}x ${motorKV}KV Motors |
| **Battery Class** | ${batteryS}S (${nominalVoltage}V nominal) |
| **Battery Capacity** | ${batteryCap} mAh (${batteryWh.toFixed(1)} Wh) |
| **All-Up Weight (AUW)** | ${weight >= 1000 ? (weight / 1000).toFixed(2) + ' kg' : weight + ' g'} |
| **Flight Controller Architecture** | ${profile.fc} |
| **Firmware Target** | ${profile.firmware} |

### Propulsion & Energetics Analysis
* **Maximum System Thrust**: ${totalMaxThrust} g
* **Thrust-to-Weight Ratio**: ${calculatedTWR}:1 (Target: ${profile.targetTWR})
* **Calculated Maximum Motor Speed (No-Load)**: ${targetRPM.toLocaleString()} RPM
* **Average Hover Power Draw**: ${hoverPowerWatts.toFixed(1)} Watts
* **Estimated Endurance (Hover Limit, 85% DoD)**: ${estHoverTimeMinutes.toFixed(1)} minutes`;
      };

      const handleCopyToClipboard = () => {
        const textToCopy = generateMarkdownReport();
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy", err);
        }
        document.body.removeChild(textarea);
      };

      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans text-xs sm:text-sm">
          <div className="max-w-4xl mx-auto space-y-4">
            
            <header className="border-b border-slate-800 pb-3 flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">⚡ Drone Design Engine</h1>
                <p className="text-[10px] text-slate-500">Obsidian-Integrated Flight Physics Calculator</p>
              </div>
              <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400">Offline Active</span>
            </header>

            {/* Profile Selection */}
            <div className="grid grid-cols-5 gap-2">
              {Object.keys(FLIGHT_PROFILES).map((key) => {
                const active = selectedProfile === key;
                const p = FLIGHT_PROFILES[key];
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedProfile(key)}
                    className={`p-2 rounded border text-center transition-all ${
                      active ? "bg-slate-800 border-blue-500 text-white font-bold" : "bg-slate-900 border-slate-800 hover:bg-slate-800/50"
                    }`}
                  >
                    <div className="text-lg">
                      {key === "RACE" && "🏁"}
                      {key === "CINE" && "🎥"}
                      {key === "LR" && "📡"}
                      {key === "AGI" && "🚜"}
                      {key === "MICRO" && "🏠"}
                    </div>
                    <div className="text-[9px] truncate">{p.name.split(" ")[0]}</div>
                  </button>
                );
              })}
            </div>

            <div className={`p-3 rounded border text-[11px] ${profile.accentColor}`}>
              <strong>{profile.name}:</strong> {profile.description}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Configuration Panel */}
              <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-300">1. Modify Physical Specs</h3>
                
                {/* Weight */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-400">All-Up Weight</span>
                    <span className="text-white font-bold">{weight} g</span>
                  </div>
                  <input
                    type="range"
                    min={selectedProfile === "MICRO" ? 10 : selectedProfile === "AGI" ? 5000 : 100}
                    max={selectedProfile === "MICRO" ? 300 : selectedProfile === "AGI" ? 50000 : 4000}
                    value={weight}
                    onChange={(e) => setWeight(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>

                {/* Battery Config */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Battery Cells</label>
                    <select value={batteryS} onChange={(e) => setBatteryS(parseInt(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-xs">
                      {[1, 2, 3, 4, 6, 8, 12].map(s => <option key={s} value={s}>{s}S ({ (s*3.7).toFixed(1) }V)</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Capacity (mAh)</label>
                    <input type="number" value={batteryCap} onChange={(e) => setBatteryCap(parseInt(e.target.value) || 0)} className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-xs text-center" />
                  </div>
                </div>

                {/* Motors & Count */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Motor KV</label>
                    <input type="number" value={motorKV} onChange={(e) => setMotorKV(parseInt(e.target.value) || 0)} className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-xs text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Motors</label>
                    <select value={motorsCount} onChange={(e) => setMotorsCount(parseInt(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded p-1 text-xs">
                      <option value={3}>3 (Tri)</option>
                      <option value={4}>4 (Quad)</option>
                      <option value={6}>6 (Hexa)</option>
                      <option value={8}>8 (Octo)</option>
                    </select>
                  </div>
                </div>

                {/* Peak Thrust */}
                <div>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-slate-400">Peak Motor Thrust</span>
                    <span className="text-white font-bold">{estThrustPerMotor} g</span>
                  </div>
                  <input
                    type="range"
                    min={selectedProfile === "MICRO" ? 50 : selectedProfile === "AGI" ? 1000 : 300}
                    max={selectedProfile === "MICRO" ? 800 : selectedProfile === "AGI" ? 20000 : 8000}
                    value={estThrustPerMotor}
                    onChange={(e) => setEstThrustPerMotor(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                </div>
              </div>

              {/* Analysis & Output */}
              <div className="space-y-4">
                <div className="bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-3">
                  <h3 className="font-bold text-slate-300">2. Performance Estimations</h3>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-950 p-2 rounded text-center border border-slate-800">
                      <span className="text-[9px] text-slate-500 block">TWR</span>
                      <span className="font-bold text-white text-sm">{calculatedTWR}:1</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded text-center border border-slate-800">
                      <span className="text-[9px] text-slate-500 block">Endurance</span>
                      <span className="font-bold text-emerald-400 text-sm">{estHoverTimeMinutes.toFixed(1)}m</span>
                    </div>
                    <div className="bg-slate-950 p-2 rounded text-center border border-slate-800">
                      <span className="text-[9px] text-slate-500 block">Max RPM</span>
                      <span className="font-bold text-blue-400 text-sm">{targetRPM.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="text-[11px] space-y-1 text-slate-400 pt-2 border-t border-slate-800">
                    <div className="flex justify-between">
                      <span>Battery Storage:</span>
                      <span className="font-mono text-white">{batteryWh.toFixed(1)} Wh</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hover Power Draw:</span>
                      <span className="font-mono text-white">{hoverPowerWatts.toFixed(1)} W</span>
                    </div>
                  </div>
                </div>

                {/* Export Block */}
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 text-xs">Obsidian Note Report</span>
                    <button onClick={handleCopyToClipboard} className={`text-[10px] px-2 py-1 rounded font-bold ${copied ? "bg-emerald-600 text-white" : "bg-blue-600 text-white"}`}>
                      {copied ? "Copied Spec!" : "Copy Spec"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>