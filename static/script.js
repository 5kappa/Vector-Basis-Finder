generateInputs();

function generateInputs() {
    const m = parseInt(document.getElementById('vectorCount').value);
    const n = parseInt(document.getElementById('dimCount').value);
    const container = document.getElementById('vector-container');

    container.innerHTML = '';

    for (let i = 1; i <= m; i++) {
        const wrapper = document.createElement('div');
        wrapper.className = 'vector-wrapper-input';

        const label = document.createElement('span');
        label.className = 'vector-label';
        label.innerHTML = `<span class="math-var">v</span><sub>${i}</sub>`;
        wrapper.appendChild(label);

        const colDiv = document.createElement('div');
        colDiv.className = 'vector-column';

        for (let j = 0; j < n; j++) {
            const input = document.createElement('input');
            input.type = "text";
            input.className = "cell-input";
            input.placeholder = "0";
            input.id = `vec-${i}-${j}`;

            input.addEventListener('focus', function () { this.select(); });

            input.addEventListener('keydown', function (e) {
                handleNavigation(e, i, j, m, n);
            });

            colDiv.appendChild(input);
        }

        wrapper.appendChild(colDiv);
        container.appendChild(wrapper);
    }
}

function handleNavigation(e, currentVec, currentRow, maxVec, maxDim) {
    let targetId = null;

    if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentRow < maxDim - 1) {
            targetId = `vec-${currentVec}-${currentRow + 1}`;
        } else {
            if (currentVec < maxVec) {
                targetId = `vec-${currentVec + 1}-0`;
            }
        }
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentRow > 0) {
            targetId = `vec-${currentVec}-${currentRow - 1}`;
        } else {
            if (currentVec > 1) {
                targetId = `vec-${currentVec - 1}-${maxDim - 1}`;
            }
        }
    }
    else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentVec < maxVec) {
            targetId = `vec-${currentVec + 1}-${currentRow}`;
        }
    }
    else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentVec > 1) {
            targetId = `vec-${currentVec - 1}-${currentRow}`;
        }
    }

    if (targetId) {
        const target = document.getElementById(targetId);
        if (target) target.focus();
    }
}

async function calculateBasis() {
    const m = parseInt(document.getElementById('vectorCount').value);
    const n = parseInt(document.getElementById('dimCount').value);
    const resultsArea = document.getElementById('results-area');
    const errorBox = document.getElementById('error-box');

    resultsArea.style.display = 'none';
    errorBox.style.display = 'none';

    let combinedText = "";

    for (let i = 1; i <= m; i++) {
        let vectorString = "";
        for (let j = 0; j < n; j++) {
            let val = document.getElementById(`vec-${i}-${j}`).value.trim();
            if (val === "") val = "0";
            vectorString += val + " ";
        }
        combinedText += vectorString.trim() + "\n";
    }

    const btn = document.getElementById('calc-btn');
    const originalText = btn.innerText;

    try {
        // Loading State
        btn.disabled = true;
        btn.innerText = "Calculating...";
        btn.style.opacity = "0.7";
        btn.style.cursor = "not-allowed";
        
        const response = await fetch('/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vectors_text: combinedText, input_mode: 'rows' })
        });

        const data = await response.json();

        if (data.status === 'success') {
            resultsArea.style.display = 'block';

            // Update Dimension
            document.getElementById('dimension-result').innerText = data.basis.subset.length;

            renderVectors(data.basis.subset, 'subset-container');
            renderVectors(data.basis.reduced, 'reduced-container');
        } else {
            errorBox.innerHTML = "<strong>Error:</strong> " + data.message;
            errorBox.style.display = 'block';
        }
    } catch (error) {
        console.error("Error:", error);
        errorBox.innerText = "An error occurred connecting to the server.";
        errorBox.style.display = 'block';
    } finally {
        // Restore Button State
        btn.disabled = false;
        btn.innerText = originalText;
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
    }
}

function renderVectors(vectorList, containerId) {
    const container = document.getElementById(containerId);
    if (vectorList.length === 0) {
        container.innerHTML = "<em>Zero vector space (No basis).</em>";
        return;
    }
    let html = "";
    vectorList.forEach(vec => {
        html += `<div class='vector-wrapper'>`;
        vec.forEach(num => {
            if (Object.is(num, -0)) num = 0;
            const displayNum = Number.isInteger(num) ? num : num.toFixed(2);
            html += `<span class='vector-num'>${displayNum}</span>`;
        });
        html += `</div>`;
    });
    container.innerHTML = html;
}

function randomizeInputs() {
    const m = parseInt(document.getElementById('vectorCount').value);
    const n = parseInt(document.getElementById('dimCount').value);

    for (let i = 1; i <= m; i++) {
        for (let j = 0; j < n; j++) {
            const field = document.getElementById(`vec-${i}-${j}`);
            if (field) {
                const rand = Math.floor(Math.random() * 19) - 9;
                field.value = rand;
            }
        }
    }
}

function resetInputs() {
    const m = parseInt(document.getElementById('vectorCount').value);
    const n = parseInt(document.getElementById('dimCount').value);

    for (let i = 1; i <= m; i++) {
        for (let j = 0; j < n; j++) {
            const field = document.getElementById(`vec-${i}-${j}`);
            if (field) {
                field.value = "";
            }
        }
    }

    document.getElementById('results-area').style.display = 'none';
    document.getElementById('error-box').style.display = 'none';
}
