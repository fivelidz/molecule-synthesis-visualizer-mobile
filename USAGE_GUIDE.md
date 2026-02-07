# 📚 Molecule Synthesis Visualizer - Complete Usage Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Drawing Your First Molecule](#drawing-your-first-molecule)
3. [Advanced Drawing Techniques](#advanced-drawing-techniques)
4. [Working with Functional Groups](#working-with-functional-groups)
5. [Creating Reaction Mechanisms](#creating-reaction-mechanisms)
6. [Building Synthesis Pathways](#building-synthesis-pathways)
7. [Tips and Tricks](#tips-and-tricks)
8. [Common Workflows](#common-workflows)

---

## Getting Started

### Opening the Application
1. **Option 1**: Double-click `index.html` to open in your default browser
2. **Option 2**: Run the start script:
   ```bash
   ./start.sh
   ```
3. **Option 3**: Start a Python server:
   ```bash
   python -m http.server 8000
   ```
   Then visit: http://localhost:8000

### Interface Overview
- **Left Sidebar**: Drawing tools, atoms, functional groups, and actions
- **Center Canvas**: Main drawing area with grid
- **Right Sidebar**: Synthesis pathway, templates, and molecular properties
- **Bottom Panel**: Reaction mechanism controls

---

## Drawing Your First Molecule

### Example: Drawing Ethanol (CH₃CH₂OH)

1. **Select the Atom Tool**
   - Click the "⚛️ Atom" button in the left sidebar

2. **Draw the Carbon Chain**
   - Click on the canvas to place the first carbon (C1)
   - Click about 40 pixels to the right to place the second carbon (C2)

3. **Create Bonds**
   - Click the "➖ Single Bond" tool
   - Click on C1, then click on C2 to create a bond

4. **Add the Hydroxyl Group (-OH)**
   - Select the Atom tool again
   - Make sure "O" is selected in the atom palette
   - Click to the right of C2 to add oxygen
   - Select "H" from the atom palette
   - Click to the right of the oxygen to add hydrogen
   - Use the Single Bond tool to connect O to C2 and H to O

5. **Alternative: Use Functional Group**
   - Select the Select tool (👆)
   - Click on C2 to select it
   - Click the "-OH (Alcohol)" button in the Functional Groups panel

---

## Advanced Drawing Techniques

### Creating Rings

#### Method 1: Using the Ring Tool
1. Click "⬡ Ring" button
2. Enter the number of sides (e.g., 6 for cyclohexane)
3. The ring appears automatically in the center

#### Method 2: Using the Benzene Tool
1. Click "⬢ Benzene" button
2. A benzene ring with alternating double bonds appears instantly

### Creating Carbon Chains
1. Click "⛓️ Chain" button
2. Enter the chain length (e.g., 4 for butane)
3. A linear carbon chain appears

### Bond Types and Stereochemistry

#### Single Bonds (➖)
- Standard covalent bond
- Used for σ bonds

#### Double Bonds (═)
- Two parallel lines
- Used for C=C, C=O, etc.

#### Triple Bonds (≡)
- Three parallel lines
- Used for C≡C, C≡N, etc.

#### Wedge Bonds (🔺)
- Solid wedge
- Indicates bond coming OUT of the plane (towards you)
- Used for showing 3D stereochemistry

#### Dash Bonds (⋯)
- Dashed line
- Indicates bond going INTO the plane (away from you)
- Used for showing 3D stereochemistry

### Example: Drawing (R)-2-butanol with Stereochemistry
1. Draw a 4-carbon chain
2. Click on C2 to select it
3. Click "-OH (Alcohol)" to add hydroxyl group
4. Select the Wedge tool
5. Add an H atom with a wedge bond (coming out)
6. Select the Dash tool
7. Add a CH₃ group with a dash bond (going in)

---

## Working with Functional Groups

### Available Functional Groups

| Group | Formula | Common Use |
|-------|---------|------------|
| Alcohol | -OH | Alcohols, phenols |
| Aldehyde | -CHO | Aldehydes |
| Carboxylic Acid | -COOH | Carboxylic acids |
| Amine | -NH₂ | Primary amines |
| Nitro | -NO₂ | Nitro compounds |
| Methyl | -CH₃ | Alkyl substituents |
| Ketone | C=O | Ketones |
| Acyl Chloride | -COCl | Acyl chlorides |

### Adding Functional Groups
1. **Select the base atom**
   - Use the Select tool (👆)
   - Click on the atom where you want to attach the group

2. **Click the functional group button**
   - The group will be automatically attached

3. **Adjust position if needed**
   - Drag atoms to reposition them
   - The bonds will follow automatically

### Creating Custom Functional Groups
If you need a group not in the list:
1. Draw it manually using atoms and bonds
2. Attach it to your main molecule
3. Save your work for future use

---

## Creating Reaction Mechanisms

### Predefined Reactions

#### SN2 Substitution
```
R-X + Nu⁻ → R-Nu + X⁻
```
1. Draw your substrate (R-X)
2. Click "SN2 Substitution"
3. Arrow appears with reagents: NaOH, H₂O, heat

#### E2 Elimination
```
R-CH₂-CH₂-X + Base → R-CH=CH₂ + HX
```
1. Draw your alkyl halide
2. Click "E2 Elimination"
3. Arrow appears with reagents: KOH, EtOH, Δ

#### Addition Reaction
```
R-CH=CH₂ + H₂ → R-CH₂-CH₃
```
1. Draw your alkene
2. Click "Addition"
3. Arrow appears with reagents: H₂, Pt catalyst

#### Oxidation
```
R-CH₂-OH → R-CHO
```
1. Draw your alcohol
2. Click "Oxidation"
3. Arrow appears with reagents: KMnO₄, H⁺

#### Reduction
```
R-CHO → R-CH₂-OH
```
1. Draw your aldehyde/ketone
2. Click "Reduction"
3. Arrow appears with reagents: LiAlH₄, THF

### Custom Reactions
1. Click "Custom Arrow"
2. An arrow appears on the canvas
3. Enter your reagents in the text box
4. Click "Add Reagent" to add them above the arrow

### Multi-Step Mechanism
1. Draw your starting material on the left
2. Add a reaction arrow
3. Draw your intermediate in the middle
4. Add another reaction arrow
5. Draw your final product on the right

---

## Building Synthesis Pathways

### Creating a Multi-Step Synthesis

#### Example: Synthesis of Aspirin

**Step 1: Draw Salicylic Acid**
1. Use the Benzene template
2. Add -COOH at position 1
3. Add -OH at position 2
4. Click "➕ Add Step"

**Step 2: Add Reaction Conditions**
1. Enter "Acetic Anhydride, H₂SO₄" in reagent box
2. Click "Add Reagent"
3. Add reaction arrow

**Step 3: Draw Aspirin**
1. Draw benzene ring
2. Add -COOH at position 1
3. Add -OCOCH₃ at position 2
4. Click "➕ Add Step"

### Managing Synthesis Steps

#### Viewing Steps
- All steps appear in the right sidebar
- Each step shows:
  - Step number
  - Molecular formula
  - Reaction conditions
  - Timestamp

#### Loading a Previous Step
1. Click "Load" button on any step
2. That molecule loads onto the canvas
3. Continue editing from that point

#### Deleting Steps
1. Click the "✕" button on a step
2. Confirm deletion
3. Step is removed from pathway

#### Saving Your Pathway
1. Click "💾 Save Pathway"
2. A JSON file downloads
3. File contains all steps and conditions

#### Loading a Saved Pathway
1. Click "📂 Load Pathway"
2. Select your JSON file
3. All steps load into the sidebar

---

## Tips and Tricks

### Keyboard Shortcuts
- **Ctrl+Z**: Undo last action
- **Ctrl+Y**: Redo
- **Ctrl+S**: Export as PNG image
- **Delete**: Remove selected atom
- **Backspace**: Remove selected atom

### Selection and Editing
- **Single click**: Select an atom (with Select tool)
- **Double click**: Change atom element (prompts for new element)
- **Click and drag**: Move selected atom
- **All connected bonds move with the atom**

### Quick Drawing Tips
1. **Use templates** for common structures instead of drawing from scratch
2. **Draw carbon skeleton first**, then add heteroatoms
3. **Use functional group buttons** to save time
4. **Keep molecules centered** for better organization
5. **Use the grid** for alignment (visible in background)

### Working Efficiently
1. **Plan your synthesis** before drawing
2. **Use Chain/Ring tools** for quick structures
3. **Copy structures** by loading from pathway steps
4. **Save frequently** when working on complex syntheses
5. **Export images** for documentation or presentations

### Common Patterns

#### Drawing an Ester
1. Draw carbon chain
2. Add -COOH to one end (carboxylic acid)
3. Select the H in -COOH
4. Replace with carbon chain (creates ester)

Or use shortcut:
1. Draw C-C bond
2. Add O with double bond to second C (C=O)
3. Add O with single bond to second C
4. Add C to the single-bonded O

#### Drawing an Amide
1. Draw carbon chain
2. Add C=O to desired position
3. Add -NH₂ to the carbonyl carbon

#### Drawing Peptides
1. Draw first amino acid
2. Add peptide bond (C=O-NH)
3. Draw second amino acid
4. Repeat for longer chains

---

## Common Workflows

### Workflow 1: Drawing a New Molecule from Scratch
1. Click "🗑️ Clear" to start fresh
2. Select Chain or Ring tool for basic skeleton
3. Add heteroatoms (O, N, S, etc.)
4. Create bonds between atoms
5. Add functional groups
6. Verify formula in properties panel
7. Export as PNG if needed

### Workflow 2: Modifying a Template
1. Click a template (e.g., "Benzene")
2. Template loads on canvas
3. Select atoms to add groups
4. Add functional groups
5. Adjust bond types if needed
6. Add to synthesis pathway

### Workflow 3: Creating a Reaction Mechanism
1. Draw reactant molecule
2. Position it on left side of canvas
3. Click appropriate reaction button
4. Arrow appears with reagents
5. Draw product molecule on right
6. Add curved arrows manually if showing mechanism details

### Workflow 4: Building a Complete Synthesis
1. Start with simplest available starting material
2. Draw it and add to pathway ("Add Step")
3. Add reaction conditions in text box
4. Draw intermediate product
5. Add to pathway
6. Repeat until reaching target molecule
7. Save pathway as JSON
8. Export key steps as PNG images

### Workflow 5: Recreating a Literature Synthesis
1. Start with starting material from paper
2. Follow each step in order
3. Add exact reagent conditions from paper
4. Draw each intermediate
5. Verify molecular formulas match
6. Save complete pathway
7. Use as reference for lab work

---

## Troubleshooting

### Problem: Atoms won't connect
**Solution**: Make sure you're using a Bond tool, not the Atom tool

### Problem: Can't select atoms
**Solution**: Switch to the Select tool (👆)

### Problem: Wrong element placed
**Solution**: Double-click the atom and type the correct element symbol

### Problem: Molecule looks messy
**Solution**: 
- Use the grid for alignment
- Drag atoms to better positions
- Recreate using templates for symmetric structures

### Problem: Can't add functional group
**Solution**: First select an atom with the Select tool, then click the functional group button

### Problem: Reaction arrow won't appear
**Solution**: Make sure you're clicking the reaction button, not just hovering

### Problem: Pathway step is wrong
**Solution**: Click the ✕ to delete it, then redraw and add again

---

## Advanced Features

### Molecular Formula Calculation
- Automatically updates as you draw
- Shows in bottom right and properties panel
- Hill notation order (C, H, then alphabetical)

### Molecular Weight Calculation
- Real-time calculation
- Uses standard atomic weights
- Shown in properties panel

### Canvas Grid
- 30-pixel spacing
- Helps with alignment
- Printed in background

### Auto-save Feature
- Undo/redo history maintained
- Can step back through changes
- Limited to current session

---

## Best Practices

### For Students
1. Practice drawing common structures from templates
2. Learn to draw mechanisms step-by-step
3. Use the pathway feature to track homework problems
4. Export images for reports and presentations
5. Save pathways for exam review

### For Researchers
1. Document synthesis routes as you plan them
2. Save pathways with detailed conditions
3. Export for lab notebooks and papers
4. Use templates for common protecting groups
5. Build a library of saved pathways

### For Educators
1. Create example molecules for demonstrations
2. Build step-by-step mechanisms for teaching
3. Export images for slides and worksheets
4. Save pathway files for student reference
5. Use templates to quickly draw quiz questions

---

## Next Steps

Now that you know how to use the Molecule Synthesis Visualizer:

1. **Practice** with the templates
2. **Try drawing** your favorite molecules
3. **Create** a simple synthesis pathway
4. **Export** and share your work
5. **Experiment** with all the tools

**Happy molecule drawing! 🧪✨**
