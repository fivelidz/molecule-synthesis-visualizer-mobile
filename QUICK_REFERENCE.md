# 🧪 Quick Reference Card

## Start the App
```bash
./start.sh
# or
python -m http.server 8000
# Then visit: http://localhost:8000
```

## Keyboard Shortcuts
| Key | Action |
|-----|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Ctrl+S` | Export PNG |
| `Delete` | Remove selected atom |
| `Backspace` | Remove selected atom |

## Quick Drawing Workflow
1. **Select tool** → Click canvas
2. **Add atoms** → Click to place
3. **Create bonds** → Click atom1 → Click atom2
4. **Add groups** → Select atom → Click functional group
5. **Export** → Click "💾 Export PNG"

## Bond Types
- **—** Single (C-C)
- **═** Double (C=C)
- **≡** Triple (C≡C)
- **🔺** Wedge (3D out)
- **⋯** Dash (3D in)

## Common Atoms
`C` `H` `O` `N` `S` `P` `F` `Cl` `Br` `I`

## Functional Groups
| Button | Group | Use |
|--------|-------|-----|
| -OH | Hydroxyl | Alcohols |
| -CHO | Aldehyde | Aldehydes |
| -COOH | Carboxyl | Acids |
| -NH₂ | Amino | Amines |
| -NO₂ | Nitro | Nitro |
| -CH₃ | Methyl | Alkyl |
| C=O | Carbonyl | Ketones |
| -COCl | Acyl Cl | Acyl chlorides |

## Quick Structures
- **⛓️ Chain**: Linear carbon chain (enter length)
- **⬡ Ring**: Cyclic structure (enter sides)
- **⬢ Benzene**: Instant aromatic ring

## Templates
`Ethanol` `Acetone` `Benzene` `Glucose` `Aspirin` `Caffeine`

## Reactions
- **SN2**: NaOH, H₂O, heat
- **E2**: KOH, EtOH, Δ
- **Addition**: H₂, Pt catalyst
- **Oxidation**: KMnO₄, H⁺
- **Reduction**: LiAlH₄, THF
- **Custom**: Add your own reagents

## Synthesis Pathway
1. Draw molecule
2. Click "➕ Add Step"
3. Add reaction conditions
4. Draw next molecule
5. Repeat
6. Click "💾 Save Pathway" when done

## Editing Tips
- **Double-click atom** → Change element
- **Drag atom** → Move it
- **Select atom** → Add functional group
- **Delete key** → Remove atom

## Export Options
- **PNG**: For images/presentations
- **JSON**: For saving pathways
- **Print**: Ctrl+P for printing

## Properties Panel
Shows real-time:
- Molecular formula (Hill notation)
- Molecular weight (g/mol)
- Atom count
- Bond count

## Common Problems
| Problem | Solution |
|---------|----------|
| Can't connect atoms | Use Bond tool, not Atom tool |
| Can't select atom | Switch to Select tool (👆) |
| Wrong element | Double-click and type correct symbol |
| Can't add functional group | First select an atom |

## Pro Tips
✨ Use templates for complex structures  
✨ Draw skeleton first, add details later  
✨ Keep molecules centered on canvas  
✨ Use grid for alignment  
✨ Save pathways frequently  
✨ Export steps as you go  

## File Locations
- **Exported PNGs**: Downloads folder
- **Saved pathways**: Downloads folder (JSON)
- **Project files**: `molecule-synthesis-visualizer/`

## Documentation
- `README.md` - Overview and features
- `USAGE_GUIDE.md` - Complete tutorial
- `PROJECT_SUMMARY.md` - Technical details
- `QUICK_REFERENCE.md` - This file

## Support
- Check USAGE_GUIDE.md for detailed help
- All features are documented
- No external dependencies needed

---

**Quick Start Example:**
1. Click "⬢ Benzene" → Benzene ring appears
2. Click Select tool → Click any carbon
3. Click "-OH (Alcohol)" → Phenol created!
4. Click "💾 Export PNG" → Save image

**That's it! Happy drawing! 🧪✨**
