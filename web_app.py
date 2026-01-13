from flask import Flask, render_template, request, jsonify
from core.solver import determine_basis

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.json
        raw_text = data.get('vectors_text', '')
        input_mode = data.get('input_mode', 'columns') # Default to columns

        # 1. Parse lines into a 2D list of numbers
        # Example Input:
        # "1 2"
        # "3 4"
        # Becomes: [[1.0, 2.0], [3.0, 4.0]]
        parsed_rows = []
        lines = raw_text.strip().split('\n')
        for line in lines:
            if not line.strip(): continue
            vec = [float(x) for x in line.replace(',', ' ').split()]
            parsed_rows.append(vec)

        if not parsed_rows:
            return jsonify({'status': 'error', 'message': 'No data entered.'})

        # 2. Handle Input Mode
        vectors_to_process = []
        
        if input_mode == 'columns':
            # "Matrix Mode" - The user typed the matrix.
            # The columns of this input are the vectors.
            # We need to TRANSPOSE this 2D list so that each "row" becomes a "vector" 
            # for our solver to read.
            # Python Trick: list(zip(*list)) transposes a 2D list
            try:
                vectors_to_process = [list(x) for x in zip(*parsed_rows)]
            except Exception:
                return jsonify({'status': 'error', 'message': 'Matrix rows must be equal length.'})
        else:
            # "Row Mode" - The user typed one vector per line.
            # No changes needed.
            vectors_to_process = parsed_rows

        # 3. Call The Brain
        basis_result = determine_basis(vectors_to_process)
        
        return jsonify({'status': 'success', 'basis': basis_result})

    except ValueError:
        return jsonify({'status': 'error', 'message': 'Invalid numbers. Check for letters or typos.'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)