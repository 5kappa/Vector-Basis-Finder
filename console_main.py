from core.solver import determine_basis
import sys

def main():
    print("--- Vector Basis Calculator ---")
    print("Enter vectors row by row.")
    print("Format: integers separated by spaces (e.g., '1 0 5')")
    print("Type 'done' when finished or 'exit' to quit.\n")

    vectors = []
    
    while True:
        user_input = input(f"Enter Vector {len(vectors) + 1}: ").strip()
        
        if user_input.lower() == 'exit':
            sys.exit()
            
        if user_input.lower() == 'done':
            if not vectors:
                print("Error: No vectors entered.")
                continue
            break

        try:
            # 1. Parse Input: "1 2 3" -> [1.0, 2.0, 3.0]
            current_vector = [float(x) for x in user_input.split()]
            
            # Validation: Ensure all vectors have the same dimension
            if vectors and len(current_vector) != len(vectors[0]):
                print(f"Error: Vector must have {len(vectors[0])} dimensions.")
                continue
                
            vectors.append(current_vector)
            
        except ValueError:
            print("Invalid input. Please enter numbers separated by spaces.")

    # 2. Call the Core Logic
    print("\nCalculating Basis...")
    try:
        basis = determine_basis(vectors)
        
        # 3. Display Result
        print("-" * 30)
        print(f"Found {len(basis)} basis vectors:")
        for i, vec in enumerate(basis):
            # Clean formatting for display
            clean_vec = [float(num) for num in vec] 
            print(f"Basis {i+1}: {clean_vec}")
        print("-" * 30)
            
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()