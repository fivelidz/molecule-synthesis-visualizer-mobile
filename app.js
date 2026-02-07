// Main Application Logic

let engine;
let synthesisPipeline = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('molecule-canvas');
    engine = new MoleculeEngine(canvas);
    
    setupToolButtons();
    setupAtomButtons();
    setupFunctionalGroups();
    setupActionButtons();
    setupReactionButtons();
    setupTemplates();
    setupSynthesisPathway();
});

// Tool Selection
function setupToolButtons() {
    const toolButtons = document.querySelectorAll('.tool-btn');
    
    toolButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            toolButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            engine.currentTool = btn.dataset.tool;
            
            // Special handling for certain tools
            if (btn.dataset.tool === 'chain') {
                const length = parseInt(prompt('Enter chain length (number of carbons):', '4'));
                if (length && length > 0) {
                    engine.createChain(300, 300, length, 0);
                }
            } else if (btn.dataset.tool === 'ring') {
                const sides = parseInt(prompt('Enter number of sides:', '6'));
                if (sides && sides >= 3) {
                    engine.createRing(400, 300, sides, 50);
                }
            } else if (btn.dataset.tool === 'benzene') {
                engine.createBenzene(400, 300, 50);
                engine.currentTool = 'select';
                toolButtons[0].classList.add('active');
                btn.classList.remove('active');
            }
        });
    });
}

// Atom Palette
function setupAtomButtons() {
    const atomButtons = document.querySelectorAll('.atom-btn');
    
    atomButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            atomButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            engine.currentElement = btn.dataset.atom;
            engine.currentTool = 'atom';
            
            // Update tool selection
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            document.querySelector('[data-tool="atom"]').classList.add('active');
        });
    });
}

// Functional Groups
function setupFunctionalGroups() {
    const functionalGroups = {
        'OH': [
            { element: 'O', offset: { x: 30, y: 0 } },
            { element: 'H', offset: { x: 50, y: 0 } }
        ],
        'CHO': [
            { element: 'C', offset: { x: 30, y: 0 } },
            { element: 'H', offset: { x: 50, y: -20 } },
            { element: 'O', offset: { x: 50, y: 20 }, bondType: 'double' }
        ],
        'COOH': [
            { element: 'C', offset: { x: 30, y: 0 } },
            { element: 'O', offset: { x: 50, y: -20 }, bondType: 'double' },
            { element: 'O', offset: { x: 50, y: 20 } },
            { element: 'H', offset: { x: 70, y: 20 } }
        ],
        'NH2': [
            { element: 'N', offset: { x: 30, y: 0 } },
            { element: 'H', offset: { x: 50, y: -15 } },
            { element: 'H', offset: { x: 50, y: 15 } }
        ],
        'NO2': [
            { element: 'N', offset: { x: 30, y: 0 } },
            { element: 'O', offset: { x: 50, y: -20 }, bondType: 'double' },
            { element: 'O', offset: { x: 50, y: 20 } }
        ],
        'CH3': [
            { element: 'C', offset: { x: 30, y: 0 } },
            { element: 'H', offset: { x: 50, y: -20 } },
            { element: 'H', offset: { x: 50, y: 0 } },
            { element: 'H', offset: { x: 50, y: 20 } }
        ],
        'CO': [
            { element: 'C', offset: { x: 30, y: 0 } },
            { element: 'O', offset: { x: 50, y: 0 }, bondType: 'double' }
        ],
        'COCl': [
            { element: 'C', offset: { x: 30, y: 0 } },
            { element: 'O', offset: { x: 50, y: -20 }, bondType: 'double' },
            { element: 'Cl', offset: { x: 50, y: 20 } }
        ]
    };

    const fgButtons = document.querySelectorAll('.fg-btn');
    
    fgButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const group = btn.dataset.group;
            const structure = functionalGroups[group];
            
            if (engine.selectedAtom && structure) {
                addFunctionalGroup(engine.selectedAtom, structure);
                engine.saveState();
                engine.draw();
            } else {
                alert('Please select an atom first by clicking on it with the Select tool.');
            }
        });
    });
}

function addFunctionalGroup(baseAtom, structure) {
    const atoms = [baseAtom];
    
    structure.forEach(atomDef => {
        const newAtom = engine.addAtom(
            baseAtom.x + atomDef.offset.x,
            baseAtom.y + atomDef.offset.y,
            atomDef.element
        );
        atoms.push(newAtom);
        
        const bondType = atomDef.bondType || 'single';
        engine.addBond(baseAtom, newAtom, bondType);
    });
}

// Action Buttons
function setupActionButtons() {
    document.getElementById('clear-canvas').addEventListener('click', () => {
        if (confirm('Clear the entire canvas?')) {
            engine.clear();
        }
    });

    document.getElementById('undo').addEventListener('click', () => {
        engine.undo();
    });

    document.getElementById('redo').addEventListener('click', () => {
        engine.redo();
    });

    document.getElementById('export-png').addEventListener('click', () => {
        engine.exportPNG();
    });
}

// Reaction Mechanisms
function setupReactionButtons() {
    const reactionButtons = document.querySelectorAll('.reaction-btn');
    
    reactionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const reactionType = btn.dataset.reaction;
            
            if (reactionType === 'custom') {
                addCustomReactionArrow();
            } else {
                addPredefinedReaction(reactionType);
            }
        });
    });

    document.getElementById('add-reagent').addEventListener('click', () => {
        const reagent = document.getElementById('reagent-input').value.trim();
        if (reagent && engine.arrows.length > 0) {
            const lastArrow = engine.arrows[engine.arrows.length - 1];
            lastArrow.reagents.push(reagent);
            engine.draw();
            document.getElementById('reagent-input').value = '';
        } else if (reagent) {
            alert('Please add a reaction arrow first.');
        }
    });
}

function addCustomReactionArrow() {
    const width = engine.canvas.width;
    const height = engine.canvas.height;
    
    // Add arrow in the middle of the canvas
    const x1 = width / 2 - 100;
    const y1 = height / 2;
    const x2 = width / 2 + 100;
    const y2 = height / 2;
    
    const reagent = document.getElementById('reagent-input').value.trim();
    const reagents = reagent ? [reagent] : [];
    
    engine.addArrow(x1, y1, x2, y2, reagents);
    
    if (reagent) {
        document.getElementById('reagent-input').value = '';
    }
}

function addPredefinedReaction(type) {
    const reactions = {
        'substitution': ['NaOH', 'H₂O', 'heat'],
        'elimination': ['KOH', 'EtOH', 'Δ'],
        'addition': ['H₂', 'Pt catalyst'],
        'oxidation': ['KMnO₄', 'H⁺'],
        'reduction': ['LiAlH₄', 'THF']
    };

    const reagents = reactions[type] || [];
    const width = engine.canvas.width;
    const height = engine.canvas.height;
    
    const x1 = width / 2 - 100;
    const y1 = height / 2;
    const x2 = width / 2 + 100;
    const y2 = height / 2;
    
    engine.addArrow(x1, y1, x2, y2, reagents);
}

// Molecule Templates
function setupTemplates() {
    const templates = {
        'ethanol': () => {
            engine.clear();
            const c1 = engine.addAtom(300, 300, 'C');
            const c2 = engine.addAtom(340, 300, 'C');
            const o = engine.addAtom(380, 300, 'O');
            const h = engine.addAtom(410, 300, 'H');
            
            engine.addBond(c1, c2);
            engine.addBond(c2, o);
            engine.addBond(o, h);
            engine.saveState();
            engine.draw();
        },
        'acetone': () => {
            engine.clear();
            const c1 = engine.addAtom(280, 300, 'C');
            const c2 = engine.addAtom(320, 300, 'C');
            const c3 = engine.addAtom(360, 300, 'C');
            const o = engine.addAtom(320, 260, 'O');
            
            engine.addBond(c1, c2);
            engine.addBond(c2, c3);
            engine.addBond(c2, o, 'double');
            engine.saveState();
            engine.draw();
        },
        'benzene': () => {
            engine.clear();
            engine.createBenzene(350, 300, 60);
        },
        'glucose': () => {
            engine.clear();
            // Create a simplified glucose ring
            engine.createRing(350, 300, 6, 50);
            const atoms = engine.atoms;
            if (atoms.length >= 6) {
                atoms[0].element = 'O'; // One oxygen in the ring
            }
        },
        'aspirin': () => {
            engine.clear();
            // Create benzene ring
            engine.createBenzene(300, 300, 50);
            
            // Add carboxyl group
            const benzeneAtoms = [...engine.atoms];
            if (benzeneAtoms.length >= 6) {
                const c = engine.addAtom(benzeneAtoms[0].x + 60, benzeneAtoms[0].y, 'C');
                const o1 = engine.addAtom(c.x + 30, c.y - 20, 'O');
                const o2 = engine.addAtom(c.x + 30, c.y + 20, 'O');
                const h = engine.addAtom(o2.x + 25, o2.y, 'H');
                
                engine.addBond(benzeneAtoms[0], c);
                engine.addBond(c, o1, 'double');
                engine.addBond(c, o2);
                engine.addBond(o2, h);
            }
            engine.saveState();
            engine.draw();
        },
        'caffeine': () => {
            engine.clear();
            // Create two fused rings (simplified caffeine structure)
            engine.createRing(300, 300, 6, 50);
            const ring1 = [...engine.atoms];
            
            engine.createRing(380, 300, 5, 45);
            const ring2 = engine.atoms.slice(6);
            
            // Add some nitrogens
            if (ring1.length >= 3) ring1[1].element = 'N';
            if (ring1.length >= 5) ring1[3].element = 'N';
            if (ring2.length >= 2) ring2[0].element = 'N';
            
            engine.saveState();
            engine.draw();
        }
    };

    const templateButtons = document.querySelectorAll('.template-btn');
    
    templateButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const template = btn.dataset.template;
            if (templates[template]) {
                templates[template]();
            }
        });
    });
}

// Synthesis Pathway Management
function setupSynthesisPathway() {
    document.getElementById('add-step').addEventListener('click', addSynthesisStep);
    document.getElementById('save-pathway').addEventListener('click', savePathway);
    document.getElementById('load-pathway').addEventListener('click', loadPathway);
}

function addSynthesisStep() {
    const step = {
        id: Date.now(),
        molecule: {
            atoms: JSON.parse(JSON.stringify(engine.atoms.map(a => ({
                x: a.x, y: a.y, element: a.element, id: a.id
            })))),
            bonds: engine.bonds.map(b => ({
                atom1Id: b.atom1.id,
                atom2Id: b.atom2.id,
                type: b.type
            }))
        },
        formula: engine.calculateFormula(),
        conditions: document.getElementById('reagent-input').value || 'No conditions specified',
        timestamp: new Date().toLocaleString()
    };

    synthesisPipeline.push(step);
    renderSynthesisSteps();
}

function renderSynthesisSteps() {
    const container = document.getElementById('synthesis-steps');
    
    if (synthesisPipeline.length === 0) {
        container.innerHTML = '<p class="empty-state">No steps added yet. Draw molecules and add reactions to build your synthesis pathway.</p>';
        return;
    }

    container.innerHTML = synthesisPipeline.map((step, index) => `
        <div class="synthesis-step" data-step-id="${step.id}">
            <div class="step-header">
                <strong>Step ${index + 1}</strong>
                <button class="delete-step" data-step-id="${step.id}">✕</button>
            </div>
            <div class="step-content">
                <div class="step-formula">${step.formula}</div>
                <div class="step-conditions">${step.conditions}</div>
                <div class="step-timestamp">${step.timestamp}</div>
            </div>
            <div class="step-actions">
                <button class="load-step" data-step-id="${step.id}">Load</button>
            </div>
        </div>
    `).join('');

    // Add event listeners for step actions
    document.querySelectorAll('.delete-step').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const stepId = parseInt(e.target.dataset.stepId);
            synthesisPipeline = synthesisPipeline.filter(s => s.id !== stepId);
            renderSynthesisSteps();
        });
    });

    document.querySelectorAll('.load-step').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const stepId = parseInt(e.target.dataset.stepId);
            const step = synthesisPipeline.find(s => s.id === stepId);
            if (step) {
                loadMoleculeFromStep(step);
            }
        });
    });
}

function loadMoleculeFromStep(step) {
    engine.atoms = [];
    engine.bonds = [];
    
    // Recreate atoms
    step.molecule.atoms.forEach(atomData => {
        const atom = new Atom(atomData.x, atomData.y, atomData.element);
        atom.id = atomData.id;
        engine.atoms.push(atom);
    });

    // Recreate bonds
    step.molecule.bonds.forEach(bondData => {
        const atom1 = engine.atoms.find(a => a.id === bondData.atom1Id);
        const atom2 = engine.atoms.find(a => a.id === bondData.atom2Id);
        if (atom1 && atom2) {
            const bond = new Bond(atom1, atom2, bondData.type);
            engine.bonds.push(bond);
        }
    });

    engine.updateProperties();
    engine.draw();
}

function savePathway() {
    if (synthesisPipeline.length === 0) {
        alert('No synthesis steps to save!');
        return;
    }

    const data = JSON.stringify(synthesisPipeline, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'synthesis-pathway.json';
    link.click();
    URL.revokeObjectURL(url);
}

function loadPathway() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    synthesisPipeline = JSON.parse(event.target.result);
                    renderSynthesisSteps();
                    alert('Pathway loaded successfully!');
                } catch (error) {
                    alert('Error loading pathway: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    });
    
    input.click();
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
            case 'z':
                e.preventDefault();
                engine.undo();
                break;
            case 'y':
                e.preventDefault();
                engine.redo();
                break;
            case 's':
                e.preventDefault();
                engine.exportPNG();
                break;
        }
    }
    
    if (e.key === 'Delete' || e.key === 'Backspace') {
        if (engine.selectedAtom) {
            e.preventDefault();
            // Remove atom and its bonds
            engine.bonds = engine.bonds.filter(b => 
                b.atom1 !== engine.selectedAtom && b.atom2 !== engine.selectedAtom
            );
            engine.atoms = engine.atoms.filter(a => a !== engine.selectedAtom);
            engine.selectedAtom = null;
            engine.saveState();
            engine.updateProperties();
            engine.draw();
        }
    }
});
