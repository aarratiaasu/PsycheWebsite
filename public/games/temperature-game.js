// ==================================
// Rover Type Definitions
// ==================================
const roverTypes = {
    atlas: {
        name: "Atlas",
        description: "Balanced performance. Upgraded reliable standard.",
        baseSpeed: 5,
        coolant: 100,
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 },
        svgColor: '#00FF7F', // SpringGreen
        getSvg: function(color, upgrades, evolutionStage) {
            // Futuristic Atlas: Sleeker body, defined cockpit, more detailed wheels
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="4,10 8,6 32,6 36,10 36,18 32,22 8,22 4,18" fill="${color}" />
                    <polygon points="14,6 16,3 24,3 26,6" fill="${color}" stroke="#333" stroke-width="0.5"/>
                    <rect x="16" y="3.5" width="8" height="2.5" fill="#00BFFF" opacity="0.7"/>
                     <rect x="2" y="11" width="4" height="6" fill="#666" rx="1"/>
                    <rect x="34" y="11" width="4" height="6" fill="#666" rx="1"/>
                    <circle cx="10" cy="22" r="5.5" fill="#555"/>
                    <circle cx="30" cy="22" r="5.5" fill="#555"/>
                    <circle cx="10" cy="22" r="3" fill="#777"/>
                    <circle cx="30" cy="22" r="3" fill="#777"/>
                    <circle cx="10" cy="22" r="1" fill="#999"/>
                    <circle cx="30" cy="22" r="1" fill="#999"/>
                     <line x1="17" y1="7" x2="23" y2="7" stroke="#FFF" stroke-width="1" opacity="0.5"/>
                `;
            svgContent += this.getUpgradeSvg(upgrades); // Apply shared upgrade visuals
            svgContent += this.getEvolutionSvg(evolutionStage, color); // Apply shared evolution visuals
            svgContent += '</svg>';
            return svgContent;
        }
    },
    comet: {
        name: "Comet",
        description: "High speed, lower coolant capacity. Sleek frame.",
        baseSpeed: 6, // Faster
        coolant: 85,  // Lower
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 },
        svgColor: '#00BFFF', // DeepSkyBlue
        getSvg: function(color, upgrades, evolutionStage) {
            // Futuristic Comet: Pointed, aerodynamic, fins, smaller wheels
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="2,15 8,8 32,8 38,15 32,22 8,22" fill="${color}" />
                    <polygon points="12,8 15,5 25,5 28,8" fill="#222" opacity="0.8"/>
                    <rect x="15" y="5.5" width="10" height="2.5" fill="#AFEEEE" opacity="0.6"/>
                    <polygon points="30,8 38,10 38,13" fill="${color}" stroke="#333" stroke-width="0.3"/>
                    <polygon points="30,22 38,20 38,17" fill="${color}" stroke="#333" stroke-width="0.3"/>
                    <ellipse cx="5" cy="15" rx="3" ry="4" fill="#FFD700" opacity="0.7"/>
                     <ellipse cx="5" cy="15" rx="1.5" ry="2.5" fill="#FFF" opacity="0.8"/>
                    <ellipse cx="11" cy="21" rx="4.5" ry="4" fill="#444"/>
                    <ellipse cx="29" cy="21" rx="4.5" ry="4" fill="#444"/>
                    <ellipse cx="11" cy="21" rx="2" ry="1.5" fill="#666"/>
                    <ellipse cx="29" cy="21" rx="2" ry="1.5" fill="#666"/>
                `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    guardian: {
        name: "Guardian",
        description: "Slower, but starts tougher with higher coolant. Armored chassis.",
        baseSpeed: 4, // Slower
        coolant: 120, // Higher
        initialUpgrades: { heatResistance: 1, coldResistance: 0, tempRegulation: 0 }, // Starts tougher
        svgColor: '#778899', // LightSlateGray
        getSvg: function(color, upgrades, evolutionStage) {
            // Futuristic Guardian: Bulky, armored plates, heavy wheels
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="5" width="34" height="18" fill="#46505A" rx="3"/>
                    <rect x="5" y="4" width="30" height="16" fill="${color}" rx="2" stroke="#333" stroke-width="0.5"/>
                    <rect x="12" y="2" width="16" height="8" fill="${color}" rx="1" stroke="#333" stroke-width="0.5"/>
                     <rect x="0" y="8" width="5" height="12" fill="#555" rx="1"/>
                    <rect x="35" y="8" width="5" height="12" fill="#555" rx="1"/>
                    <circle cx="10" cy="23" r="7" fill="#333"/>
                    <circle cx="30" cy="23" r="7" fill="#333"/>
                    <circle cx="10" cy="23" r="4" fill="#555"/>
                    <circle cx="30" cy="23" r="4" fill="#555"/>
                     <rect x="7" y="20" width="6" height="6" fill="#444" transform="rotate(45 10 23)"/>
                     <rect x="27" y="20" width="6" height="6" fill="#444" transform="rotate(45 30 23)"/>
                     <rect x="16" y="7" width="8" height="3" fill="#444"/>
                `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    cryoflux: {
        name: "CryoFlux",
        description: "Excels at temperature regulation. Tech-focused design.",
        baseSpeed: 5,
        coolant: 100,
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 1 }, // Better regulation
        svgColor: '#AFEEEE', // PaleTurquoise
        getSvg: function(color, upgrades, evolutionStage) {
            // Futuristic CryoFlux: Visible cooling elements, antenna, tech patterns
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="5,7 9,4 31,4 35,7 35,19 31,22 9,22 5,19" fill="${color}" />
                     <rect x="10" y="5" width="20" height="2" fill="#87CEFA" opacity="0.8"/>
                     <rect x="10" y="20" width="20" height="2" fill="#87CEFA" opacity="0.8"/>
                     <rect x="7" y="8" width="2" height="10" fill="#ADD8E6"/>
                     <rect x="31" y="8" width="2" height="10" fill="#ADD8E6"/>
                     <line x1="20" y1="4" x2="20" y2="0" stroke="#999" stroke-width="1"/>
                     <circle cx="20" cy="0" r="2" fill="#FFF"/>
                     <circle cx="20" cy="0" r="1" fill="${color}"/>
                     <circle cx="11" cy="22" r="5" fill="#555"/>
                    <circle cx="29" cy="22" r="5" fill="#555"/>
                    <circle cx="11" cy="22" r="2" fill="${color}"/>
                    <circle cx="29" cy="22" r="2" fill="${color}"/>
                     <rect x="2" y="10" width="4" height="6" fill="#444"/>
                     <rect x="34" y="10" width="4" height="6" fill="#444"/>
                 `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    // --- NEW ROVER 1 ---
    phantom: {
        name: "Phantom",
        description: "Extremely fast, minimal coolant. High risk, high reward.",
        baseSpeed: 7, // Highest speed
        coolant: 70,  // Lowest coolant
        initialUpgrades: { heatResistance: 0, coldResistance: 0, tempRegulation: 0 }, // Standard start, relies on speed/low coolant
        svgColor: '#8A2BE2', // BlueViolet
        getSvg: function(color, upgrades, evolutionStage) {
            // Futuristic Phantom: Sleek, angular, minimal, glowing lines
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="3,15 10,10 30,10 37,15 30,20 10,20" fill="${color}" opacity="0.9"/>
                    <line x1="10" y1="10" x2="30" y2="10" stroke="#00FFFF" stroke-width="1.5" opacity="0.9"/>
                    <line x1="10" y1="20" x2="30" y2="20" stroke="#00FFFF" stroke-width="1.5" opacity="0.9"/>
                    <line x1="3" y1="15" x2="8" y2="15" stroke="#FFF" stroke-width="1" opacity="0.7"/>
                    <line x1="32" y1="15" x2="37" y2="15" stroke="#FFF" stroke-width="1" opacity="0.7"/>
                     <ellipse cx="12" cy="23" rx="4" ry="3.5" fill="#333"/>
                     <ellipse cx="28" cy="23" rx="4" ry="3.5" fill="#333"/>
                     <ellipse cx="12" cy="23" rx="1.5" ry="1" fill="#00FFFF" opacity="0.8"/>
                     <ellipse cx="28" cy="23" rx="1.5" ry="1" fill="#00FFFF" opacity="0.8"/>
                     <line x1="12" y1="20" x2="12" y2="23" stroke="#555" stroke-width="1"/>
                     <line x1="28" y1="20" x2="28" y2="23" stroke="#555" stroke-width="1"/>
                     <ellipse cx="20" cy="9.5" rx="4" ry="2" fill="#111" opacity="0.7"/>
                `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },
    // --- NEW ROVER 2 ---
    vulcan: {
        name: "Vulcan",
        description: "Resists heat, vulnerable to cold. Rugged, heat-dissipating design.",
        baseSpeed: 5, // Average speed
        coolant: 100, // Average coolant
        initialUpgrades: { heatResistance: 2, coldResistance: -1, tempRegulation: 0 }, // Strong heat res, weak cold res
        svgColor: '#FF4500', // OrangeRed
        getSvg: function(color, upgrades, evolutionStage) {
            // Futuristic Vulcan: Blocky, heat sinks, reinforced look
            let svgContent = `
                <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="6" width="32" height="16" fill="${color}" rx="2"/>
                    <rect x="2" y="4" width="36" height="4" fill="#5A4D40" rx="1"/>
                     <rect x="2" y="20" width="36" height="4" fill="#5A4D40" rx="1"/>
                    <rect x="10" y="2" width="3" height="6" fill="#E65C00"/>
                    <rect x="15" y="2" width="3" height="6" fill="#E65C00"/>
                    <rect x="22" y="2" width="3" height="6" fill="#E65C00"/>
                    <rect x="27" y="2" width="3" height="6" fill="#E65C00"/>
                     <rect x="12" y="22" width="16" height="3" fill="#444"/>
                     <rect x="6" y="22" width="10" height="6" fill="#333" rx="2"/>
                    <rect x="24" y="22" width="10" height="6" fill="#333" rx="2"/>
                     <line x1="7" y1="23" x2="15" y2="23" stroke="#555" stroke-width="1"/>
                     <line x1="7" y1="25" x2="15" y2="25" stroke="#555" stroke-width="1"/>
                     <line x1="7" y1="27" x2="15" y2="27" stroke="#555" stroke-width="1"/>
                     <line x1="25" y1="23" x2="33" y2="23" stroke="#555" stroke-width="1"/>
                     <line x1="25" y1="25" x2="33" y2="25" stroke="#555" stroke-width="1"/>
                     <line x1="25" y1="27" x2="33" y2="27" stroke="#555" stroke-width="1"/>
                    <rect x="18" y="8" width="4" height="2" fill="#FFFF00" opacity="0.9"/>
                `;
            svgContent += this.getUpgradeSvg(upgrades);
            svgContent += this.getEvolutionSvg(evolutionStage, color);
            svgContent += '</svg>';
            return svgContent;
        }
    },

    // Shared function for upgrades visualization (add this to the roverTypes object)
    // KEEPING THIS THE SAME - it overlays colors/shapes onto the base SVG
    getUpgradeSvg: function(upgrades) {
        let svg = '';
         // Add heat resistance panels (red accents) - Slightly adjusted position/size maybe?
        if (upgrades.heatResistance > 0) {
             svg += `<rect x="6" y="7" width="5" height="14" fill="#FF4500" opacity="${upgrades.heatResistance * 0.25 + 0.1}" rx="1"/>`; // More subtle opacity
             svg += `<rect x="29" y="7" width="5" height="14" fill="#FF4500" opacity="${upgrades.heatResistance * 0.25 + 0.1}" rx="1"/>`;
        }
        // Add cold resistance panels (blue accents)
        if (upgrades.coldResistance > 0) {
            svg += `<rect x="12" y="7" width="5" height="14" fill="#87CEEB" opacity="${upgrades.coldResistance * 0.25 + 0.1}" rx="1"/>`;
            svg += `<rect x="23" y="7" width="5" height="14" fill="#87CEEB" opacity="${upgrades.coldResistance * 0.25 + 0.1}" rx="1"/>`;
        }
        // Add temperature regulation vents (green accents) - maybe smaller/more numerous
        if (upgrades.tempRegulation > 0) {
            for (let i = 0; i < upgrades.tempRegulation; i++) {
                 svg += `<ellipse cx="${18 + i * 5}" cy="5" rx="1.5" ry="0.5" fill="#9ACD32" opacity="0.9"/>`; // Top vents
                 svg += `<ellipse cx="${18 + i * 5}" cy="23" rx="1.5" ry="0.5" fill="#9ACD32" opacity="0.9"/>`; // Bottom vents
            }
        }
        return svg;
    },
     // Shared function for evolution visualization (add this to the roverTypes object)
     // KEEPING THIS THE SAME - it adds generic overlays based on score milestones
    getEvolutionSvg: function(evolutionStage, roverColor) {
        let svg = '';
        if (evolutionStage >= 1) { // Enhanced Sensors (1000m) - Small top antenna/dish
             svg += `<circle cx="20" cy="2" r="2.5" fill="#FFD700" opacity="0.7"/><rect x="19" y="-1" width="2" height="3" fill="#FFD700" opacity="0.7"/>`;
        }
        if (evolutionStage >= 2) { // Improved Cooling (2000m) - Side vents/glow
             svg += `<rect x="6" y="9" width="2" height="10" fill="#00BFFF" opacity="0.6" rx="1"/>`;
             svg += `<rect x="32" y="9" width="2" height="10" fill="#00BFFF" opacity="0.6" rx="1"/>`;
        }
        if (evolutionStage >= 3) { // Thermal Shielding (3000m) - Subtle energy field outline
             svg += `<rect x="2" y="2" width="36" height="26" stroke="rgba(255, 165, 0, 0.4)" stroke-width="1.5" fill="none" rx="4"/>`;
        }
        if (evolutionStage >= 4) { // Quantum Regulator (5000m) - Central glowing core effect
             svg += `<circle cx="20" cy="14" r="4" fill="rgba(0, 255, 255, 0.5)"/><circle cx="20" cy="14" r="2.5" fill="rgba(255, 255, 255, 0.7)"/>`;
        }
        if (evolutionStage >= 5) { // Psyche Alloy (7500m) - Metallic sheen/lines overlay
             svg += `<path d="M4 8 L36 8 M4 18 L36 18" stroke="#C0C0C0" stroke-width="0.8" fill="none" opacity="0.6"/>`;
             svg += `<path d="M10 4 L10 24 M30 4 L30 24" stroke="#C0C0C0" stroke-width="0.8" fill="none" opacity="0.6"/>`;
        }
        if (evolutionStage >= 6) { // Ultimate Form (10000m) - Larger energy field/aura
            svg += `<ellipse cx="20" cy="15" rx="20" ry="16" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="2" stroke-dasharray="3 3"/>`;
            svg += `<ellipse cx="20" cy="15" rx="16" ry="13" fill="none" stroke="rgba(200, 200, 255, 0.2)" stroke-width="1.5"/>`;
        }
        return svg;
    }
};

// Add the shared functions to each rover type prototype for easier access
// Make sure this runs *after* the roverTypes object is fully defined
Object.values(roverTypes).forEach(type => {
    // Check if it's an actual rover object (not the helper functions themselves)
    if (typeof type === 'object' && type !== null && typeof type.getSvg === 'function') {
        type.getUpgradeSvg = roverTypes.getUpgradeSvg;
        type.getEvolutionSvg = roverTypes.getEvolutionSvg;
    }
});

// ==================================
// Rover Game Class
// ==================================
class RoverGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;

        // Rover sprite will be loaded in start()
        this.roverSprite = new Image();
        this.selectedRoverTypeKey = 'atlas'; // Default

        // Temperature system configuration (Using multipliers)
        this.temperatureEffects = {
            frozen: { speedMultiplier: 0.4, color: '#87CEEB' }, // Multipliers relative to base speed
            cold: { speedMultiplier: 0.7, color: '#ADD8E6' },
            normal: { speedMultiplier: 1.0, color: '#adff2f' }, // Base color is just for UI reference now
            hot: { speedMultiplier: 0.8, color: '#FFA07A' },
            overheated: { speedMultiplier: 0.5, color: '#FF4500' }
        };

        this.player = {
            x: 50,
            y: this.canvas.height / 2,
            width: 40, // Keep base dimensions for collision etc.
            height: 30,
            baseSpeed: 5, // Will be set by selected rover
            currentSpeedMultiplier: 1.0, // Current temp effect
            get speed() { // Calculate actual speed dynamically
                // Ensure baseSpeed and multiplier are numbers
                const base = typeof this.baseSpeed === 'number' ? this.baseSpeed : 0;
                const mult = typeof this.currentSpeedMultiplier === 'number' ? this.currentSpeedMultiplier : 1;
                return base * mult;
            },
            velocity: { x: 0, y: 0 },
            shields: 0,
            hasShield: false, // Tracks if shield is currently active
            particles: [],
            wheelRotation: 0,
            state: 'normal',
            temperature: 50, // Temperature from 0 (frozen) to 100 (overheated)
            coolant: 100, // Will be set by selected rover
            upgrades: { // Will be set by selected rover
                heatResistance: 0, // 0-3 levels
                coldResistance: 0, // 0-3 levels
                tempRegulation: 0  // 0-3 levels
            },
            deathAnimation: {
                frame: 0,
                maxFrames: 60,
                pieces: []
            }
        };

        this.craters = [];
        this.obstacles = [];
        this.powerUps = [];
        this.temperatureZones = [];
        this.asteroidImpacts = []; // Array to store asteroid impact warnings
        this.zoneLifetimes = {}; // Track zone lifetimes for appearing/disappearing
        this.nextZoneUpdate = 0; // Timer for zone updates (unused currently, logic is frame-based)
        this.zoneUpdateInterval = 300; // Can be used with frameCount if needed
        this.difficulty = 'easy';
        this.score = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.obstacleRate = 120; // Base rate, adjusted by difficulty in generateTrack
        this.lastAsteroidTime = 0; // Track score when the last asteroid was spawned
        this.asteroidInterval = 500; // Score interval to spawn asteroid after 1000 score
        this.frameCount = 0; // Frame counter for time-based events

        this.setupControls(); // Setup keyboard listeners

        // Get UI elements (These are now hidden by CSS, but constructor still finds them)
        this.ui = {
             score: document.querySelector('#score span'),
             shields: document.querySelector('#power-ups span')
        };

        // Ensure the UI elements exist, provide fallbacks if necessary for testing
        if (!this.ui.score) {
            console.warn("Score UI element '#score span' not found!");
            const scoreDiv = document.getElementById('score') || document.createElement('div');
            if (!document.getElementById('score')) { scoreDiv.id = 'score'; document.body.appendChild(scoreDiv); }
            const span = document.createElement('span'); span.textContent = '0'; scoreDiv.appendChild(span);
            this.ui.score = span;
        }
         if (!this.ui.shields) {
            console.warn("Shields UI element '#power-ups span' not found!");
            const powerUpsDiv = document.getElementById('power-ups') || document.createElement('div');
            if (!document.getElementById('power-ups')) { powerUpsDiv.id = 'power-ups'; document.body.appendChild(powerUpsDiv); }
            const span = document.createElement('span'); span.textContent = '0'; powerUpsDiv.appendChild(span);
            this.ui.shields = span;
        }
    }

    // --- Core Game Flow Methods ---

    start(difficulty, roverTypeKey) { // Accept roverTypeKey
        console.log(`Starting game: Difficulty=${difficulty}, Rover=${roverTypeKey}`);
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.difficulty = difficulty;
        this.selectedRoverTypeKey = roverTypeKey;
        const roverData = roverTypes[this.selectedRoverTypeKey];

        if (!roverData) {
            console.error(`Invalid rover type key: ${roverTypeKey}. Defaulting to Atlas.`);
            this.selectedRoverTypeKey = 'atlas';
            roverData = roverTypes.atlas;
        }

        // --- Reset Game State ---
        this.score = 0;
        this.frameCount = 0;
        this.isGameOver = false;
        this.isPaused = false;
        this.obstacles = [];
        this.powerUps = [];
        this.temperatureZones = [];
        this.asteroidImpacts = [];
        this.zoneLifetimes = {};
        this.lastAsteroidTime = 0;
        this.milestoneEffect = null; // Reset milestone effect


        // --- Initialize Player based on Rover Type ---
        this.player.x = 50;
        this.player.y = this.canvas.height / 2;
        this.player.baseSpeed = roverData.baseSpeed; // Set base speed
        this.player.currentSpeedMultiplier = 1.0;
        this.player.velocity = { x: 0, y: 0 };
        this.player.shields = 0;
        this.player.hasShield = false;
        this.player.particles = [];
        this.player.state = 'normal';
        this.player.temperature = 50;
        this.player.coolant = roverData.coolant; // Set coolant
        // Deep copy initial upgrades to prevent modification of the template
        this.player.upgrades = JSON.parse(JSON.stringify(roverData.initialUpgrades));
        this.player.deathAnimation = { frame: 0, maxFrames: 60, pieces: [] };


        // --- Load Initial Rover Sprite ---
        try {
            const initialSvg = roverData.getSvg(
                this.getTemperatureColor(this.player.temperature), // Get color for temp 50
                this.player.upgrades,
                0 // Initial evolution stage
            );
            this.roverSprite.src = 'data:image/svg+xml,' + encodeURIComponent(initialSvg);
             // Optional: Add onload handler for robustness, though data URIs load quickly
             this.roverSprite.onload = () => { console.log("Initial rover sprite loaded."); };
             this.roverSprite.onerror = () => { console.error("Error loading initial rover sprite."); };
        } catch (error) {
             console.error("Error generating initial SVG:", error);
             // Fallback: Use the original hardcoded SVG if generation fails
             this.roverSprite.src = 'data:image/svg+xml,' + encodeURIComponent(`
                  <svg width="40" height="30" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5" width="30" height="15" fill="grey" rx="2"/><circle cx="10" cy="20" r="5" fill="grey"/><circle cx="30" cy="20" r="5" fill="grey"/></svg>
             `);
        }


        // --- Setup Game Elements ---
        this.generateTrack(); // Sets obstacleRate based on difficulty
        this.generateCraters();
        this.generateTemperatureZones(); // Now called here


        // --- Update UI (drawn on canvas now, but keep this for potential future use/debugging) ---
        if (this.ui.score) this.ui.score.textContent = this.score;
        if (this.ui.shields) this.ui.shields.textContent = this.player.shields;
        const menu = document.querySelector('#game-menu'); // Hide menu
        if (menu) menu.style.display = 'none';


        // --- Start Loop ---
        this.gameLoop();
    }

    gameLoop() {
         // The core loop calls update and render
         if (!this.isGameOver) {
             this.update(); // Handles pause check internally now
             this.render();

             // Only request the next frame if the game isn't over.
             // The update function handles the pause state internally.
             requestAnimationFrame(() => this.gameLoop());

         } else {
             console.log("Game Over - Loop stopped.");
             // Optional: Final render call to show game over state clearly?
             // this.render();
         }
     }

     update() {
         // --- Pause Check ---
         if (this.isPaused) {
             // If paused, do nothing to advance game state.
             // The gameLoop will keep requesting frames, but update returns early.
             // The render() call in gameLoop will still draw the paused state.
             return;
         }
         // --- Game Over Check ---
         if (this.isGameOver) {
             return; // Stop updates if game is over
         }

         // --- Game Logic Updates ---
         this.frameCount++; // Increment frame count for time-based effects/events

         this.updateTemperatureZones();
         this.updateAsteroidImpacts();
         this.updateTemperature(); // Includes updating player.currentSpeedMultiplier

         // Player movement update
         if (this.player.state === 'normal') {
             // Apply velocity based on current calculated speed
             // Note: player.speed is a getter: baseSpeed * currentSpeedMultiplier
             this.player.x += this.player.velocity.x * (this.player.speed / this.player.baseSpeed);
             this.player.y += this.player.velocity.y * (this.player.speed / this.player.baseSpeed);


              // Boundary checks
              // Vertical boundaries
             if (this.player.y < this.player.height/2) {
                 this.player.y = this.player.height/2;
                  this.player.velocity.y = Math.max(0, this.player.velocity.y); // Stop upward velocity
             } else if (this.player.y > this.canvas.height - this.player.height/2) {
                 this.player.y = this.canvas.height - this.player.height/2;
                  this.player.velocity.y = Math.min(0, this.player.velocity.y); // Stop downward velocity
             }
             // Horizontal boundaries
             if (this.player.x < this.player.width/2) {
                 this.player.x = this.player.width/2;
                  this.player.velocity.x = Math.max(0, this.player.velocity.x); // Stop leftward velocity
             } else if (this.player.x > this.canvas.width - this.player.width/2) {
                 this.player.x = this.canvas.width - this.player.width/2;
                  this.player.velocity.x = Math.min(0, this.player.velocity.x); // Stop rightward velocity
             }

              // Check asteroid impact collisions during explosion phase
              for (const impact of this.asteroidImpacts) {
                   if (impact.exploded && impact.explosionTime < impact.explosionDuration) { // Check during explosion
                       const dx = this.player.x - impact.x;
                       const dy = this.player.y - impact.y;
                       const distance = Math.sqrt(dx * dx + dy * dy);
                       // Use explosionRadius which grows over time
                       if (distance < impact.explosionRadius && !this.player.hasShield) {
                           this.setPlayerState('crashed');
                           break; // Exit loop once crashed
                       }
                   }
              }
         }

          // Update wheel rotation based on actual movement distance
          const actualSpeedRatio = this.player.speed / this.player.baseSpeed;
          const xMove = this.player.velocity.x * actualSpeedRatio;
          const yMove = this.player.velocity.y * actualSpeedRatio;
          const distanceMoved = Math.sqrt(xMove**2 + yMove**2);
          if (distanceMoved > 0) {
               this.player.wheelRotation += (distanceMoved / 5) * 0.2; // Adjust divisor for rotation speed
          }


         this.updatePlayerState(); // Checks for game over from crash timer or temp extremes
         this.updateParticles();
         this.checkCollisions(); // Obstacles and PowerUps
         this.updateScore(); // Updates score and potentially sets milestoneEffect

         // --- Entity Generation & Movement ---
         // Use frameCount for consistent generation regardless of score increments
         if (this.frameCount % this.obstacleRate === 0) {
             this.generateObstacle();
         }
         // Adjust powerup frequency - maybe less frequent than obstacles
         if (this.frameCount > 300 && this.frameCount % 450 === 0) { // Start after 5s, then every 7.5s
             this.generatePowerUp();
         }

         // Move obstacles and powerups
         this.obstacles.forEach(obstacle => { obstacle.x -= obstacle.speed; });
         this.powerUps.forEach(powerUp => { powerUp.x -= powerUp.speed; });

         // Remove off-screen entities
         this.obstacles = this.obstacles.filter(obs => obs.x + obs.width > 0);
         this.powerUps = this.powerUps.filter(pow => pow.x + pow.radius > 0);
     }

     render() {
         // Clear canvas
         this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

         // Draw background elements
         this.drawTrack(); // Includes craters

         // Draw dynamic game elements
         this.drawTemperatureZones();
         this.drawObstacles();
         this.drawPowerUps();
         this.drawParticles(); // Draw general particles (engine, effects)
         this.drawAsteroidImpacts(); // Draw warnings and explosions

         // Draw player and UI overlays
         this.drawRover();
         this.drawTemperatureUI(); // Draws gauges, status, warnings, and upgrade indicators

         // Update and Draw Milestone Effect (needs to be drawn over other elements)
         this.updateAndDrawMilestoneEffect(); // Moved this call here from updateScore

         // Note: Score and Shields UI elements are hidden, info drawn on canvas
     }

    stop() {
        console.log("Stopping game.");
        this.isPaused = true; // Effectively pauses updates
        this.isGameOver = true; // Prevents restart via gameLoop, signals game end state
        // No need to cancel animation frame here, the check in gameLoop handles it.
    }

    // --- Temperature System ---

    getTemperatureColor(temperature) {
        // Returns the appropriate color string based on temperature value
        if (temperature <= 20) return this.temperatureEffects.frozen.color;
        if (temperature <= 40) return this.temperatureEffects.cold.color;
        if (temperature <= 60) {
             // Use the selected rover's base color for the normal range
             return roverTypes[this.selectedRoverTypeKey]?.svgColor || this.temperatureEffects.normal.color;
        }
        if (temperature <= 80) return this.temperatureEffects.hot.color;
        return this.temperatureEffects.overheated.color; // Overheated
    }

    updateTemperature() {
        // Calculates temperature changes based on zones, regulation, and coolant
        let tempChange = 0;
        let inZone = false;
        const baseRegulationRate = 0.3; // Base rate of return to 50 per frame

        // --- Check Temperature Zones ---
        this.temperatureZones.forEach(zone => {
            const dx = this.player.x + this.player.width / 2 - zone.x; // Check from rover center
            const dy = this.player.y + this.player.height / 2 - zone.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Consider player size - are they *within* the zone radius?
            if (distance < zone.radius + Math.max(this.player.width, this.player.height) / 2) {
                 // More precise check: bounding box overlap with circle? For simplicity, treat rover as point for now.
                 if (distance < zone.radius) {
                     inZone = true;
                     const resistanceLevel = zone.type === 'hot' ?
                         this.player.upgrades.heatResistance :
                         this.player.upgrades.coldResistance;

                     // Resistance reduces effect by 25% per level (0->1, 1->0.75, 2->0.5, 3->0.25)
                     // Also account for negative resistance (weakness)
                     const resistanceMultiplier = Math.max(0, 1.0 - (resistanceLevel * 0.25)); // Ensure multiplier doesn't go negative, though 1.25x effect for -1 is desired
                     const baseZoneEffect = 0.7; // How much temp changes per frame inside zone (base)

                     tempChange += zone.type === 'hot' ?
                         zone.intensity * baseZoneEffect * resistanceMultiplier :
                         -zone.intensity * baseZoneEffect * resistanceMultiplier;
                 }
            }
        });

        // --- Natural Temperature Regulation (when not in a zone) ---
        if (!inZone) {
            // Regulation upgrade improves rate by 30% per level (0->1, 1->1.3, 2->1.6, 3->1.9)
            // Account for negative regulation start for Phantom? No, kept it 0 for simplicity now.
             const regulationMultiplier = 1.0 + (this.player.upgrades.tempRegulation * 0.30);
            const targetTemp = 50; // Normal operating temperature

            if (this.player.temperature > targetTemp) {
                tempChange = -baseRegulationRate * regulationMultiplier;
                 // Prevent overshooting
                 if (this.player.temperature + tempChange < targetTemp) tempChange = targetTemp - this.player.temperature;
            } else if (this.player.temperature < targetTemp) {
                tempChange = baseRegulationRate * regulationMultiplier;
                 // Prevent overshooting
                 if (this.player.temperature + tempChange > targetTemp) tempChange = targetTemp - this.player.temperature;
            }
        }

        // --- Apply Temperature Change ---
        this.player.temperature = Math.max(0, Math.min(100, this.player.temperature + tempChange));

        // --- Coolant Effect ---
        const coolantThresholdHot = 70; // Activate coolant above this temp
        const coolantThresholdCold = 30; // Activate coolant below this temp (optional heating?)
        const coolantEffectiveness = 0.8; // Base cooling/heating effect per frame when active
        const coolantConsumption = 0.35;      // Rate of coolant usage per frame when active

        if (this.player.coolant > 0) {
            // Coolant efficiency improved by regulation upgrade (25% per level)
             const coolantEfficiency = 1.0 + (this.player.upgrades.tempRegulation * 0.25);

            if (this.player.temperature > coolantThresholdHot) {
                const tempReduction = coolantEffectiveness * coolantEfficiency;
                this.player.coolant = Math.max(0, this.player.coolant - coolantConsumption);
                // Bring temperature towards 50, but don't go below it using coolant
                this.player.temperature = Math.max(50, this.player.temperature - tempReduction);
            }
            // Optional: Coolant heating if temperature is very low and possibly if cold resistance is low
            /*
            else if (this.player.temperature < coolantThresholdCold && this.player.upgrades.coldResistance < 2) { // Maybe only heat if not highly cold resistant?
                 const tempIncrease = coolantEffectiveness * coolantEfficiency * 0.5; // Heating might be less efficient
                 this.player.coolant = Math.max(0, this.player.coolant - coolantConsumption);
                 // Bring temperature towards 50, but don't go above it using coolant
                 this.player.temperature = Math.min(50, this.player.temperature + tempIncrease);
            }
            */
        }

        // --- Update Rover Speed Multiplier based on Temperature ---
        if (this.player.temperature <= 20) {
            this.player.currentSpeedMultiplier = this.temperatureEffects.frozen.speedMultiplier;
        } else if (this.player.temperature <= 40) {
            this.player.currentSpeedMultiplier = this.temperatureEffects.cold.speedMultiplier;
        } else if (this.player.temperature <= 60) {
            this.player.currentSpeedMultiplier = this.temperatureEffects.normal.speedMultiplier;
        } else if (this.player.temperature <= 80) {
            this.player.currentSpeedMultiplier = this.temperatureEffects.hot.speedMultiplier;
        } else { // Temperature > 80
            this.player.currentSpeedMultiplier = this.temperatureEffects.overheated.speedMultiplier;
        }

        // --- Check for Game Over due to Temperature Extremes ---
        if (this.player.temperature <= 0 || this.player.temperature >= 100) {
            if (this.player.state === 'normal') { // Only trigger once
                 console.log(`Game Over: Temperature extreme reached (${this.player.temperature.toFixed(1)}).`);
                 this.setPlayerState('crashed'); // Use crash state for game over sequence
            }
        }
    }

    generateTemperatureZones() {
        // Creates the initial set of hot/cold zones
        this.temperatureZones = [];
        this.zoneLifetimes = {}; // Clear old lifetime data
        const zoneCount = Math.floor(Math.random() * 2) + 2; // 2-3 initial zones

        for (let i = 0; i < zoneCount; i++) {
            const zoneId = `zone_${Date.now()}_${i}`; // Unique ID
            const maxRadius = Math.random() * 120 + 60; // 60-180 radius
            const zone = {
                id: zoneId,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 5, // Start small
                maxRadius: maxRadius,
                type: Math.random() > 0.5 ? 'hot' : 'cold',
                intensity: Math.random() * 0.4 + 0.6, // 0.6 - 1.0 intensity
                opacity: 0, // Start invisible, fade in
                state: 'growing' // States: 'growing', 'stable', 'shrinking', 'fading_out'
            };
            this.temperatureZones.push(zone);

            // Set a random lifetime for this zone
            this.zoneLifetimes[zoneId] = {
                duration: Math.floor(Math.random() * 600) + 400, // 400-1000 frames lifetime (approx 6-16s)
                elapsed: 0,
                stableTime: Math.floor(Math.random() * 100) + 50 // How long it stays stable (50-150 frames)
            };
        }
        console.log(`Generated ${zoneCount} initial temperature zones.`);
    }

    updateTemperatureZones() {
        // Handles the lifecycle (grow, stable, shrink, fade) of temperature zones
        const growSpeed = 0.7; // Radius increase per frame during growth
        const shrinkSpeed = 1.0; // Radius decrease per frame during shrinking
        const fadeSpeed = 0.02; // Opacity change per frame

        // --- Update Existing Zones ---
        for (let i = this.temperatureZones.length - 1; i >= 0; i--) {
            const zone = this.temperatureZones[i];
            const lifetime = this.zoneLifetimes[zone.id];

            if (!lifetime) { // Should not happen, but safety check
                this.temperatureZones.splice(i, 1);
                continue;
            }

            lifetime.elapsed++;

            // --- State Transitions ---
            if (zone.state === 'growing') {
                zone.opacity = Math.min(1, zone.opacity + fadeSpeed); // Fade in
                zone.radius = Math.min(zone.maxRadius, zone.radius + growSpeed);
                if (zone.radius >= zone.maxRadius && zone.opacity >= 1) {
                    zone.state = 'stable';
                    lifetime.stableStart = lifetime.elapsed; // Mark when stability began
                }
            } else if (zone.state === 'stable') {
                // Stay stable for a defined duration
                if (lifetime.elapsed >= lifetime.stableStart + lifetime.stableTime) {
                    zone.state = 'shrinking';
                }
            } else if (zone.state === 'shrinking') {
                zone.radius = Math.max(0, zone.radius - shrinkSpeed);
                if (zone.radius <= 0) {
                     zone.state = 'fading_out'; // Start fading out visuals even if radius is 0
                }
            }

            // Check overall lifetime for forced shrinking/fading
             if (lifetime.elapsed >= lifetime.duration && zone.state !== 'fading_out' && zone.state !== 'shrinking') {
                 zone.state = 'shrinking'; // Start shrinking if duration is up
             }


              if (zone.state === 'fading_out') {
                  zone.opacity = Math.max(0, zone.opacity - fadeSpeed * 2); // Fade out faster
                  if (zone.opacity <= 0) {
                      // Remove zone completely
                      this.temperatureZones.splice(i, 1);
                      delete this.zoneLifetimes[zone.id];
                      // console.log(`Removed zone ${zone.id}`);
                      continue; // Skip to next zone
                  }
              }
        } // End loop updating existing zones


        // --- Randomly Add New Zones ---
        const maxZones = 5; // Maximum number of zones allowed on screen
        // Add zone more frequently if fewer zones exist
        const addChance = 0.005 + (maxZones - this.temperatureZones.length) * 0.003;
        if (this.temperatureZones.length < maxZones && Math.random() < addChance) {
            const zoneId = `zone_${Date.now()}_new`;
            const maxRadius = Math.random() * 120 + 60; // 60-180
            const zone = {
                id: zoneId,
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: 5,
                maxRadius: maxRadius,
                type: Math.random() > 0.5 ? 'hot' : 'cold',
                intensity: Math.random() * 0.4 + 0.6, // 0.6 - 1.0
                opacity: 0, // Start invisible
                state: 'growing'
            };
            this.temperatureZones.push(zone);

            this.zoneLifetimes[zoneId] = {
                duration: Math.floor(Math.random() * 600) + 400, // ~6-16 seconds
                elapsed: 0,
                stableTime: Math.floor(Math.random() * 100) + 50 // ~1-2.5 seconds stable
            };
             // console.log(`Added new zone ${zoneId}`);
        }
    }

    drawTemperatureZones() {
        // Renders the visual representation of temperature zones
        this.temperatureZones.forEach(zone => {
            if (zone.opacity <= 0 || zone.radius <= 0) return; // Don't draw if invisible or zero size

            const gradient = this.ctx.createRadialGradient(
                zone.x, zone.y, 0,
                zone.x, zone.y, zone.radius
            );

            const baseOpacity = 0.3; // Max visual opacity
            const currentOpacity = baseOpacity * zone.opacity; // Apply fade effect

            if (zone.type === 'hot') {
                gradient.addColorStop(0, `rgba(255, 69, 0, ${currentOpacity})`);     // Orange/Red center
                gradient.addColorStop(0.7, `rgba(255, 100, 0, ${currentOpacity * 0.5})`); // Fainter middle
                gradient.addColorStop(1, `rgba(255, 150, 0, 0)`);                      // Transparent edge
            } else { // Cold zone
                gradient.addColorStop(0, `rgba(0, 191, 255, ${currentOpacity})`);   // Deep sky blue center
                gradient.addColorStop(0.7, `rgba(135, 206, 235, ${currentOpacity * 0.5})`); // Lighter blue middle
                gradient.addColorStop(1, `rgba(173, 216, 230, 0)`);                      // Transparent edge (light blue fade)
            }

            this.ctx.beginPath();
            this.ctx.arc(zone.x, zone.y, zone.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();

            // Optional: Add a subtle pulsing outline effect for active zones
             if (zone.state === 'stable' || zone.state === 'growing') {
                 const pulseOpacity = (Math.sin(this.frameCount * 0.05) + 1) / 4 * zone.opacity; // Slower pulse
                 this.ctx.strokeStyle = zone.type === 'hot' ? `rgba(255, 0, 0, ${pulseOpacity})` : `rgba(0, 150, 255, ${pulseOpacity})`;
                 this.ctx.lineWidth = 1;
                 this.ctx.stroke();
             }
        });
    }


    // --- Asteroid System ---

    createAsteroidImpact() {
        // Creates data for a new asteroid impact event
        if (this.score < 1000 || this.asteroidImpacts.length > 3) return; // Limit number of active impacts

        const impact = {
            id: `impact_${Date.now()}`,
            x: Math.random() * (this.canvas.width - 200) + 100, // Avoid edges more
            y: Math.random() * (this.canvas.height - 200) + 100,
            radius: 50, // Warning radius / initial explosion radius
            warningTime: 180, // 3 seconds at 60fps
            timeLeft: 180,
            exploded: false,
            explosionRadius: 0,
            maxExplosionRadius: 70, // Larger explosion
            explosionDuration: 40, // Longer explosion effect
            explosionTime: 0
        };

        this.asteroidImpacts.push(impact);
         // console.log(`Asteroid impact warning: ${impact.id}`);
    }

    updateAsteroidImpacts() {
        // Manages the lifecycle of asteroid warnings and explosions

        // --- Create New Asteroid Impacts ---
        const asteroidStartScore = 800; // Start asteroids a bit earlier?
        const scoreSinceLast = this.score - this.lastAsteroidTime;
        // Increase frequency slightly based on score
        const currentInterval = Math.max(200, this.asteroidInterval - Math.floor(this.score / 100));

        if (this.score >= asteroidStartScore && scoreSinceLast >= currentInterval) {
            this.createAsteroidImpact();
            this.lastAsteroidTime = this.score; // Use score to track last spawn time
        }

        // --- Update Existing Impacts ---
        for (let i = this.asteroidImpacts.length - 1; i >= 0; i--) {
            const impact = this.asteroidImpacts[i];

            if (!impact.exploded) {
                // --- Warning Phase ---
                impact.timeLeft--;

                // --- Trigger Explosion ---
                if (impact.timeLeft <= 0) {
                    impact.exploded = true;
                    impact.explosionTime = 0; // Reset timer for explosion phase
                    console.log(`Asteroid Impact: ${impact.id} exploded at ${impact.x.toFixed(0)}, ${impact.y.toFixed(0)}`);

                    // Check immediate collision at point of impact (handled again in update loop during explosion growth)
                    const dx = this.player.x - impact.x;
                    const dy = this.player.y - impact.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Initial check - player might be right on top
                    if (distance < impact.radius * 0.5 && !this.player.hasShield && this.player.state === 'normal') { // Smaller instant kill radius
                         this.setPlayerState('crashed');
                    }


                    // --- Create Visual/Audio Effects ---
                    // Explosion particles
                    for (let j = 0; j < 40; j++) { // More particles
                        const angle = Math.random() * Math.PI * 2;
                        const speed = Math.random() * 5 + 2;
                        this.addParticle(
                            impact.x, impact.y, // Start at center
                            '255, 165, 0', // Orange
                             { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.8 } // Add specific velocity/life
                        );
                         this.addParticle(
                            impact.x, impact.y,
                            '255, 69, 0', // Darker Orange
                             { vx: Math.cos(angle) * speed * 0.7, vy: Math.sin(angle) * speed * 0.7, life: 1.0 }
                        );
                    }

                    // Add a new crater at the impact site
                    this.craters.push({
                        x: impact.x,
                        y: impact.y,
                        radius: impact.radius * (0.6 + Math.random() * 0.3), // Randomize crater size slightly
                        depth: 0.6 + Math.random() * 0.4 // Randomize depth
                    });

                    // TODO: Add screen shake effect?
                    // TODO: Add sound effect?

                } // End explosion trigger

            } else { // If exploded == true
                // --- Explosion Phase ---
                impact.explosionTime++;

                // Grow explosion radius using an easing function (e.g., easeOutQuad)
                const t = impact.explosionTime / impact.explosionDuration;
                impact.explosionRadius = impact.maxExplosionRadius * t * (2 - t); // EaseOutQuad

                // Check for collision during explosion growth (handled in main update loop now)

                // --- Remove Impact After Explosion ---
                if (impact.explosionTime >= impact.explosionDuration) {
                    this.asteroidImpacts.splice(i, 1);
                    // console.log(`Removed impact effect: ${impact.id}`);
                }
            } // End if/else exploded
        } // End loop through impacts
    }

    drawAsteroidImpacts() {
        // Renders the visuals for asteroid warnings and explosions
        this.asteroidImpacts.forEach(impact => {
            if (!impact.exploded) {
                // --- Draw Warning Target ---
                const pulseFactor = (Math.sin(this.frameCount * 0.15) + 1) / 2; // Faster pulse
                const warningOpacity = 0.4 + pulseFactor * 0.6; // Opacity pulses between 0.4 and 1.0

                // Outer pulsing circle
                this.ctx.beginPath();
                this.ctx.arc(impact.x, impact.y, impact.radius, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 0, 0, ${warningOpacity})`;
                this.ctx.lineWidth = 3; // Thicker line
                this.ctx.stroke();

                // Inner static circle
                this.ctx.beginPath();
                this.ctx.arc(impact.x, impact.y, impact.radius * 0.6, 0, Math.PI * 2);
                this.ctx.strokeStyle = `rgba(255, 100, 0, 0.5)`; // Faint orange inner
                this.ctx.lineWidth = 1;
                this.ctx.stroke();

                // Flashing Crosshairs
                this.ctx.beginPath();
                this.ctx.moveTo(impact.x - impact.radius * 1.1, impact.y);
                this.ctx.lineTo(impact.x + impact.radius * 1.1, impact.y);
                this.ctx.moveTo(impact.x, impact.y - impact.radius * 1.1);
                this.ctx.lineTo(impact.x, impact.y + impact.radius * 1.1);
                this.ctx.strokeStyle = `rgba(255, 0, 0, ${warningOpacity * 0.7})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();

                // Countdown Text
                const secondsLeft = Math.ceil(impact.timeLeft / 60);
                this.ctx.font = `bold ${18 + pulseFactor * 6}px Arial`; // Text size pulses
                this.ctx.textAlign = 'center';
                this.ctx.fillStyle = `rgba(255, 200, 200, ${warningOpacity})`; // Light red/pink text
                this.ctx.fillText(`${secondsLeft}`, impact.x, impact.y + 6); // Center text
                this.ctx.textAlign = 'left'; // Reset alignment

            } else { // If exploded == true
                // --- Draw Explosion ---
                if (impact.explosionTime < impact.explosionDuration) {
                    const explosionProgress = impact.explosionTime / impact.explosionDuration;
                    const currentRadius = impact.explosionRadius; // Already calculated with easing

                    // Create radial gradient based on progress
                    const gradient = this.ctx.createRadialGradient(
                        impact.x, impact.y, 0,
                        impact.x, impact.y, currentRadius
                    );

                    const fadeOutFactor = 1.0 - explosionProgress; // Fade intensity as it expands

                    // More intense colors, fading out
                    gradient.addColorStop(0, `rgba(255, 255, 200, ${0.9 * fadeOutFactor})`); // Bright yellow center
                    gradient.addColorStop(0.3 * (1 - explosionProgress), `rgba(255, 180, 0, ${0.8 * fadeOutFactor})`); // Orange ring, shrinks inward
                    gradient.addColorStop(0.8 * (1 - explosionProgress), `rgba(255, 80, 0, ${0.6 * fadeOutFactor})`); // Redder ring, shrinks inward
                    gradient.addColorStop(1, `rgba(200, 0, 0, 0)`); // Transparent edge

                    this.ctx.beginPath();
                    this.ctx.arc(impact.x, impact.y, currentRadius, 0, Math.PI * 2);
                    this.ctx.fillStyle = gradient;
                    this.ctx.fill();

                    // Optional shockwave ring
                    if (explosionProgress < 0.7) {
                         this.ctx.beginPath();
                         this.ctx.arc(impact.x, impact.y, currentRadius * 1.1, 0, Math.PI * 2);
                         this.ctx.strokeStyle = `rgba(255, 200, 150, ${0.5 * (1 - explosionProgress / 0.7)})`;
                         this.ctx.lineWidth = 2;
                         this.ctx.stroke();
                    }
                }
            }
        });
    }

    // --- UI Drawing ---

    drawTemperatureUI() {
         // Draws gauges, status text, warnings, and upgrade indicators

         // --- Mission Status Display (Top Right) ---
         const statusX = this.canvas.width - 210; // Move slightly left
         const statusY = 25; // Move slightly down
         const statusWidth = 200;
         const statusHeight = 110; // Increased height

         this.ctx.fillStyle = 'rgba(10, 10, 20, 0.6)'; // Darker, slightly blue background
         this.ctx.strokeStyle = 'rgba(100, 100, 120, 0.8)'; // Subtle border
         this.ctx.lineWidth = 1;
         this.ctx.beginPath();
         this.ctx.roundRect(statusX - 10, statusY - 18, statusWidth, statusHeight, [5]); // Use roundRect
         this.ctx.fill();
         this.ctx.stroke();


         // Title (Rover Name)
         this.ctx.font = 'bold 14px Arial';
         this.ctx.fillStyle = '#E0E0FF'; // Light lavender color
         this.ctx.textAlign = 'left';
         const roverName = roverTypes[this.selectedRoverTypeKey]?.name || 'ROVER';
         this.ctx.fillText(`${roverName.toUpperCase()} STATUS`, statusX, statusY);

         // Divider line
         this.ctx.strokeStyle = 'rgba(100, 100, 120, 0.5)';
         this.ctx.beginPath();
         this.ctx.moveTo(statusX, statusY + 8);
         this.ctx.lineTo(statusX + statusWidth - 20, statusY + 8);
         this.ctx.stroke();

         // Mission Progress
         const milestones = [1000, 2000, 3000, 5000, 7500, 10000]; // Updated milestones
         const nextMilestone = milestones.find(m => m > this.score) || 'MAX';
         const prevMilestone = milestones.slice().reverse().find(m => m <= this.score) || 0;
         let milestoneTotal = 0;
         if (typeof nextMilestone === 'number') {
             milestoneTotal = nextMilestone - prevMilestone;
         } else { // If MAX is reached
             milestoneTotal = 1; // Avoid division by zero, show 100%
         }
         const scoreInMilestone = this.score - prevMilestone;
         const milestoneProgress = milestoneTotal > 0 ? Math.min(100, (scoreInMilestone / milestoneTotal * 100)) : (nextMilestone === 'MAX' ? 100 : 0);
         const progress = milestoneProgress.toFixed(0);

         this.ctx.font = '11px Arial'; // Slightly smaller font
         this.ctx.fillStyle = '#C0C0FF'; // Lighter lavender

         this.ctx.fillText(`DISTANCE:`, statusX, statusY + 25);
         this.ctx.fillStyle = '#FFFFFF';
         this.ctx.fillText(`${this.score}m`, statusX + 65, statusY + 25);

         this.ctx.fillStyle = '#C0C0FF';
         this.ctx.fillText(`NEXT MARK:`, statusX, statusY + 40);
         this.ctx.fillStyle = '#FFFFFF';
          this.ctx.fillText(`${nextMilestone}${nextMilestone === 'MAX' ? '' : 'm'} (${progress}%)`, statusX + 65, statusY + 40);


         // Mission Objectives / Status Indicators
         const tempOkThresholdLow = 15;
         const tempOkThresholdHigh = 85;
         const coolantOkThreshold = 20;
         const tempOk = this.player.temperature > tempOkThresholdLow && this.player.temperature < tempOkThresholdHigh;
         const coolantOk = this.player.coolant > coolantOkThreshold;

         this.ctx.font = 'bold 11px Arial';
         const statusY2 = statusY + 60;
         const statusX2 = statusX + 95; // Second column X

         // TEMP
         this.ctx.fillStyle = tempOk ? '#90EE90' : (this.player.temperature < tempOkThresholdLow ? '#ADD8E6' : '#FFA07A'); // Light Green / Light Blue / Light Salmon
         this.ctx.fillText(`TEMP: ${tempOk ? 'OK' : 'WARN'}`, statusX, statusY2);

         // COOLANT
         this.ctx.fillStyle = coolantOk ? '#90EE90' : '#FFA07A';
         this.ctx.fillText(`COOLANT: ${coolantOk ? 'OK' : 'LOW'}`, statusX2, statusY2);

         // UPGRADES - Show counts directly
         this.ctx.font = '11px Arial';
         // Heat Res - color depends on initial weakness or not
         this.ctx.fillStyle = this.player.upgrades.heatResistance < 0 ? '#FFA07A' : (this.player.upgrades.heatResistance > 0 ? '#FFD700' : '#AAA');
         this.ctx.fillText(`HEAT RES: ${this.player.upgrades.heatResistance}/3`, statusX, statusY2 + 15);
         // Cold Res - color depends on initial weakness or not
         this.ctx.fillStyle = this.player.upgrades.coldResistance < 0 ? '#FFA07A' : (this.player.upgrades.coldResistance > 0 ? '#ADD8E6' : '#AAA');
         this.ctx.fillText(`COLD RES: ${this.player.upgrades.coldResistance}/3`, statusX, statusY2 + 30);
         // Regulation
         this.ctx.fillStyle = this.player.upgrades.tempRegulation < 0 ? '#FFA07A' : (this.player.upgrades.tempRegulation > 0 ? '#98FB98' : '#AAA');
         this.ctx.fillText(`REGULATION: ${this.player.upgrades.tempRegulation}/3`, statusX, statusY2 + 45);


         // --- Temperature/Coolant Gauges (Top Left) ---
         const gaugeWidth = 110; // Slightly wider
         const gaugeHeight = 12; // Thinner
         const x = 15;
         const y = 25; // Position from top-left

         // Backgrounds with rounded corners
         this.ctx.fillStyle = 'rgba(10, 10, 20, 0.6)';
         this.ctx.strokeStyle = 'rgba(100, 100, 120, 0.8)';
         this.ctx.lineWidth = 1;
         this.ctx.beginPath();
         this.ctx.roundRect(x - 2, y - 2, gaugeWidth + 4, gaugeHeight + 4, [3]); // Temp bg
         this.ctx.fill();
         this.ctx.stroke();

         const coolantY = y + gaugeHeight + 8; // Space between gauges
         this.ctx.beginPath();
         this.ctx.roundRect(x - 2, coolantY - 2, gaugeWidth + 4, gaugeHeight + 4, [3]); // Coolant bg
         this.ctx.fill();
         this.ctx.stroke();


         // Temperature level bar
         const tempColor = this.getTemperatureColor(this.player.temperature);
         this.ctx.fillStyle = tempColor;
         this.ctx.beginPath();
         this.ctx.roundRect(x, y, gaugeWidth * (this.player.temperature / 100), gaugeHeight, [2]);
         this.ctx.fill();

         // Coolant level bar
         const maxCoolant = roverTypes[this.selectedRoverTypeKey]?.coolant || 100; // Use selected rover's max
         const coolantPercent = maxCoolant > 0 ? this.player.coolant / maxCoolant : 0;
         this.ctx.fillStyle = '#4682B4'; // Steel Blue for coolant
         this.ctx.beginPath();
         this.ctx.roundRect(x, coolantY, gaugeWidth * coolantPercent, gaugeHeight, [2]);
         this.ctx.fill();

         // Gauge Labels (Inside the background boxes for better alignment)
         this.ctx.fillStyle = '#E0E0FF';
         this.ctx.font = 'bold 10px Arial';
         this.ctx.textAlign = 'center'; // Center labels
         this.ctx.fillText('TEMP', x + gaugeWidth / 2, y + gaugeHeight - 1);
         this.ctx.fillText('COOLANT', x + gaugeWidth / 2, coolantY + gaugeHeight - 1);


         // --- Upgrade Indicators (Top Middle) ---
         const upgradeCenterX = this.canvas.width / 2;
         const upgradeY = 20; // Position near the top
         const indicatorGroupSpacing = 45; // Space between HEAT/COLD/REG groups
         const indicatorRadius = 4.5; // Slightly smaller circles
         const indicatorSpacing = 3; // Space between circles in a group
         const maxLevel = 3;
         const labelYOffset = 16; // Y offset for the H/C/R labels

         // Background for the upgrade indicators area
         const upgradeAreaWidth = indicatorGroupSpacing * 2 + maxLevel * (indicatorRadius * 2 + indicatorSpacing) * 1.5; // Estimate width
         this.ctx.fillStyle = 'rgba(10, 10, 20, 0.6)';
         this.ctx.strokeStyle = 'rgba(100, 100, 120, 0.8)';
         this.ctx.beginPath();
         this.ctx.roundRect(upgradeCenterX - upgradeAreaWidth / 2, upgradeY - indicatorRadius - 5, upgradeAreaWidth, indicatorRadius * 2 + labelYOffset + 5, [5]);
         this.ctx.fill();
         this.ctx.stroke();


         // Heat Resistance Indicator (Left Group)
         this.drawUpgradeIndicator(
             upgradeCenterX - indicatorGroupSpacing, upgradeY, // Centered position for the group
             this.player.upgrades.heatResistance, maxLevel,
             '#FF6347', // Tomato Red (Active)
             '#5a2d23', // Dark Red (Inactive)
             indicatorRadius, indicatorSpacing
         );
         this.ctx.fillStyle = '#FFA07A'; // Light Salmon label
         this.ctx.font = 'bold 10px Arial';
         this.ctx.textAlign = 'center';
         this.ctx.fillText('HEAT', upgradeCenterX - indicatorGroupSpacing, upgradeY + labelYOffset);

         // Cold Resistance Indicator (Middle Group)
         this.drawUpgradeIndicator(
             upgradeCenterX, upgradeY, // Centered position
             this.player.upgrades.coldResistance, maxLevel,
             '#87CEFA', // Light Sky Blue (Active)
             '#2f4d5a', // Dark Blue (Inactive)
             indicatorRadius, indicatorSpacing
         );
         this.ctx.fillStyle = '#ADD8E6'; // Light Blue label
         this.ctx.fillText('COLD', upgradeCenterX, upgradeY + labelYOffset);

         // Temp Regulation Indicator (Right Group)
         this.drawUpgradeIndicator(
             upgradeCenterX + indicatorGroupSpacing, upgradeY, // Centered position
             this.player.upgrades.tempRegulation, maxLevel,
             '#98FB98', // Pale Green (Active)
             '#3a5a3a', // Dark Green (Inactive)
             indicatorRadius, indicatorSpacing
         );
          this.ctx.fillStyle = '#90EE90'; // Light Green label
         this.ctx.fillText('REG', upgradeCenterX + indicatorGroupSpacing, upgradeY + labelYOffset);

         this.ctx.textAlign = 'left'; // Reset alignment

         // --- Critical Temperature Warning Flash (Bottom Bar) ---
         const warningThresholdLow = 10;
         const warningThresholdHigh = 90; // Trigger warnings earlier
         if (this.player.temperature <= warningThresholdLow || this.player.temperature >= warningThresholdHigh) {
             const warningOpacity = (Math.sin(this.frameCount * 0.1) + 1) / 3; // Slower, slightly less intense flash (0 to 0.66)
             this.ctx.fillStyle = `rgba(255, 0, 0, ${warningOpacity})`; // Red flash color
             // Draw a bar at the bottom of the screen
             this.ctx.fillRect(0, this.canvas.height - 30, this.canvas.width, 30);

             // Warning Text Overlay
             this.ctx.font = 'bold 16px Arial';
             this.ctx.textAlign = 'center';
             // Pulsing white text color
             this.ctx.fillStyle = `rgba(255, 255, 255, ${(Math.sin(this.frameCount * 0.1) + 1) / 2 * 0.5 + 0.5})`; // Opacity 0.5 to 1.0
             const warningText = this.player.temperature <= warningThresholdLow ? '!!! CRITICAL COLD !!!' : '!!! CRITICAL HEAT !!!';
             this.ctx.fillText(warningText, this.canvas.width / 2, this.canvas.height - 10);
             this.ctx.textAlign = 'left'; // Reset alignment
         }
     }

    // New function for drawing upgrade indicators (circles) - centers the group
    // Accounts for negative upgrade levels by drawing them differently
     drawUpgradeIndicator(centerX, y, level, maxLevel, activeColor, inactiveColor = '#444', radius = 4, spacing = 3) {
         const totalWidth = maxLevel * (radius * 2) + (maxLevel - 1) * spacing;
         const startX = centerX - totalWidth / 2; // Calculate start X to center the group

         for (let i = 0; i < maxLevel; i++) {
             const indicatorX = startX + i * (radius * 2 + spacing) + radius; // Position of the center of the circle
             const isFilled = i < level; // Standard fill condition
             const isNegative = level < 0 && i < Math.abs(level); // Condition for negative levels

             this.ctx.beginPath();
             this.ctx.arc(indicatorX, y, radius, 0, Math.PI * 2);

             // Fill (handle negative differently)
             if (isNegative) {
                 this.ctx.fillStyle = '#8B0000'; // Dark Red for negative/weakness
             } else {
                 this.ctx.fillStyle = isFilled ? activeColor : inactiveColor;
             }
             this.ctx.fill();

             // Outline
             this.ctx.strokeStyle = isFilled ? '#FFF' : (isNegative ? '#FF6347' : '#666'); // White outline for active, Reddish for negative, gray for inactive
             this.ctx.lineWidth = 1;
             this.ctx.stroke();

             // Add 'X' for negative levels
             if (isNegative) {
                 this.ctx.strokeStyle = '#FFC0CB'; // Pink 'X'
                 this.ctx.lineWidth = 1;
                 this.ctx.beginPath();
                 this.ctx.moveTo(indicatorX - radius * 0.6, y - radius * 0.6);
                 this.ctx.lineTo(indicatorX + radius * 0.6, y + radius * 0.6);
                 this.ctx.moveTo(indicatorX + radius * 0.6, y - radius * 0.6);
                 this.ctx.lineTo(indicatorX - radius * 0.6, y + radius * 0.6);
                 this.ctx.stroke();
             }
         }
     }

    // --- Player and Entity Drawing ---

    drawRover() {
        // Renders the player rover based on current state, temperature, upgrades, and evolution
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(this.player.x, this.player.y); // Move origin to player center

        if (this.player.state === 'crashed') {
            // --- Draw Crashed State ---
            this.drawCrashedRover(); // Uses deathAnimation pieces
            // Add continuous effects only while animation runs?
             if (this.player.deathAnimation.frame < this.player.deathAnimation.maxFrames) {
                 this.addCrashEffects(); // Spawn smoke/debris
                 this.player.deathAnimation.frame++;
             }

        } else { // If player state is 'normal'
            // --- Draw Active Rover ---

            // Determine evolution stage based on score
            let evolutionStage = 0;
             if (this.score >= 10000) evolutionStage = 6;
             else if (this.score >= 7500) evolutionStage = 5;
             else if (this.score >= 5000) evolutionStage = 4;
             else if (this.score >= 3000) evolutionStage = 3;
             else if (this.score >= 2000) evolutionStage = 2;
             else if (this.score >= 1000) evolutionStage = 1;

            // Get the current temperature color
            const currentTempColor = this.getTemperatureColor(this.player.temperature);

            // Get the correct SVG generator function for the selected rover
            const roverData = roverTypes[this.selectedRoverTypeKey];
            if (!roverData || typeof roverData.getSvg !== 'function') {
                 console.error(`Cannot find SVG generator for rover: ${this.selectedRoverTypeKey}`);
                 ctx.restore();
                 return; // Don't draw if data is missing
            }
            const svgGenerator = roverData.getSvg;

            // Generate the complete, up-to-date SVG string
            // Use .call to ensure 'this' inside getSvg refers to roverData object
            const currentSvgString = svgGenerator.call(roverData,
                currentTempColor,
                this.player.upgrades,
                evolutionStage
            );

            // Update the rover sprite source with the new SVG data URI
            const newSrc = 'data:image/svg+xml,' + encodeURIComponent(currentSvgString);
            // Only update src if it actually changed (minor optimization)
             if (this.roverSprite.src !== newSrc) {
                 this.roverSprite.src = newSrc;
             }


              // --- Draw Shield Effect (if active) ---
             if (this.player.hasShield) {
                 this.drawShieldEffect(); // Draws the visual shield around the rover
             }

            // --- Draw the Rover Sprite ---
            // Ensure the sprite is loaded and ready before drawing
            if (this.roverSprite.complete && this.roverSprite.naturalWidth > 0) {
                 // Draw the image centered at the translated origin (0,0)
                ctx.drawImage(this.roverSprite, -this.player.width / 2, -this.player.height / 2);
            } else {
                // Optional: Draw a placeholder rectangle if the sprite isn't ready
                // ctx.fillStyle = 'grey';
                // ctx.fillRect(-this.player.width / 2, -this.player.height / 2, this.player.width, this.player.height);
                 console.warn("Rover sprite not ready for drawing");
                 // Request redraw on next frame if image wasn't ready
                 // (this happens naturally with requestAnimationFrame)
            }


            // --- Add Engine Particles (if moving) ---
            if (this.player.velocity.x !== 0 || this.player.velocity.y !== 0) {
                this.addEngineParticles(); // Spawns particles based on velocity
            }
        }

        ctx.restore(); // Restore context state (like translation)
    }

    drawCrashedRover() {
        // Renders the rover breaking apart animation
        // Initialize pieces on first call
        if (this.player.deathAnimation.pieces.length === 0 && this.player.state === 'crashed') {
            const numPieces = 12; // More pieces
            for (let i = 0; i < numPieces; i++) {
                this.player.deathAnimation.pieces.push({
                    x: (Math.random() - 0.5) * this.player.width * 0.5, // Start near center
                    y: (Math.random() - 0.5) * this.player.height * 0.5,
                    vx: (Math.random() - 0.5) * 6, // Faster spread
                    vy: (Math.random() - 0.5) * 6 - 2, // Initial upward pop
                    rot: Math.random() * Math.PI * 2,
                    rotSpeed: (Math.random() - 0.5) * 0.3, // Faster rotation
                    size: Math.random() * 8 + 4, // Vary piece size
                    color: `rgb(${Math.random()*100 + 50}, ${Math.random()*100 + 50}, ${Math.random()*100 + 50})`, // Grey/brown tones
                    life: 1.0
                });
            }
        }

        // Update and draw each piece
        const gravity = 0.15;
        const airResistance = 0.99;

        for (let i = this.player.deathAnimation.pieces.length - 1; i >= 0; i--) {
            const piece = this.player.deathAnimation.pieces[i];

            piece.vy += gravity; // Apply gravity
            piece.vx *= airResistance;
            piece.vy *= airResistance;

            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rot += piece.rotSpeed;
            piece.life -= 0.01; // Fade out slowly

            if (piece.life <= 0) {
                 // Remove piece if faded (optional, could just stop drawing)
                 // this.player.deathAnimation.pieces.splice(i, 1);
                 continue;
            }

            this.ctx.save();
            this.ctx.translate(piece.x, piece.y);
            this.ctx.rotate(piece.rot);
            this.ctx.fillStyle = piece.color;
            this.ctx.globalAlpha = piece.life; // Apply fade
            this.ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            this.ctx.restore();
        }
         this.ctx.globalAlpha = 1.0; // Reset global alpha
    }

    drawShieldEffect() {
        // Renders the visual effect for the active shield
        const shieldRadius = this.player.width * 0.75; // Slightly larger shield
        const pulse = (Math.sin(this.frameCount * 0.2) + 1) / 2; // Faster pulse

        // Base shield color (use selected rover's color?) - Let's use a generic bright shield color
        // const baseColor = roverTypes[this.selectedRoverTypeKey]?.svgColor || '#adff2f';
        const baseColor = '#ABFFD7'; // Light cyan/green

        // Outer glow
        this.ctx.beginPath();
        this.ctx.arc(0, 0, shieldRadius + pulse * 3, 0, Math.PI * 2); // Pulsing glow radius
        const glowGradient = this.ctx.createRadialGradient(0, 0, shieldRadius, 0, 0, shieldRadius + pulse * 5);
        glowGradient.addColorStop(0, `rgba(200, 255, 220, ${0.1 + pulse * 0.2})`);
        glowGradient.addColorStop(1, `rgba(200, 255, 220, 0)`);
        this.ctx.fillStyle = glowGradient;
        this.ctx.fill();


        // Main shield bubble
        this.ctx.beginPath();
        this.ctx.arc(0, 0, shieldRadius, 0, Math.PI * 2);
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, shieldRadius);
        gradient.addColorStop(0, `rgba(200, 255, 220, ${0.1 + pulse * 0.1})`); // Inner subtle glow
        gradient.addColorStop(0.8, `${baseColor}${Math.floor((0.3 + pulse * 0.2)*255).toString(16).padStart(2,'0')}`); // Main shield color with alpha hex
        gradient.addColorStop(1, `${baseColor}${Math.floor((0.1 + pulse * 0.1)*255).toString(16).padStart(2,'0')}`); // Outer edge with alpha hex
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Thin outline
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 + pulse * 0.3})`; // Pulsing white outline
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
    }

    drawObstacles() {
        // Renders rock and ice obstacles
        this.obstacles.forEach(obstacle => {
            let fillColor, strokeColor;
            if (obstacle.type === 'rock') {
                fillColor = '#A0522D'; // Sienna
                strokeColor = '#6B4423'; // Darker Brown
            } else { // Ice
                fillColor = 'rgba(173, 216, 230, 0.8)'; // Light Blue with transparency
                strokeColor = 'rgba(240, 248, 255, 0.9)'; // Alice Blue outline
            }

            this.ctx.fillStyle = fillColor;
            this.ctx.strokeStyle = strokeColor;
            this.ctx.lineWidth = 1;

            this.ctx.beginPath();
            // Jagged top edge
            this.ctx.moveTo(obstacle.x, obstacle.y);
            const segments = 5; // Number of jagged segments
            for (let i = 1; i <= segments; i++) {
                 const yPos = obstacle.y + (obstacle.height * (i / segments));
                 const xJag = (i % 2 === 0 ? 1 : -1) * (Math.random() * 4 + 2); // Jaggedness
                 this.ctx.lineTo(obstacle.x + obstacle.width + xJag, yPos);
            }
             this.ctx.lineTo(obstacle.x + obstacle.width, obstacle.y + obstacle.height); // Bottom right

            // Jagged bottom edge (mirrored)
             for (let i = segments; i >= 1; i--) {
                  const yPos = obstacle.y + (obstacle.height * ((i-1) / segments));
                  const xJag = (i % 2 === 0 ? -1 : 1) * (Math.random() * 4 + 2); // Jaggedness
                  this.ctx.lineTo(obstacle.x + xJag, yPos);
             }

            this.ctx.closePath(); // Connect back to start
            this.ctx.fill();
            this.ctx.stroke();

             // Add simple shading/highlight
            if (obstacle.type === 'rock') {
                 this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Highlight
                 this.ctx.beginPath();
                 this.ctx.moveTo(obstacle.x, obstacle.y);
                 this.ctx.lineTo(obstacle.x + obstacle.width, obstacle.y);
                 this.ctx.lineTo(obstacle.x + obstacle.width - 5, obstacle.y + 5);
                 this.ctx.lineTo(obstacle.x + 5, obstacle.y + 5);
                 this.ctx.closePath();
                 this.ctx.fill();
            } else { // Ice highlight
                 this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                 this.ctx.beginPath();
                 this.ctx.arc(obstacle.x + obstacle.width * 0.7, obstacle.y + obstacle.height * 0.3, 5, 0, Math.PI * 2);
                 this.ctx.fill();
            }

        });
    }

    drawPowerUps() {
        // Renders the rotating hexagonal power-ups
        this.powerUps.forEach(powerUp => {
            powerUp.rotation += 0.04; // Consistent rotation speed

            this.ctx.save();
            this.ctx.translate(powerUp.x, powerUp.y);
            this.ctx.rotate(powerUp.rotation);

            const radius = powerUp.radius; // Use powerUp's radius
            const points = 6; // Hexagon

            // Determine color based on type
            let colorHex;
            let iconChar = '?'; // Character to draw inside
            switch (powerUp.type) {
                case 'heat': colorHex = '#FF4500'; iconChar = '🔥'; break; // Fire emoji (might not render everywhere) or 'H'
                case 'cold': colorHex = '#87CEEB'; iconChar = '❄️'; break; // Snowflake or 'C'
                case 'regulation': colorHex = '#9ACD32'; iconChar = '⚙️'; break; // Gear or 'R'
                default: colorHex = '#FFD700'; iconChar = '🛡️'; break; // Shield emoji or 'S'
            }

             // Glowing background effect
             const glowRadius = radius * 1.8;
             const glowGradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
             glowGradient.addColorStop(0, `${colorHex}99`); // More opaque center
             glowGradient.addColorStop(0.5, `${colorHex}4D`);
             glowGradient.addColorStop(1, `${colorHex}00`); // Transparent edge
             this.ctx.fillStyle = glowGradient;
             this.ctx.fillRect(-glowRadius, -glowRadius, glowRadius * 2, glowRadius * 2); // Square glow, easier than circle


            // Draw the hexagon shape
            this.ctx.beginPath();
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2 - Math.PI / 2; // Start from top point
                const xPos = radius * Math.cos(angle);
                const yPos = radius * Math.sin(angle);
                if (i === 0) this.ctx.moveTo(xPos, yPos);
                else this.ctx.lineTo(xPos, yPos);
            }
            this.ctx.closePath();

            // Fill and stroke the hexagon
            this.ctx.fillStyle = `${colorHex}CC`; // Semi-transparent fill
            this.ctx.fill();
            this.ctx.strokeStyle = colorHex; // Solid stroke
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

             // Draw Icon/Letter in the center (optional, can be tricky with rotation/font)
             // Keep rotation in mind if drawing text
             this.ctx.rotate(-powerUp.rotation); // Counter-rotate for text
             this.ctx.font = `bold ${radius * 1.1}px Arial`;
             this.ctx.fillStyle = '#FFF';
             this.ctx.textAlign = 'center';
             this.ctx.textBaseline = 'middle';
             // Try using the icon character, fallback to letter if needed
             try { this.ctx.fillText(iconChar, 0, 0); }
             catch(e) {
                 let fallbackChar = '?';
                 switch(powerUp.type) {
                     case 'heat': fallbackChar = 'H'; break;
                     case 'cold': fallbackChar = 'C'; break;
                     case 'regulation': fallbackChar = 'R'; break;
                     case 'shield': fallbackChar = 'S'; break;
                 }
                 this.ctx.fillText(fallbackChar, 0, 0);
             }
             // this.ctx.rotate(powerUp.rotation); // Rotate back - Already done by ctx.restore()


            this.ctx.restore();
        });
    }

    drawTrack() {
        // Renders the background gradient, stars, and craters
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a1a2a'); // Dark blue/purple top
        gradient.addColorStop(0.7, '#2a2a3a'); // Slightly lighter middle
        gradient.addColorStop(1, '#3a2a4a'); // Hint of purple at bottom
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw Stars (using frameCount for subtle parallax/twinkle)
         const starCount = 70;
         for (let i = 0; i < starCount; i++) {
             // Use a seeded random-like function based on index for consistent positions
             const seed = i * 137 + Math.floor(this.frameCount / 10); // Slow movement based on frameCount
             const x = (Math.sin(seed) * 0.5 + 0.5) * this.canvas.width;
             const y = (Math.cos(seed * 0.7) * 0.5 + 0.5) * this.canvas.height;
             const size = (Math.sin(seed * 1.3) * 0.5 + 0.5) * 1.5 + 0.5; // Size 0.5 to 2.0
             const brightness = (Math.cos(this.frameCount * 0.02 + i * 0.5) * 0.5 + 0.5) * 0.6 + 0.4; // Twinkle (0.4 to 1.0)

             this.ctx.beginPath();
             this.ctx.arc(x, y, size, 0, Math.PI * 2);
             this.ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
             this.ctx.fill();
         }


        // Draw Craters (improved look)
        this.drawCraters();
    }

     drawCraters() {
         // Renders craters with a slightly more detailed look
         this.craters.forEach(crater => {
             // Base crater color (dark shadow)
             this.ctx.fillStyle = `rgba(10, 10, 15, ${crater.depth * 0.8})`; // Darker, slightly blue shadow
             this.ctx.beginPath();
             this.ctx.arc(crater.x, crater.y, crater.radius, 0, Math.PI * 2);
             this.ctx.fill();

             // Inner shadow gradient for depth
             const innerGradient = this.ctx.createRadialGradient(
                 crater.x, crater.y, crater.radius * 0.5, // Start shadow partway in
                 crater.x, crater.y, crater.radius
             );
             innerGradient.addColorStop(0, `rgba(5, 5, 10, ${crater.depth * 0.9})`); // Deepest shadow
             innerGradient.addColorStop(1, `rgba(10, 10, 15, 0)`); // Fade to transparent at edge
             this.ctx.fillStyle = innerGradient;
             this.ctx.fill();


             // Highlight on the rim (opposite the shadow direction assumed to be top-left light)
             this.ctx.strokeStyle = 'rgba(80, 80, 90, 0.4)'; // Muted highlight color
             this.ctx.lineWidth = 2;
             this.ctx.beginPath();
             // Draw arc on the top-left part of the rim
             this.ctx.arc(crater.x, crater.y, crater.radius, Math.PI * 1.1, Math.PI * 1.9);
             this.ctx.stroke();

              // Subtle inner rim shadow
              this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
              this.ctx.lineWidth = 1;
              this.ctx.beginPath();
              // Draw arc on the bottom-right part of the rim
              this.ctx.arc(crater.x, crater.y, crater.radius -1, Math.PI * 0.1, Math.PI * 0.9);
              this.ctx.stroke();
         });
     }


    // --- Particle System ---

    addParticle(x, y, color, options = {}) {
        // Creates a particle effect at a given position
        const defaultOptions = {
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            life: 1.0,
            size: Math.random() * 3 + 1,
            gravity: 0 // Optional gravity effect
        };
        const settings = { ...defaultOptions, ...options }; // Merge defaults with provided options

        const particle = {
            x, y,
            vx: settings.vx,
            vy: settings.vy,
            life: settings.life,
            initialLife: settings.life, // Store initial life for fading calculations
            color,
            size: settings.size,
            gravity: settings.gravity
        };
        this.player.particles.push(particle);
    }

     addEngineParticles() {
         // Spawns particles simulating engine thrust
         const particleCount = (this.player.speed / this.player.baseSpeed); // More particles at higher speed
         // const baseColor = roverTypes[this.selectedRoverTypeKey]?.svgColor || '#adff2f'; // Use rover color

          // Determine particle spawn point based on velocity direction
          const angle = Math.atan2(this.player.velocity.y, this.player.velocity.x);
          // Spawn behind the rover relative to movement direction
          const spawnOffsetX = -Math.cos(angle) * (this.player.width / 2);
          const spawnOffsetY = -Math.sin(angle) * (this.player.height / 2);
          const spawnX = this.player.x + spawnOffsetX;
          const spawnY = this.player.y + spawnOffsetY;


         for (let i = 0; i < particleCount; i++) {
             // Velocity opposite to rover's movement + some spread
             const spreadAngle = (Math.random() - 0.5) * 0.5; // Angle spread
             const particleSpeed = this.player.speed * 0.3 + Math.random() * 1;
             const particleVX = -Math.cos(angle + spreadAngle) * particleSpeed;
             const particleVY = -Math.sin(angle + spreadAngle) * particleSpeed;

             this.addParticle(
                 spawnX + (Math.random()-0.5) * 5, // Add jitter to spawn position
                 spawnY + (Math.random()-0.5) * 5,
                 '255, 255, 200', // Yellowish-white thrust color
                  { vx: particleVX, vy: particleVY, life: 0.4 + Math.random() * 0.3, size: Math.random() * 2 + 1 }
             );
         }
     }

    addCrashEffects() {
        // Spawns smoke/debris particles during the crash animation
         const spawnCount = 2;
         for (let i = 0; i < spawnCount; i++) {
             this.addParticle(
                 this.player.x + (Math.random() - 0.5) * this.player.width,
                 this.player.y + (Math.random() - 0.5) * this.player.height,
                 '100, 100, 100', // Gray smoke color
                  { vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 1.5, life: 1.0 + Math.random(), size: Math.random() * 4 + 2, gravity: -0.01 } // Slow rising smoke
             );
         }
     }


    updateParticles() {
        // Updates position and lifetime of all active particles
        for (let i = this.player.particles.length - 1; i >= 0; i--) {
            const p = this.player.particles[i];

            // Apply gravity if any
            if (p.gravity) {
                p.vy += p.gravity;
            }

            // Move particle
            p.x += p.vx;
            p.y += p.vy;

            // Decrease life
            p.life -= 0.02; // Adjust fade speed if needed

            // Remove particle if life is depleted
            if (p.life <= 0) {
                this.player.particles.splice(i, 1);
            }
        }
    }

    drawParticles() {
        // Renders all active particles
        this.player.particles.forEach(p => {
            const alpha = Math.max(0, p.life / p.initialLife); // Calculate alpha based on remaining life
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2); // Size can shrink with life too
            this.ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
            this.ctx.fill();
        });
         this.ctx.globalAlpha = 1.0; // Reset alpha just in case
    }


    // --- Game State & Interactions ---

    setupControls() {
        // Initializes keyboard event listeners for player input
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

     handleKeyDown(e) {
         // Handles key press events

         // Escape key toggles pause
         if (e.key === 'Escape') {
             this.togglePause();
             return;
         }

         // Ignore other input if paused, game over, or rover is crashed
         if (this.isPaused || this.isGameOver || this.player.state !== 'normal') {
              return;
         }


         let targetVelX = this.player.velocity.x;
         let targetVelY = this.player.velocity.y;

         // Determine target velocity based on keys (using base speed as magnitude)
         switch (e.key.toLowerCase()) { // Use toLowerCase for case-insensitivity
             case 'arrowup':
             case 'w':
                 targetVelY = -this.player.baseSpeed;
                 break;
             case 'arrowdown':
             case 's':
                 targetVelY = this.player.baseSpeed;
                 break;
             case 'arrowleft':
             case 'a':
                 targetVelX = -this.player.baseSpeed;
                 break;
             case 'arrowright':
             case 'd':
                 targetVelX = this.player.baseSpeed;
                 break;
             case ' ': // Spacebar
                 this.activateShield(); // Attempt to activate shield
                 break;
         }

          // Update player velocity only if it changed
          if (targetVelX !== this.player.velocity.x || targetVelY !== this.player.velocity.y) {
               this.player.velocity.x = targetVelX;
               this.player.velocity.y = targetVelY;
          }
     }

     handleKeyUp(e) {
         // Handles key release events

         // Ignore if paused or game over
         if (this.isPaused || this.isGameOver) {
              return;
         }

          let keyReleased = e.key.toLowerCase();

         // Stop vertical movement if the corresponding key is released
          if ((keyReleased === 'arrowup' || keyReleased === 'w') && this.player.velocity.y < 0) {
              this.player.velocity.y = 0;
          }
          if ((keyReleased === 'arrowdown' || keyReleased === 's') && this.player.velocity.y > 0) {
              this.player.velocity.y = 0;
          }

          // Stop horizontal movement if the corresponding key is released
          if ((keyReleased === 'arrowleft' || keyReleased === 'a') && this.player.velocity.x < 0) {
              this.player.velocity.x = 0;
          }
          if ((keyReleased === 'arrowright' || keyReleased === 'd') && this.player.velocity.x > 0) {
              this.player.velocity.x = 0;
          }
     }

     togglePause() {
         // Pauses or resumes the game
         if (this.isGameOver) return; // Cannot pause/unpause if game is already over

         this.isPaused = !this.isPaused;
         const menu = document.querySelector('#game-menu');
         if (!menu) return; // Safety check

         if (this.isPaused) {
             console.log("Game Paused");
             // Show Pause Menu - Use display: block
             menu.style.display = 'flex'; // Show the main overlay flex container

             // Generate upgrade description considering negative levels
             const getUpgradeDesc = (type) => {
                 const level = this.player.upgrades[type];
                 if (level < 0) {
                     return `Vulnerable! Increased ${type === 'heatResistance' ? 'heat' : (type === 'coldResistance' ? 'cold' : 'regulation')} effects by ${Math.abs(level) * 25}%`;
                 }
                 switch (type) {
                     case 'heatResistance': return `Reduces heat effects by ${level * 25}%`;
                     case 'coldResistance': return `Reduces cold effects by ${level * 25}%`;
                     case 'tempRegulation': return `Improves temp recovery & coolant efficiency by ${level * 25}%`;
                     default: return '';
                 }
             };

             // Inner content is centered by CSS absolute positioning now
             menu.innerHTML = `
                  <div class="pause-content">
                       <h3>GAME PAUSED</h3>
                       <div class="rover-stats-pause">
                            <h4>${roverTypes[this.selectedRoverTypeKey]?.name.toUpperCase()} STATS</h4>
                            <p>Base Speed: ${this.player.baseSpeed}</p>
                            <p>Max Coolant: ${roverTypes[this.selectedRoverTypeKey]?.coolant}</p>
                             <p>Current Temp: ${this.player.temperature.toFixed(1)}&deg;</p>
                            <p>Current Coolant: ${this.player.coolant.toFixed(1)}</p>
                       </div>
                       <div class="upgrade-panel-pause">
                            <h4>CURRENT UPGRADES</h4>
                            <div class="upgrade-item-pause">
                                 <span>Heat Resistance (${this.player.upgrades.heatResistance}/3):</span>
                                 <div class="upgrade-bar-pause">
                                      ${this.renderUpgradeBar(this.player.upgrades.heatResistance, 3, '#FF4500')}
                                 </div>
                                 <p>${getUpgradeDesc('heatResistance')}</p>
                            </div>
                            <div class="upgrade-item-pause">
                                 <span>Cold Resistance (${this.player.upgrades.coldResistance}/3):</span>
                                 <div class="upgrade-bar-pause">
                                      ${this.renderUpgradeBar(this.player.upgrades.coldResistance, 3, '#87CEEB')}
                                 </div>
                                  <p>${getUpgradeDesc('coldResistance')}</p>
                            </div>
                            <div class="upgrade-item-pause">
                                 <span>Temp Regulation (${this.player.upgrades.tempRegulation}/3):</span>
                                  <div class="upgrade-bar-pause">
                                       ${this.renderUpgradeBar(this.player.upgrades.tempRegulation, 3, '#9ACD32')}
                                  </div>
                                 <p>${getUpgradeDesc('tempRegulation')}</p>
                            </div>
                       </div>
                       <p class="upgrade-info">Collect power-ups [<span style="color:#FFD700;">🛡️</span> <span style="color:#FF4500;">🔥</span> <span style="color:#87CEEB;">❄️</span> <span style="color:#9ACD32;">⚙️</span>] to upgrade!</p>
                       <div class="pause-buttons">
                            <button class="game-btn" onclick="game.togglePause()">RESUME</button>
                            <button class="game-btn" onclick="showMainMenu()">MAIN MENU</button>
                       </div>
                  </div>
             `;
         } else {
             console.log("Game Resumed");
             // Hide Pause Menu
             menu.style.display = 'none';
             // IMPORTANT: Ensure the game loop restarts if it was stopped by the pause
             // The requestAnimationFrame in gameLoop handles this automatically if structured correctly
         }
     }

    // Helper function to generate HTML for upgrade bars in the pause menu
     // Accounts for negative levels
     renderUpgradeBar(level, maxLevel, color) {
         let barsHTML = '';
         for (let i = 0; i < maxLevel; i++) {
             const isActive = i < level;
             const isNegative = level < 0 && i < Math.abs(level);
             let barColor = '#333'; // Default inactive
             if (isNegative) {
                 barColor = '#8B0000'; // Dark Red for negative
             } else if (isActive) {
                 barColor = color; // Active color
             }
             barsHTML += `<div class="upgrade-level ${isActive ? 'active' : ''} ${isNegative ? 'negative' : ''}" style="background-color: ${barColor};"></div>`;
         }
         return barsHTML;
     }


    activateShield() {
        // Activates the player's shield if available and not already active
        if (this.player.shields > 0 && !this.player.hasShield && this.player.state === 'normal') {
            this.player.shields--;
            if (this.ui.shields) this.ui.shields.textContent = this.player.shields; // Update old UI element if it exists
            this.player.hasShield = true; // Set shield state to active
            console.log("Shield Activated!");

            // --- Particle effect for activation ---
             const shieldColor = '171, 255, 215'; // Shield activation color (light cyan/green) from drawShieldEffect
             const numParticles = 25;
             for (let i = 0; i < numParticles; i++) {
                 const angle = (i / numParticles) * Math.PI * 2;
                  const speed = 2 + Math.random() * 2;
                 this.addParticle(
                     this.player.x, // Start at center
                     this.player.y,
                     shieldColor,
                      { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.6 } // Radiate outwards
                 );
             }

            // --- Set timeout to deactivate shield ---
            const shieldDuration = 3000; // 3 seconds
            setTimeout(() => {
                 // Only deactivate if the shield is still 'hasShield' (wasn't broken by collision)
                 if (this.player.hasShield) {
                      this.player.hasShield = false;
                      console.log("Shield Deactivated (Timeout).");
                      // Particle effect for deactivation
                      const fadeColor = '100, 100, 100'; // Fade color (grey)
                      for (let i = 0; i < 15; i++) {
                          this.addParticle(
                              this.player.x + (Math.random() - 0.5) * this.player.width * 1.5, // Wider spread
                              this.player.y + (Math.random() - 0.5) * this.player.height * 1.5,
                              fadeColor,
                               { life: 0.8 } // Slightly longer fade
                          );
                      }
                 }
            }, shieldDuration);
        } else {
            // Optional: Play a 'cannot activate' sound or visual cue
             // console.log("Cannot activate shield (no shields left or already active).");
        }
    }


    checkCollisions() {
        // Detects and handles collisions between the player and obstacles/power-ups
        if (this.player.state !== 'normal' || this.isPaused) return; // Skip checks if crashed or paused

        const playerRect = {
            left: this.player.x - this.player.width / 2,
            right: this.player.x + this.player.width / 2,
            top: this.player.y - this.player.height / 2,
            bottom: this.player.y + this.player.height / 2
        };

        // --- Obstacle Collisions ---
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            const obs = this.obstacles[i];
            const obsRect = {
                left: obs.x,
                right: obs.x + obs.width,
                top: obs.y,
                bottom: obs.y + obs.height
            };

             // Simple AABB (Axis-Aligned Bounding Box) collision check
            if (
                playerRect.left < obsRect.right &&
                playerRect.right > obsRect.left &&
                playerRect.top < obsRect.bottom &&
                playerRect.bottom > obsRect.top
            ) {
                // Collision detected!
                if (!this.player.hasShield) {
                    // No shield: Crash the rover
                     console.log("Collision with obstacle! Crashing.");
                    this.setPlayerState('crashed');
                     // Potentially add impact particles here
                    this.addParticle(this.player.x, this.player.y, '200, 0, 0', {count: 10, life: 0.5});
                     break; // Exit loop once crashed
                } else {
                    // Shield active: Block the hit, consume shield, remove obstacle
                    console.log("Shield blocked obstacle collision!");
                    this.player.hasShield = false; // Consume shield

                    // Shield break effect
                    const breakColor = '255, 255, 255'; // White flash
                    for (let j = 0; j < 20; j++) {
                         const angle = Math.random() * Math.PI * 2;
                         const speed = Math.random() * 4 + 1;
                        this.addParticle(
                            obs.x + obs.width / 2, // Effect at obstacle center
                            obs.y + obs.height / 2,
                            breakColor,
                             { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.5 }
                        );
                    }

                    // Remove the obstacle that was hit
                    this.obstacles.splice(i, 1);
                    // Do not break loop - shield might block multiple simultaneous hits (rare)
                }
            } // End collision check
        } // End obstacle loop


        // --- Power-Up Collisions ---
         // Use simple distance check for circular power-ups
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const pow = this.powerUps[i];
            const dx = this.player.x - pow.x;
            const dy = this.player.y - pow.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const collisionDistance = this.player.width / 2 + pow.radius; // Adjust player hitbox if needed

            if (distance < collisionDistance) {
                // Collision with power-up
                console.log(`Collected power-up: ${pow.type}`);
                this.powerUps.splice(i, 1); // Remove the collected power-up

                let effectColor = '255, 215, 0'; // Default gold for shield
                let upgraded = false;
                let upgradeMaxed = false; // Track if the specific upgrade collected was already maxed

                // Apply power-up effect
                switch (pow.type) {
                    case 'heat':
                         if (this.player.upgrades.heatResistance < 3) {
                             this.player.upgrades.heatResistance++;
                             effectColor = '255, 69, 0'; // Red
                             upgraded = true;
                         } else { effectColor = '100, 100, 100'; upgradeMaxed = true; } // Grey if maxed
                         break;
                    case 'cold':
                         if (this.player.upgrades.coldResistance < 3) {
                             this.player.upgrades.coldResistance++;
                             effectColor = '135, 206, 235'; // Blue
                             upgraded = true;
                         } else { effectColor = '100, 100, 100'; upgradeMaxed = true; }
                         break;
                    case 'regulation':
                         if (this.player.upgrades.tempRegulation < 3) {
                             this.player.upgrades.tempRegulation++;
                             effectColor = '173, 255, 47'; // Green
                             upgraded = true;
                         } else { effectColor = '100, 100, 100'; upgradeMaxed = true; }
                         break;
                    case 'shield':
                         this.player.shields++;
                         if (this.ui.shields) this.ui.shields.textContent = this.player.shields; // Update old UI element
                         // effectColor remains gold
                          break;
                }

                // Add collection particle effect
                const numCollectParticles = upgraded ? 20 : (upgradeMaxed ? 8 : 12); // More for upgrade, fewer if maxed
                for (let j = 0; j < numCollectParticles; j++) {
                     const angle = Math.random() * Math.PI * 2;
                     const speed = Math.random() * 3 + 1;
                    this.addParticle(pow.x, pow.y, effectColor,
                         { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 0.7 });
                }
            } // End power-up collision check
        } // End power-up loop
    }


    setPlayerState(newState) {
        // Updates the player's state (e.g., 'normal', 'crashed')
        if (this.player.state !== newState) {
             console.log(`Player state changed from ${this.player.state} to ${newState}`);
            this.player.state = newState;
             this.player.velocity = { x: 0, y: 0 }; // Stop movement when state changes

            if (newState === 'crashed') {
                 this.player.deathAnimation.frame = 0; // Reset crash animation frame
                 this.player.deathAnimation.pieces = []; // Clear old pieces
                 this.player.stateTimer = this.player.deathAnimation.maxFrames + 30; // Set timer for game over screen (animation + delay)
                 this.player.hasShield = false; // Ensure shield is off
                 // TODO: Add crash sound effect?
            }
        }
    }

    updatePlayerState() {
        // Manages timers or conditions related to player states (e.g., crash animation leading to game over)
        if (this.player.state === 'crashed') {
            this.player.stateTimer--;
            if (this.player.stateTimer <= 0 && !this.isGameOver) {
                this.gameOver(); // Trigger game over sequence after animation/delay
            }
        }
        // Could add other states here later (e.g., temporary stun)
    }

     evolveRover(scoreMilestone) {
         // Applies permanent rover improvements based on reaching score milestones
         // Grants specific upgrades or refills at milestones.
         console.log(`Evolution triggered at ${scoreMilestone}m!`);
         let evolutionMessage = null;
         let grantedUpgrade = false; // Track if an upgrade was actually given

         switch (scoreMilestone) {
             case 1000: // Enhanced Sensors - Grant first level of resistances if not already present
                  if (this.player.upgrades.heatResistance < 1) {
                      this.player.upgrades.heatResistance = 1;
                      grantedUpgrade = true;
                  }
                  if (this.player.upgrades.coldResistance < 1) {
                      this.player.upgrades.coldResistance = 1;
                      grantedUpgrade = true;
                  }
                  evolutionMessage = grantedUpgrade ? "ROVER UPGRADED: BASIC RESISTANCES ONLINE!" : "MILESTONE BONUS: SENSORS CALIBRATED!";
                  break;
             case 2000: // Improved Cooling - Grant first level of regulation & refill some coolant
                  if (this.player.upgrades.tempRegulation < 1) {
                      this.player.upgrades.tempRegulation = 1;
                      grantedUpgrade = true;
                  }
                  this.player.coolant = Math.min(roverTypes[this.selectedRoverTypeKey].coolant, this.player.coolant + 50); // Refill some coolant
                  evolutionMessage = grantedUpgrade ? "ROVER UPGRADED: COOLING EFFICIENCY BOOST!" : "MILESTONE BONUS: COOLANT PARTIALLY REFILLED!";
                  break;
             case 3000: // Advanced Shielding - Grant second level of resistances if not already present
                  if (this.player.upgrades.heatResistance < 2) {
                      this.player.upgrades.heatResistance = 2;
                      grantedUpgrade = true;
                  }
                  if (this.player.upgrades.coldResistance < 2) {
                      this.player.upgrades.coldResistance = 2;
                      grantedUpgrade = true;
                  }
                   evolutionMessage = grantedUpgrade ? "ROVER UPGRADED: ADVANCED THERMAL PLATING!" : "MILESTONE BONUS: SHIELDING REINFORCED!";
                  break;
             case 5000: // Quantum Regulator - Grant second level of regulation
                  if (this.player.upgrades.tempRegulation < 2) {
                      this.player.upgrades.tempRegulation = 2;
                      grantedUpgrade = true;
                  }
                  evolutionMessage = grantedUpgrade ? "ROVER UPGRADED: THERMAL REGULATION ENHANCED!" : "MILESTONE BONUS: REGULATOR OPTIMIZED!";
                  break;
             case 7500: // Max Resistances - Ensure resistances are maxed
                  if (this.player.upgrades.heatResistance < 3) {
                      this.player.upgrades.heatResistance = 3;
                      grantedUpgrade = true;
                  }
                   if (this.player.upgrades.coldResistance < 3) {
                      this.player.upgrades.coldResistance = 3;
                      grantedUpgrade = true;
                  }
                  evolutionMessage = grantedUpgrade ? "ROVER UPGRADED: MAX THERMAL RESISTANCE!" : "MILESTONE BONUS: ALL RESISTANCES AT PEAK!";
                  break;
             case 10000: // Max Regulation & Full Coolant Refill
                  if (this.player.upgrades.tempRegulation < 3) {
                       this.player.upgrades.tempRegulation = 3;
                       grantedUpgrade = true;
                  }
                  this.player.coolant = roverTypes[this.selectedRoverTypeKey].coolant; // Full refill
                  evolutionMessage = grantedUpgrade ? "ROVER UPGRADED: PEAK EFFICIENCY REACHED!" : "MILESTONE BONUS: SYSTEMS MAXED! COOLANT FULL!";
                  break;
         }

         // Optional: Grant a shield at certain milestones if none are held?
         if (scoreMilestone >= 3000 && this.player.shields < 1 && Math.random() < 0.5) { // 50% chance at 3km+
             // this.player.shields++;
             // if(this.ui.shields) this.ui.shields.textContent = this.player.shields;
             // Could add "(+1 Shield)" to the message if desired.
         }

         // Return the message so updateScore can display it
         return evolutionMessage;
     }


    updateScore() {
        // Increments score and handles milestone events
        if (this.player.state !== 'normal' || this.isPaused) return; // Don't increase score if crashed or paused

        // Increase score based on speed? More score for faster movement?
        const scoreIncrement = 1; // Simple increment per frame for now
        this.score += scoreIncrement;
        if(this.ui.score) this.ui.score.textContent = this.score; // Update old UI element if it exists

        // --- Check for Mission Completion Milestones ---
        const milestones = {
             1000: { message: 'MILESTONE: 1km REACHED!', color: '173, 255, 47', evoKey: 1000 },
             2000: { message: 'MILESTONE: 2km REACHED!', color: '255, 215, 0', evoKey: 2000 },
             3000: { message: 'MILESTONE: 3km REACHED!', color: '255, 165, 0', evoKey: 3000 },
             5000: { message: 'MILESTONE: 5km REACHED!', color: '255, 69, 0', evoKey: 5000 },
             7500: { message: 'MILESTONE: 7.5km REACHED!', color: '138, 43, 226', evoKey: 7500 },
             10000: { message: 'MILESTONE: 10km REACHED!', color: '255, 255, 255', evoKey: 10000 }
             // Add more milestones if desired
        };

        // Check if the current score exactly matches a milestone key
        if (milestones[this.score]) {
            const milestone = milestones[this.score];
            console.log(`Milestone reached: ${this.score}m`);

            let evolutionMessage = null;
             // Trigger rover evolution if defined for this milestone
             if (milestone.evoKey) {
                  evolutionMessage = this.evolveRover(milestone.evoKey); // Pass the score milestone and get potential message
             }


            // --- Display Milestone Visual Effects ---
            // Store effect data to be drawn over a few frames in the render loop
             this.milestoneEffect = {
                 text: evolutionMessage || milestone.message, // Use evolution message if available
                 color: milestone.color,
                 timer: 120 // Display for 120 frames (2 seconds)
             };


            // Create celebration particles radiating from the player
            const numParticles = 60;
            for (let i = 0; i < numParticles; i++) {
                const angle = (i / numParticles) * Math.PI * 2;
                const speed = Math.random() * 4 + 2;
                const life = 0.8 + Math.random() * 0.5;
                this.addParticle(
                    this.player.x, this.player.y, // Start at player center
                    milestone.color,
                     { vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: life }
                );
            }

            // Optional: Temporary speed boost on milestone
            // this.player.currentSpeedMultiplier *= 1.3; // Apply temporary multiplier
            // setTimeout(() => {
            //     // Need to carefully reset multiplier based on current temp effect
            //     this.updateTemperature(); // Recalculate speed multiplier based on temp
            // }, 2000); // Boost duration
        }

        // Regular score particles (less frequent)
        if (this.score > 0 && this.score % 200 === 0) {
            for (let i = 0; i < 5; i++) { // Fewer particles
                this.addParticle(
                    this.player.x + (Math.random() - 0.5) * 30,
                    this.player.y + (Math.random() - 0.5) * 30,
                    '200, 200, 100', // Faint yellow
                     { life: 0.5, size: 1 }
                );
            }
        }
    }

    // Moved from updateScore to render, called after other elements are drawn
    updateAndDrawMilestoneEffect() {
       if (this.milestoneEffect && this.milestoneEffect.timer > 0) {
            this.milestoneEffect.timer--;
            const effectProgress = 1.0 - (this.milestoneEffect.timer / 120); // 0 to 1
            const fadeOutAlpha = Math.min(1, (this.milestoneEffect.timer / 30)); // Fade out in last 0.5s

            // --- Draw Text ---
            this.ctx.font = `bold ${28 + effectProgress * 10}px Arial`; // Size scales down slightly
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = `rgba(${this.milestoneEffect.color}, ${fadeOutAlpha})`;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
            this.ctx.shadowBlur = 5;
            this.ctx.fillText(this.milestoneEffect.text, this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.shadowBlur = 0; // Reset shadow
            this.ctx.textAlign = 'left'; // Reset text align

            // --- Draw Radial Burst ---
            const burstRadius = 150 * effectProgress;
            const burstGradient = this.ctx.createRadialGradient(
                this.player.x, this.player.y, 0,
                this.player.x, this.player.y, burstRadius
            );
            burstGradient.addColorStop(0, `rgba(${this.milestoneEffect.color}, ${0.5 * fadeOutAlpha})`);
            burstGradient.addColorStop(0.7, `rgba(${this.milestoneEffect.color}, ${0.2 * fadeOutAlpha})`);
            burstGradient.addColorStop(1, `rgba(${this.milestoneEffect.color}, 0)`);
            this.ctx.fillStyle = burstGradient;
            this.ctx.beginPath();
            this.ctx.arc(this.player.x, this.player.y, burstRadius, 0, Math.PI * 2);
            this.ctx.fill();


            // Clear effect when timer runs out
            if (this.milestoneEffect.timer <= 0) {
                 this.milestoneEffect = null;
            }
       }
    }


    // --- Game Over & Score Saving ---

    gameOver() {
        // Handles the game over sequence and displays the final menu
        if (this.isGameOver) return; // Prevent multiple calls

        console.log(`Game Over! Final Score: ${this.score}`);
        this.isGameOver = true;
        this.isPaused = false; // Ensure pause state is off

        const menu = document.querySelector('#game-menu');
        if (!menu) return; // Safety check

        // Show the menu overlay using display: block
        menu.style.display = 'flex'; // Use flex to trigger centering via CSS

        // Inner content is centered by CSS absolute positioning

        // Determine the cause of game over
        let deathMessage = "MISSION FAILED!";
        if (this.player.temperature <= 0) {
            deathMessage = "ROVER FROZEN SOLID! SYSTEMS OFFLINE.";
        } else if (this.player.temperature >= 100) {
            deathMessage = "REACTOR OVERHEAT! CORE MELTDOWN IMMINENT.";
        } else {
             // Assume crash if temperature wasn't the cause
             deathMessage = "ROVER DESTROYED! MISSION ABORTED.";
        }

        // Show score and input for name
        menu.innerHTML = `
             <div class="game-over-content">
                  <h2>GAME OVER</h2>
                  <p class="death-message">${deathMessage}</p>
                  <p class="final-score">FINAL SCORE: ${this.score}</p>
                  <div class="name-input">
                       <input type="text" id="player-name" maxlength="8" placeholder="ENTER NAME (3-8 chars)" style="text-transform: uppercase; padding: 8px; margin: 10px 0; width: 150px; text-align: center;">
                       <button class="game-btn" onclick="game.submitScore()">SUBMIT SCORE</button>
                  </div>
                   <button class="game-btn" onclick="showMainMenu()">MAIN MENU</button>
             </div>
        `;

        // Auto-focus the name input field
        const nameInput = document.getElementById('player-name');
         if (nameInput) {
             setTimeout(() => nameInput.focus(), 100); // Delay focus slightly
         }
    }

    submitScore() {
        // Reads player name, saves score, and shows leaderboard
        const nameInput = document.getElementById('player-name');
        if (!nameInput) return;

        const playerName = nameInput.value.trim().substring(0, 8).toUpperCase();

        if (playerName.length >= 3) { // Require minimum name length
            this.saveScore(playerName); // Save the score
            this.showLeaderboardAfterSubmit(); // Show updated leaderboard
        } else {
            alert("Please enter a name (3-8 characters).");
        }
    }

    saveScore(playerName) {
        // Saves the score entry to localStorage
        if (!playerName) return;
        console.log(`Saving score: ${playerName} - ${this.score}`);

        try {
            const scores = JSON.parse(localStorage.getItem('roverGameScores_v2') || '[]'); // Use new key for new structure
            scores.push({
                name: playerName,
                score: this.score,
                difficulty: this.difficulty,
                rover: this.selectedRoverTypeKey, // Save which rover was used
                date: new Date().toISOString().split('T')[0] // Save YYYY-MM-DD
            });

            // Sort by score (descending), then by date (ascending for ties)
            scores.sort((a, b) => {
                if (b.score !== a.score) {
                    return b.score - a.score;
                }
                return new Date(a.date) - new Date(b.date); // Older scores rank higher in ties (or change as needed)
            });


            // Keep only top 10 scores
            const topScores = scores.slice(0, 10);

            localStorage.setItem('roverGameScores_v2', JSON.stringify(topScores));
        } catch (error) {
            console.error("Failed to save score to localStorage:", error);
        }
    }

     showLeaderboardAfterSubmit() {
         // Updates the game over menu to show the leaderboard after submission
         const menu = document.querySelector('#game-menu');
         if (!menu) return; // Safety check

         // Ensure menu is displayed (redundant if called from submitScore after gameOver)
         menu.style.display = 'flex'; // Use flex to ensure centering works
         // Centering is handled by CSS absolute positioning of inner content

         menu.innerHTML = `
                <div class="game-over-content">
                     <h2>GAME OVER</h2>
                      <p class="final-score">YOUR SCORE: ${this.score}</p>
                     <div class="leaderboard">
                          <h4>HIGH SCORES</h4>
                          ${this.getLeaderboardHTML()}
                     </div>
                     <div class="menu-buttons">
                         <button class="game-btn" onclick="showRoverSelection('${this.difficulty}')">TRY AGAIN (${this.difficulty.toUpperCase()})</button>
                         <button class="game-btn" onclick="showMainMenu()">MAIN MENU</button>
                     </div>
                </div>
             `;
     }

     getLeaderboardHTML(limit = 10) {
         // Generates HTML string for the leaderboard display
         let scores = [];
         try {
              scores = JSON.parse(localStorage.getItem('roverGameScores_v2') || '[]');
         } catch (error) {
              console.error("Failed to load scores from localStorage:", error);
              return "<p>Error loading scores.</p>";
         }


         if (scores.length === 0) {
             return "<p>No scores recorded yet!</p>";
         }

         // Get rover name safely
         const getRoverName = (key) => roverTypes[key]?.name || key?.substring(0,3).toUpperCase() || '???';

         return scores.slice(0, limit).map((entry, index) => `
               <div class="leaderboard-entry">
                    <span class="rank">${index + 1}.</span>
                    <span class="name">${entry.name || '???'}</span>
                    <span class="score">${entry.score}</span>
                    <span class="details">(${entry.difficulty?.substring(0,1).toUpperCase() || '?'}/${getRoverName(entry.rover)})</span>
                    <span class="date">${entry.date || ''}</span>
               </div>
         `).join('');
     }

    // --- Entity Generation ---

    generateTrack() {
        // Sets game parameters based on difficulty (e.g., obstacle frequency)
        const difficultySettings = {
            easy: { obstacleRate: 100, asteroidInterval: 600, asteroidStart: 1200 }, // Slower obstacles, later asteroids
            medium: { obstacleRate: 75, asteroidInterval: 500, asteroidStart: 1000 },
            hard: { obstacleRate: 55, asteroidInterval: 400, asteroidStart: 800 }   // Faster obstacles, earlier/more frequent asteroids
        };

        const settings = difficultySettings[this.difficulty] || difficultySettings.medium;
        this.obstacleRate = settings.obstacleRate; // Lower number = more frequent
         this.asteroidInterval = settings.asteroidInterval;
         // Store the start score for asteroids separately if needed
         // this.asteroidStartScore = settings.asteroidStart;
         console.log(`Difficulty set to ${this.difficulty}: Obstacle Rate=${this.obstacleRate}, Asteroid Interval=${this.asteroidInterval}`);
    }

     generateObstacle() {
         // Creates a single new obstacle off-screen
         const minHeight = 40;
         const maxHeight = 180;
         const height = Math.random() * (maxHeight - minHeight) + minHeight;
         const width = 20 + Math.random() * 10; // Slightly variable width

         // Ensure obstacle doesn't cover the entire screen vertically
         const y = Math.random() * (this.canvas.height - height);

         // Speed based on difficulty?
         const baseSpeed = 2.5;
         const difficultySpeedBonus = this.difficulty === 'medium' ? 0.5 : (this.difficulty === 'hard' ? 1.0 : 0);
         const speed = baseSpeed + difficultySpeedBonus + Math.random() * 1.5; // Base + diff + random variation

        const obstacle = {
            x: this.canvas.width, // Start just off-screen right
            y: y,
            width: width,
            height: height,
            speed: speed,
            type: Math.random() > 0.5 ? 'rock' : 'ice'
        };
        this.obstacles.push(obstacle);
    }

     generatePowerUp() {
         // Creates a single new power-up off-screen
         // Increase chance of shield if player has none?
         let types = ['heat', 'cold', 'regulation'];
         if (this.player.shields < 1 || Math.random() < 0.3) { // Higher chance for shield if low
              types.push('shield', 'shield'); // Add shield twice to increase probability
         }

         // Consider current weaknesses - slightly increase chance of helpful upgrades
         if (this.player.upgrades.heatResistance < 1 && Math.random() < 0.2) types.push('heat');
         if (this.player.upgrades.coldResistance < 1 && Math.random() < 0.2) types.push('cold');
         if (this.player.upgrades.tempRegulation < 1 && Math.random() < 0.2) types.push('regulation');


         const type = types[Math.floor(Math.random() * types.length)];

         const radius = 12; // Slightly larger powerups
         const powerUp = {
             x: this.canvas.width + radius, // Start off-screen right
             y: Math.random() * (this.canvas.height - radius * 2) + radius, // Ensure fully within vertical bounds
             radius: radius,
             speed: 2.5 + Math.random(), // Slightly slower than some obstacles
             rotation: Math.random() * Math.PI * 2, // Start with random rotation
             type: type
         };
         this.powerUps.push(powerUp);
    }

     generateCraters() {
         // Creates the background crater decorations
         this.craters = [];
         const numCraters = 25;
         for (let i = 0; i < numCraters; i++) {
             this.craters.push({
                 x: Math.random() * this.canvas.width,
                 y: Math.random() * this.canvas.height,
                 radius: Math.random() * 25 + 8, // 8 to 33 radius
                 depth: Math.random() * 0.4 + 0.5 // 0.5 to 0.9 depth for visibility
             });
         }
     }

} // End of RoverGame class

// ==================================
// Global Game Control Functions
// ==================================

let game = null; // Global variable to hold the current game instance

function showMainMenu() {
    // Stops any existing game and displays the main menu with difficulty options and leaderboard
    console.log("Showing Main Menu");
    if (game) {
        game.stop(); // Ensure the previous game loop is stopped
        game = null; // Discard the old instance
    }

    const menu = document.querySelector('#game-menu');
    if (!menu) { console.error("#game-menu element not found!"); return; }

    // Show the menu overlay - centering is handled by CSS
    menu.style.display = 'flex'; // Use flex display


     // Generate leaderboard HTML safely
     let leaderboardHTML = '';
     try {
         // Create a temporary instance just to access the getLeaderboardHTML method if game is null
         const leaderboardGenerator = game || new RoverGame(); // Create temp instance if needed
         leaderboardHTML = leaderboardGenerator.getLeaderboardHTML();
     } catch(e) {
         console.error("Error generating leaderboard HTML:", e);
         leaderboardHTML = '<p>Could not load scores.</p>';
     }


    menu.innerHTML = `
        <div class="main-menu-content">
             <h2>ROVER GAUNTLET</h2>
             <div class="leaderboard">
                  <h4>HIGH SCORES</h4>
                  ${leaderboardHTML}
             </div>
             <p>Select Difficulty:</p>
             <div class="menu-buttons">
                  <button class="game-btn easy" onclick="showRoverSelection('easy')">EASY</button>
                  <button class="game-btn medium" onclick="showRoverSelection('medium')">MEDIUM</button>
                  <button class="game-btn hard" onclick="showRoverSelection('hard')">HARD</button>
             </div>
        </div>
    `;
}

function showRoverSelection(difficulty) {
    // Displays the rover selection screen for the chosen difficulty
    console.log(`Showing Rover Selection for ${difficulty} difficulty`);
    const menu = document.querySelector('#game-menu');
    if (!menu) { console.error("#game-menu element not found!"); return; }

    // Show the menu overlay - centering is handled by CSS
    menu.style.display = 'flex'; // Use flex display


    let roverOptionsHTML = '';
    // Loop through the defined rover types
    for (const key in roverTypes) {
        // Skip the shared helper methods attached to the main object
        if (typeof roverTypes[key].getSvg !== 'function') continue;

        const rover = roverTypes[key];
        // Generate a preview SVG using the base color and initial upgrades
        let previewSvg = '<p>SVG Error</p>'; // Fallback
        try {
            // Use .call to ensure 'this' context is correct if helpers rely on it
             previewSvg = rover.getSvg.call(rover, rover.svgColor, rover.initialUpgrades, 0);
        } catch (e) { console.error(`Error generating SVG for ${key}:`, e); }

         // Generate text for initial upgrades, showing '+' for positive, '-' for negative
        const formatUpgrade = (val) => (val > 0 ? `+${val}` : (val < 0 ? `${val}`: `0`));
        const upgradesText = `
            <span title="Heat Resistance">[H:${formatUpgrade(rover.initialUpgrades.heatResistance)}]</span>
            <span title="Cold Resistance">[C:${formatUpgrade(rover.initialUpgrades.coldResistance)}]</span>
            <span title="Temp Regulation">[R:${formatUpgrade(rover.initialUpgrades.tempRegulation)}]</span>
        `;


        roverOptionsHTML += `
             <div class="rover-selection-option" onclick="selectRoverAndStart('${difficulty}', '${key}')" title="Click to select ${rover.name}">
                  <h4>${rover.name.toUpperCase()}</h4>
                  <div class="rover-preview-svg">
                       ${previewSvg}
                  </div>
                  <p class="rover-description">${rover.description}</p>
                  <div class="rover-stats-preview">
                       <p>Speed: ${rover.baseSpeed}</p>
                       <p>Coolant: ${rover.coolant}</p>
                       <p class="initial-upgrades">
                           Initial: ${upgradesText}
                       </p>
                  </div>
             </div>
        `;
    }

    menu.innerHTML = `
        <div class="rover-select-content">
             <h2>SELECT ROVER <span class="difficulty-badge ${difficulty}">${difficulty.toUpperCase()}</span></h2>
             <div class="rover-selection-container">
                  ${roverOptionsHTML}
             </div>
              <button class="game-btn back-btn" onclick="showMainMenu()">BACK TO MENU</button>
        </div>
    `;
}

function selectRoverAndStart(difficulty, roverKey) {
    // Creates a new game instance and starts the game with the selected options
    console.log(`Selected Rover: ${roverKey}, Difficulty: ${difficulty}. Starting game...`);
    // Ensure any old game instance is stopped/cleaned up if necessary
    if (game) {
        game.stop();
    }
    // Create and start the new game
    game = new RoverGame();
    game.start(difficulty, roverKey);
}

// ==================================
// Initial Setup on Page Load
// ==================================
window.onload = () => {
    console.log("Page loaded. Initializing menu.");

    // --- Add Essential CSS ---
    const style = document.createElement('style');
    style.innerHTML = `
        body { margin: 0; background-color: #000; color: #fff; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; position: relative; overflow: hidden; /* Prevent body scrollbars */ }
        canvas { border: 1px solid #555; background-color: #111; display: block; /* Prevents extra space below canvas */ margin: auto; /* Helps center if body flex fails */}

        /* --- MODIFIED #game-menu RULE (Overlay Only) --- */
        #game-menu {
            display: none; /* Hidden by default, shown by JS */
            position: fixed;             /* Use fixed positioning */
            top: 0;
            left: 0;
            width: 100vw;                /* Full viewport width */
            height: 100vh;               /* Full viewport height */
            // color: white;
            z-index: 100;                /* Ensure it's on top */
            // display: flex;               /* Use flexbox for centering */
            justify-content: center;     /* Center horizontally */
            align-items: center;         /* Center vertically */
        }
        /* --- END MODIFIED #game-menu RULE --- */

        /* --- Inner Content Rules (Absolute Centering no longer needed with flex) --- */
        .main-menu-content, .rover-select-content, .game-over-content, .pause-content {
            /* removed absolute positioning */
             position: absolute;         /* Position relative to #game-menu */
           top: 100%;
           left: 100%;
           transform: translate(-50%, -50%); /* Center the box */
            background: rgba(20, 20, 30, 0.95); /* Slightly more opaque */
            padding: 25px;
            border-radius: 10px;
            border: 1px solid #445;
            max-width: 700px;            /* Max width of the content box */
            width: 90%;                  /* Responsive width */
            box-shadow: 0 0 15px rgba(100, 100, 200, 0.3);
            margin: 20px;                /* Add margin back */
            max-height: 90vh;            /* Prevent box exceeding viewport height */
            overflow-y: auto;            /* Allow scrolling WITHIN the box */
            text-align: center;          /* Center text inside the box */
        }
        /* Adjust pause content width if needed */
        .pause-content { max-width: 550px; }


        h2, h3, h4 { margin-top: 0; color: #E0E0FF; }
        h3 { border-bottom: 1px solid #445; padding-bottom: 10px; margin-bottom: 15px;}
        h4 { color: #C0C0AA; font-size: 0.9em; margin-bottom: 5px;}
        p { line-height: 1.4; }
        .menu-buttons button, .pause-buttons button { margin: 8px; padding: 12px 20px; }
        .game-btn { background-color: #4a4a6a; border: 1px solid #778; color: #e0e0ff; font-weight: bold; cursor: pointer; transition: background-color 0.2s, transform 0.1s; border-radius: 5px; font-size: 1em; }
        .game-btn:hover { background-color: #6a6a8a; }
        .game-btn:active { transform: scale(0.98); }
        .game-btn.easy { background-color: #5a8a5a; border-color: #8b8; } .game-btn.easy:hover { background-color: #7aAa7a;}
        .game-btn.medium { background-color: #a0a04a; border-color: #ccc8; } .game-btn.medium:hover { background-color: #c0c06a;}
        .game-btn.hard { background-color: #a05a5a; border-color: #c88; } .game-btn.hard:hover { background-color: #c07a7a;}
        .game-btn.back-btn { background-color: #666; border-color: #999; margin-top: 20px;} .game-btn.back-btn:hover { background-color: #888;}

        /* Leaderboard */
        .leaderboard { margin: 20px auto; /* Centered horizontally */ padding: 10px; border: 1px solid #334; max-width: 500px; width: 100%; max-height: 220px; overflow-y: auto; background: rgba(10,10,15,0.7); border-radius: 5px; font-size: 0.9em;}
        .leaderboard-entry { display: flex; flex-wrap: wrap; /* Allow wrapping on small screens */ justify-content: space-between; padding: 4px 8px; border-bottom: 1px solid #223; }
        .leaderboard-entry:last-child { border-bottom: none; }
        .leaderboard-entry span { text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin: 1px 0;} /* Added margin */
        .leaderboard-entry .rank { flex: 0 0 30px; text-align: right; padding-right: 5px; color: #aaa; }
        .leaderboard-entry .name { flex: 1 1 80px; /* Adjusted flex basis */ font-weight: bold; color: #fff; padding: 0 5px;}
        .leaderboard-entry .score { flex: 0 0 70px; text-align: right; font-weight: bold; color: #ffd700; }
        .leaderboard-entry .details { flex: 0 0 100px; /* Slightly wider for rover name */ text-align: center; color: #aaa; font-size: 0.85em; }
        .leaderboard-entry .date { flex: 0 0 80px; text-align: right; color: #889; font-size: 0.85em;}

        /* Rover Selection */
        .rover-select-content h2 .difficulty-badge { padding: 3px 8px; border-radius: 4px; font-size: 0.8em; vertical-align: middle; margin-left: 10px; }
        .difficulty-badge.easy { background-color: #5a8a5a; color: #fff;}
        .difficulty-badge.medium { background-color: #a0a04a; color: #fff;}
        .difficulty-badge.hard { background-color: #a05a5a; color: #fff;}
        .rover-selection-container { display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin: 20px 0;}
        .rover-selection-option { border: 2px solid #556; padding: 10px; background: rgba(40,40,50,0.9); cursor: pointer; transition: background 0.2s, border-color 0.2s, transform 0.1s; width: 180px; /* Slightly narrower for 3 across */ display: flex; flex-direction: column; align-items: center; border-radius: 8px; }
        .rover-selection-option:hover { background: rgba(60,60,80,1); border-color: #889; transform: translateY(-2px); }
        .rover-selection-option h4 { margin-bottom: 5px; color: #fff;}
        .rover-preview-svg svg { width: 80px; height: 60px; margin: 5px 0; background: #1a1a2a; border-radius: 4px; padding: 5px; border: 1px solid #445;}
        .rover-description { font-size: 0.85em; color: #bbb; margin-bottom: 8px; min-height: 3em; text-align: center;}
        .rover-stats-preview { font-size: 0.85em; color: #ccc; margin-top: auto; width: 100%; text-align: center; border-top: 1px solid #445; padding-top: 8px; margin-top: 8px; }
        .rover-stats-preview p { margin: 3px 0; }
        .rover-stats-preview .initial-upgrades { font-size: 0.9em; color: #aaa; }
        .rover-stats-preview .initial-upgrades span { margin: 0 2px; cursor: help; /* Add tooltip hint */}


        /* Game Over / Pause Menu */
        .death-message { color: #FFA07A; font-weight: bold; font-size: 1.1em;}
        .final-score { font-size: 1.2em; color: #FFD700; margin-bottom: 20px;}
        .name-input { margin-bottom: 15px; display: flex; align-items: center; justify-content: center; flex-wrap: wrap; /* Allow wrapping */}
        .name-input input { background: #334; border: 1px solid #667; color: #fff; border-radius: 4px; padding: 8px; margin: 5px; width: 150px; text-align: center; }
        .name-input button { margin: 5px;}

        /* Pause Menu Specifics */
        .rover-stats-pause { background: rgba(0,0,0,0.2); padding: 10px; border-radius: 5px; margin-bottom: 15px; font-size: 0.9em;}
        .rover-stats-pause p { margin: 4px 0;} /* Added spacing */
        .upgrade-panel-pause { text-align: left; font-size: 0.9em;}
        .upgrade-item-pause { margin-bottom: 10px; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;}
        .upgrade-item-pause span { font-weight: bold; display: block; /* Label on its own line */}
        .upgrade-item-pause p { font-size: 0.9em; color: #bbb; margin: 3px 0 0 0;}
        .upgrade-bar-pause { display: flex; height: 10px; margin: 4px 0; background: #222; border-radius: 3px; overflow: hidden;}
        .upgrade-level { flex-grow: 1; margin: 1px; border-radius: 2px; }
        /* Style for negative level bars */
        .upgrade-level.negative { border: 1px dashed #FF6347; }
        .upgrade-info { font-size: 0.9em; color: #aaa; margin-top: 15px; text-align: center;}
        .pause-buttons { margin-top: 20px; border-top: 1px solid #445; padding-top: 15px;}

         /* UI Overlays (Score/Shields drawn on canvas now) - Hide the old HTML elements */
        #score, #power-ups { display: none; } /* Hide the original score/shield elements */
    `;
    document.head.appendChild(style);

     // Ensure necessary HTML elements exist (canvas, menu div)
     if (!document.getElementById('gameCanvas')) {
         const canvas = document.createElement('canvas'); canvas.id = 'gameCanvas';
         document.body.appendChild(canvas);
     }
     // Score/Powerup divs are created but hidden by CSS if needed by constructor
     if (!document.getElementById('score')) {
         const scoreDiv = document.createElement('div'); scoreDiv.id = 'score';
         scoreDiv.innerHTML = 'Score: <span>0</span>'; document.body.appendChild(scoreDiv);
     }
     if (!document.getElementById('power-ups')) {
         const puDiv = document.createElement('div'); puDiv.id = 'power-ups';
         puDiv.innerHTML = 'Shields: <span>0</span>'; document.body.appendChild(puDiv);
     }

     if (!document.getElementById('game-menu')) {
         const menuDiv = document.createElement('div'); menuDiv.id = 'game-menu';
         document.body.appendChild(menuDiv);
     }

    // Show the main menu initially
    showMainMenu();
};