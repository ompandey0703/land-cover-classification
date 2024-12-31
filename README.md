# land-cover-classification

## Setup

### Backend

1. **Create a virtual environment and activate it**:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

2. **Install dependencies**:

   ```sh
   pip install -r requirements.txt
   ```

3. **Run the Flask app**:
   ```sh
   python app.py
   ```

### Frontend

1. **Navigate to the frontend directory**:

   ```sh
   cd frontend
   ```

2. **Install dependencies**:

   ```sh
   npm install
   ```

3. **Run the React app**:
   ```sh
   npm start
   ```

## Usage

- The backend API will be available at `http://localhost:5000`.
- The frontend React app will be available at `http://localhost:3000`.

## Models

The project uses various models stored in the [models](http://_vscodecontentref_/30) directory. The models are trained using different architectures like VGG16, VGG19, and simple CNN.

## Notebooks

- [AI_Endterm_Project_ResNet_Testing.ipynb](http://_vscodecontentref_/31): Jupyter notebook for testing the ResNet model.
- [FinalAIProject.ipynb](http://_vscodecontentref_/32): Jupyter notebook for the final AI project.

## License

This project is licensed under the MIT License.
