# 🧪 Molecule Synthesis Visualizer

A comprehensive web-based organic chemistry visualization tool for drawing molecules, creating reaction mechanisms, and tracking synthesis pathways.

## Features

### 🎨 Molecule Drawing
- **Interactive Canvas**: Draw molecules with an intuitive point-and-click interface
- **Bond Types**: Single, double, triple, wedge (stereochemistry), and dashed bonds
- **Common Atoms**: Quick access to C, H, O, N, S, P, F, Cl, Br, I
- **Smart Carbon Display**: Carbon atoms are shown as small dots in chains for cleaner diagrams

### 🔧 Drawing Tools
- **Select Tool**: Move and edit existing atoms
- **Atom Tool**: Add individual atoms
- **Bond Tools**: Create different types of chemical bonds
- **Chain Tool**: Quickly draw carbon chains
- **Ring Tool**: Create cyclic structures with custom sizes
- **Benzene Tool**: Instant aromatic ring with alternating double bonds

### 🧬 Functional Groups
Pre-built functional groups that can be attached to any atom:
- **-OH** (Alcohol)
- **-CHO** (Aldehyde)
- **-COOH** (Carboxylic Acid)
- **-NH₂** (Amine)
- **-NO₂** (Nitro)
- **-CH₃** (Methyl)
- **C=O** (Ketone)
- **-COCl** (Acyl Chloride)

### ⚗️ Reaction Mechanisms
- **Reaction Arrows**: Visual representation of chemical transformations
- **Predefined Reactions**:
  - SN2 Substitution
  - E2 Elimination
  - Addition reactions
  - Oxidation
  - Reduction
- **Custom Reagents**: Add your own reaction conditions and catalysts

### 📊 Synthesis Pathway Tracker
- **Multi-Step Synthesis**: Build complex synthesis routes
- **Step Management**: Add, delete, and reorder synthesis steps
- **Conditions Tracking**: Record reagents and conditions for each step
- **Save/Load Pathways**: Export and import synthesis routes as JSON

### 📐 Molecular Properties
Real-time calculation of:
- Molecular formula
- Molecular weight
- Atom count
- Bond count

### 🎯 Molecule Templates
Quick access to common molecules:
- Ethanol
- Acetone
- Benzene
- Glucose
- Aspirin
- Caffeine

### 💾 Export Features
- **PNG Export**: Save your drawings as images
- **Pathway Export**: Save synthesis routes as JSON files
- **Canvas Print**: Print-friendly layout

## How to Use

### Getting Started
1. Open `index.html` in a modern web browser
2. Or run a local server:
   ```bash
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000`

### Drawing Molecules
1. **Select a tool** from the left sidebar
2. **Click on the canvas** to add atoms
3. **Click and drag** between atoms to create bonds
4. **Double-click** an atom to change its element

### Creating Bonds
1. Select a bond tool (Single, Double, Triple, Wedge, or Dash)
2. Click on the first atom
3. Click on the second atom to create the bond

### Adding Functional Groups
1. Use the **Select tool** to click on an atom
2. Click a **functional group button** to attach it

### Building Synthesis Pathways
1. Draw your starting molecule
2. Add reaction arrows with conditions
3. Click **"Add Step"** to save the current state
4. Continue building your synthesis route
5. Use **"Save Pathway"** to export your work

### Keyboard Shortcuts
- **Ctrl+Z**: Undo
- **Ctrl+Y**: Redo
- **Ctrl+S**: Export as PNG
- **Delete/Backspace**: Remove selected atom

## Technical Details

### Technologies Used
- **Pure JavaScript**: No external dependencies
- **HTML5 Canvas**: High-performance rendering
- **CSS3**: Modern, responsive design
- **Object-Oriented Design**: Clean, maintainable code

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with Canvas support

### File Structure
```
molecule-synthesis-visualizer/
├── index.html           # Main HTML structure
├── styles.css           # All styling
├── molecule-engine.js   # Core drawing engine and chemistry logic
├── app.js              # Application logic and UI handlers
├── package.json        # Project metadata
└── README.md           # This file
```

## Key Classes

### Atom
Represents a chemical atom with position, element type, bonds, and charge.

### Bond
Represents chemical bonds between atoms (single, double, triple, wedge, dash).

### ReactionArrow
Represents reaction arrows with associated reagents and conditions.

### MoleculeEngine
Main engine handling canvas rendering, user interactions, and molecule management.

## Future Enhancements

Potential features for future versions:
- 3D molecule visualization
- SMILES notation import/export
- Reaction mechanism animations
- More complex functional groups
- Stereochemistry indicators
- Resonance structure display
- Molecular orbital diagrams
- Integration with chemistry databases

## License

MIT License - Feel free to use and modify for educational or commercial purposes.

## Contributing

Contributions are welcome! Areas for improvement:
- Additional molecule templates
- More reaction types
- Better stereochemistry handling
- Performance optimizations
- Mobile touch support

## Credits

Created with ❤️ for chemistry students and researchers.

---

**Happy molecule drawing! 🧪✨**
