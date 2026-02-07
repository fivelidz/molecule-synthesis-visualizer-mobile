// Molecule Engine - Core drawing and chemistry logic

class Atom {
    constructor(x, y, element = 'C') {
        this.x = x;
        this.y = y;
        this.element = element;
        this.bonds = [];
        this.charge = 0;
        this.selected = false;
        this.id = Math.random().toString(36).substr(2, 9);
    }

    draw(ctx) {
        const radius = this.element === 'C' && this.bonds.length > 0 ? 3 : 15;
        
        // Draw selection circle
        if (this.selected) {
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius + 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw atom
        if (this.element !== 'C' || this.bonds.length === 0) {
            ctx.fillStyle = this.getAtomColor();
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw element symbol
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(this.element, this.x, this.y);
        } else {
            // Just draw a small dot for carbon in chains
            ctx.fillStyle = '#333';
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw charge if present
        if (this.charge !== 0) {
            ctx.fillStyle = '#ff0000';
            ctx.font = 'bold 10px Arial';
            const chargeText = this.charge > 0 ? `+${this.charge}` : `${this.charge}`;
            ctx.fillText(chargeText, this.x + 15, this.y - 15);
        }
    }

    getAtomColor() {
        const colors = {
            'C': '#333333',
            'H': '#ffffff',
            'O': '#ff0000',
            'N': '#0000ff',
            'S': '#ffff00',
            'P': '#ffa500',
            'F': '#00ff00',
            'Cl': '#00ff00',
            'Br': '#8b4513',
            'I': '#800080'
        };
        return colors[this.element] || '#cccccc';
    }

    distanceTo(x, y) {
        return Math.sqrt((this.x - x) ** 2 + (this.y - y) ** 2);
    }
}

class Bond {
    constructor(atom1, atom2, type = 'single') {
        this.atom1 = atom1;
        this.atom2 = atom2;
        this.type = type; // single, double, triple, wedge, dash
        this.id = Math.random().toString(36).substr(2, 9);
        
        atom1.bonds.push(this);
        atom2.bonds.push(this);
    }

    draw(ctx) {
        const dx = this.atom2.x - this.atom1.x;
        const dy = this.atom2.y - this.atom1.y;
        const angle = Math.atan2(dy, dx);
        const perpAngle = angle + Math.PI / 2;

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        switch (this.type) {
            case 'single':
                this.drawSingleBond(ctx);
                break;
            case 'double':
                this.drawDoubleBond(ctx, perpAngle);
                break;
            case 'triple':
                this.drawTripleBond(ctx, perpAngle);
                break;
            case 'wedge':
                this.drawWedgeBond(ctx, perpAngle);
                break;
            case 'dash':
                this.drawDashBond(ctx);
                break;
        }
    }

    drawSingleBond(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.atom1.x, this.atom1.y);
        ctx.lineTo(this.atom2.x, this.atom2.y);
        ctx.stroke();
    }

    drawDoubleBond(ctx, perpAngle) {
        const offset = 3;
        const dx = Math.cos(perpAngle) * offset;
        const dy = Math.sin(perpAngle) * offset;

        ctx.beginPath();
        ctx.moveTo(this.atom1.x + dx, this.atom1.y + dy);
        ctx.lineTo(this.atom2.x + dx, this.atom2.y + dy);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.atom1.x - dx, this.atom1.y - dy);
        ctx.lineTo(this.atom2.x - dx, this.atom2.y - dy);
        ctx.stroke();
    }

    drawTripleBond(ctx, perpAngle) {
        const offset = 4;
        const dx = Math.cos(perpAngle) * offset;
        const dy = Math.sin(perpAngle) * offset;

        // Center line
        this.drawSingleBond(ctx);

        // Side lines
        ctx.beginPath();
        ctx.moveTo(this.atom1.x + dx, this.atom1.y + dy);
        ctx.lineTo(this.atom2.x + dx, this.atom2.y + dy);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.atom1.x - dx, this.atom1.y - dy);
        ctx.lineTo(this.atom2.x - dx, this.atom2.y - dy);
        ctx.stroke();
    }

    drawWedgeBond(ctx, perpAngle) {
        const width = 8;
        const dx = Math.cos(perpAngle) * width;
        const dy = Math.sin(perpAngle) * width;

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(this.atom1.x, this.atom1.y);
        ctx.lineTo(this.atom2.x + dx, this.atom2.y + dy);
        ctx.lineTo(this.atom2.x - dx, this.atom2.y - dy);
        ctx.closePath();
        ctx.fill();
    }

    drawDashBond(ctx) {
        const segments = 8;
        const dx = (this.atom2.x - this.atom1.x) / segments;
        const dy = (this.atom2.y - this.atom1.y) / segments;

        for (let i = 0; i < segments; i += 2) {
            ctx.beginPath();
            ctx.moveTo(this.atom1.x + dx * i, this.atom1.y + dy * i);
            ctx.lineTo(this.atom1.x + dx * (i + 1), this.atom1.y + dy * (i + 1));
            ctx.stroke();
        }
    }
}

class ReactionArrow {
    constructor(x1, y1, x2, y2, reagents = []) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.reagents = reagents;
        this.id = Math.random().toString(36).substr(2, 9);
    }

    draw(ctx) {
        const dx = this.x2 - this.x1;
        const dy = this.y2 - this.y1;
        const angle = Math.atan2(dy, dx);

        // Draw main arrow line
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        // Draw arrowhead
        const headLength = 20;
        ctx.fillStyle = '#e74c3c';
        ctx.beginPath();
        ctx.moveTo(this.x2, this.y2);
        ctx.lineTo(
            this.x2 - headLength * Math.cos(angle - Math.PI / 6),
            this.y2 - headLength * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            this.x2 - headLength * Math.cos(angle + Math.PI / 6),
            this.y2 - headLength * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        // Draw reagents above arrow
        if (this.reagents.length > 0) {
            const midX = (this.x1 + this.x2) / 2;
            const midY = (this.y1 + this.y2) / 2 - 20;
            
            ctx.fillStyle = '#000';
            ctx.font = '14px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(this.reagents.join(', '), midX, midY);
        }
    }
}

class MoleculeEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.atoms = [];
        this.bonds = [];
        this.arrows = [];
        this.history = [];
        this.historyIndex = -1;
        this.selectedAtom = null;
        this.hoveredAtom = null;
        this.draggedAtom = null;
        this.currentTool = 'select';
        this.currentElement = 'C';
        this.bondStart = null;
        
        this.resize();
        this.setupEventListeners();
        this.draw();
    }

    resize() {
        const container = this.canvas.parentElement;
        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;
        this.draw();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('dblclick', this.handleDoubleClick.bind(this));
        window.addEventListener('resize', () => this.resize());
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedAtom = this.findAtomAt(x, y);

        if (this.currentTool === 'select') {
            if (clickedAtom) {
                this.draggedAtom = clickedAtom;
                this.selectAtom(clickedAtom);
            } else {
                this.clearSelection();
            }
        } else if (this.currentTool === 'atom') {
            if (!clickedAtom) {
                this.addAtom(x, y, this.currentElement);
                this.saveState();
            }
        } else if (this.currentTool.includes('bond') || this.currentTool === 'wedge' || this.currentTool === 'dash') {
            if (clickedAtom) {
                this.bondStart = clickedAtom;
            }
        }

        this.draw();
    }

    handleMouseMove(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Update cursor info
        const cursorInfo = document.getElementById('cursor-info');
        cursorInfo.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;

        // Handle dragging
        if (this.draggedAtom && this.currentTool === 'select') {
            this.draggedAtom.x = x;
            this.draggedAtom.y = y;
            this.draw();
        }

        // Handle hovering
        const hoveredAtom = this.findAtomAt(x, y);
        if (hoveredAtom !== this.hoveredAtom) {
            this.hoveredAtom = hoveredAtom;
            this.canvas.style.cursor = hoveredAtom ? 'pointer' : 'default';
        }
    }

    handleMouseUp(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedAtom = this.findAtomAt(x, y);

        // Handle bond creation
        if (this.bondStart && clickedAtom && clickedAtom !== this.bondStart) {
            const bondType = this.getBondTypeFromTool();
            this.addBond(this.bondStart, clickedAtom, bondType);
            this.saveState();
        }

        this.bondStart = null;
        this.draggedAtom = null;
        this.draw();
    }

    handleDoubleClick(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const clickedAtom = this.findAtomAt(x, y);
        if (clickedAtom) {
            const newElement = prompt('Enter element symbol:', clickedAtom.element);
            if (newElement) {
                clickedAtom.element = newElement.toUpperCase();
                this.saveState();
                this.draw();
            }
        }
    }

    getBondTypeFromTool() {
        if (this.currentTool === 'bond') return 'single';
        if (this.currentTool === 'double-bond') return 'double';
        if (this.currentTool === 'triple-bond') return 'triple';
        if (this.currentTool === 'wedge') return 'wedge';
        if (this.currentTool === 'dash') return 'dash';
        return 'single';
    }

    findAtomAt(x, y, threshold = 20) {
        for (let atom of this.atoms) {
            if (atom.distanceTo(x, y) < threshold) {
                return atom;
            }
        }
        return null;
    }

    addAtom(x, y, element = 'C') {
        const atom = new Atom(x, y, element);
        this.atoms.push(atom);
        this.updateProperties();
        return atom;
    }

    addBond(atom1, atom2, type = 'single') {
        // Check if bond already exists
        const existingBond = this.bonds.find(b => 
            (b.atom1 === atom1 && b.atom2 === atom2) ||
            (b.atom1 === atom2 && b.atom2 === atom1)
        );

        if (!existingBond) {
            const bond = new Bond(atom1, atom2, type);
            this.bonds.push(bond);
            this.updateProperties();
        }
    }

    addArrow(x1, y1, x2, y2, reagents = []) {
        const arrow = new ReactionArrow(x1, y1, x2, y2, reagents);
        this.arrows.push(arrow);
        this.draw();
    }

    selectAtom(atom) {
        this.clearSelection();
        atom.selected = true;
        this.selectedAtom = atom;
    }

    clearSelection() {
        this.atoms.forEach(atom => atom.selected = false);
        this.selectedAtom = null;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw grid
        this.drawGrid();

        // Draw bonds first (so they appear behind atoms)
        this.bonds.forEach(bond => bond.draw(this.ctx));

        // Draw reaction arrows
        this.arrows.forEach(arrow => arrow.draw(this.ctx));

        // Draw atoms
        this.atoms.forEach(atom => atom.draw(this.ctx));

        // Draw bond preview
        if (this.bondStart) {
            this.ctx.strokeStyle = '#999';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(this.bondStart.x, this.bondStart.y);
            const rect = this.canvas.getBoundingClientRect();
            // This won't work perfectly but gives the idea
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }
    }

    drawGrid() {
        const gridSize = 30;
        this.ctx.strokeStyle = '#f0f0f0';
        this.ctx.lineWidth = 0.5;

        for (let x = 0; x < this.canvas.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }

        for (let y = 0; y < this.canvas.height; y += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
    }

    createChain(startX, startY, length = 4, angle = 0) {
        const bondLength = 40;
        const atoms = [];
        
        for (let i = 0; i < length; i++) {
            const x = startX + i * bondLength * Math.cos(angle);
            const y = startY + i * bondLength * Math.sin(angle);
            atoms.push(this.addAtom(x, y, 'C'));
        }

        for (let i = 0; i < atoms.length - 1; i++) {
            this.addBond(atoms[i], atoms[i + 1]);
        }

        this.saveState();
        this.draw();
    }

    createRing(centerX, centerY, sides = 6, radius = 50) {
        const atoms = [];
        const angleStep = (Math.PI * 2) / sides;
        
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            atoms.push(this.addAtom(x, y, 'C'));
        }

        for (let i = 0; i < atoms.length; i++) {
            const nextIndex = (i + 1) % atoms.length;
            this.addBond(atoms[i], atoms[nextIndex]);
        }

        this.saveState();
        this.draw();
    }

    createBenzene(centerX, centerY, radius = 50) {
        const atoms = [];
        const sides = 6;
        const angleStep = (Math.PI * 2) / sides;
        
        for (let i = 0; i < sides; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            atoms.push(this.addAtom(x, y, 'C'));
        }

        for (let i = 0; i < atoms.length; i++) {
            const nextIndex = (i + 1) % atoms.length;
            const bondType = i % 2 === 0 ? 'double' : 'single';
            this.addBond(atoms[i], atoms[nextIndex], bondType);
        }

        this.saveState();
        this.draw();
    }

    updateProperties() {
        const formula = this.calculateFormula();
        const weight = this.calculateMolecularWeight();

        document.getElementById('prop-formula').textContent = formula;
        document.getElementById('prop-weight').textContent = weight.toFixed(2) + ' g/mol';
        document.getElementById('prop-atoms').textContent = this.atoms.length;
        document.getElementById('prop-bonds').textContent = this.bonds.length;
        document.getElementById('molecule-formula').textContent = formula;
    }

    calculateFormula() {
        const elementCounts = {};
        
        this.atoms.forEach(atom => {
            elementCounts[atom.element] = (elementCounts[atom.element] || 0) + 1;
        });

        let formula = '';
        const order = ['C', 'H', 'O', 'N', 'S', 'P', 'F', 'Cl', 'Br', 'I'];
        
        order.forEach(element => {
            if (elementCounts[element]) {
                formula += element;
                if (elementCounts[element] > 1) {
                    formula += elementCounts[element];
                }
                delete elementCounts[element];
            }
        });

        // Add remaining elements
        Object.keys(elementCounts).forEach(element => {
            formula += element;
            if (elementCounts[element] > 1) {
                formula += elementCounts[element];
            }
        });

        return formula || 'Empty';
    }

    calculateMolecularWeight() {
        const atomicWeights = {
            'C': 12.01, 'H': 1.008, 'O': 16.00, 'N': 14.01,
            'S': 32.07, 'P': 30.97, 'F': 19.00, 'Cl': 35.45,
            'Br': 79.90, 'I': 126.90
        };

        let weight = 0;
        this.atoms.forEach(atom => {
            weight += atomicWeights[atom.element] || 0;
        });

        return weight;
    }

    clear() {
        this.atoms = [];
        this.bonds = [];
        this.arrows = [];
        this.selectedAtom = null;
        this.bondStart = null;
        this.saveState();
        this.updateProperties();
        this.draw();
    }

    saveState() {
        const state = {
            atoms: JSON.parse(JSON.stringify(this.atoms.map(a => ({
                x: a.x, y: a.y, element: a.element, id: a.id, charge: a.charge
            })))),
            bonds: this.bonds.map(b => ({
                atom1Id: b.atom1.id,
                atom2Id: b.atom2.id,
                type: b.type
            }))
        };

        this.history = this.history.slice(0, this.historyIndex + 1);
        this.history.push(state);
        this.historyIndex++;
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.loadState(this.history[this.historyIndex]);
        }
    }

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.loadState(this.history[this.historyIndex]);
        }
    }

    loadState(state) {
        this.atoms = [];
        this.bonds = [];
        
        // Recreate atoms
        state.atoms.forEach(atomData => {
            const atom = new Atom(atomData.x, atomData.y, atomData.element);
            atom.id = atomData.id;
            atom.charge = atomData.charge;
            this.atoms.push(atom);
        });

        // Recreate bonds
        state.bonds.forEach(bondData => {
            const atom1 = this.atoms.find(a => a.id === bondData.atom1Id);
            const atom2 = this.atoms.find(a => a.id === bondData.atom2Id);
            if (atom1 && atom2) {
                new Bond(atom1, atom2, bondData.type);
            }
        });

        this.updateProperties();
        this.draw();
    }

    exportPNG() {
        const link = document.createElement('a');
        link.download = 'molecule.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }
}
