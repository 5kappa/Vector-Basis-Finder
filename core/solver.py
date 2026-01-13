import sympy

def determine_basis(vectors):
    """
    Calculates both the Subset Basis (Original columns) 
    and the Reduced Basis (RREF/Identity style).
    """
    if not vectors:
        return {'subset': [], 'reduced': []}

    # --- LOGIC A: Subset Basis (Select from originals) ---
    # Vectors as Columns
    col_matrix = sympy.Matrix(vectors).T
    subset_sympy = col_matrix.columnspace()
    
    subset_result = []
    for vec in subset_sympy:
        subset_result.append([float(x) for x in vec])

    # --- LOGIC B: Reduced Basis (Simplest form) ---
    # Vectors as Rows -> RREF
    row_matrix = sympy.Matrix(vectors)
    rref_matrix, _ = row_matrix.rref()
    
    reduced_result = []
    for row in rref_matrix.tolist():
        # Filter out rows that are purely zero
        if any(abs(val) > 1e-10 for val in row): # Check for non-zero (with tolerance)
            reduced_result.append([float(x) for x in row])

    return {
        'subset': subset_result,
        'reduced': reduced_result
    }