import tensorflow as tf
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
import io
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load models
models = {
    "VGG 16 no weights model": tf.keras.models.load_model("models/eurosat_rgb_vgg16_model_no_weights.h5"),
    "VGG 16 model": tf.keras.models.load_model("models/eurosat_rgb_vgg16_model_original.h5"),
    "VGG 19 model": tf.keras.models.load_model("models/eurosat_rgb_vgg19_model.h5"),
    "VGG 16 regularized model": tf.keras.models.load_model("models/eurosat_rgb_vgg16_model_regularized.h5"),
    "Simple CNN model": tf.keras.models.load_model("models/eurosat_simple_cnn_model.h5"),
    
    # Add more models here
}

# Define category names
category_names = [
    "AnnualCrop", "Forest", "HerbaceousVegetation", "Highway", "Industrial",
    "Pasture", "PermanentCrop", "Residential", "River", "SeaLake"
]

def preprocess_image(image, target_size):
    """Resize and normalize the image for the model."""
    image = image.resize(target_size)  # Resize to model's input size
    image = np.array(image) / 255.0   # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/predict", methods=["POST"])
def predict():
    print("Request files:", request.files)
    print("Request form:", request.form)
    
    if "file" not in request.files or "model" not in request.form:
        return jsonify({"error": "Missing file or model parameter"}), 400

    # Get the model name and check if it exists
    model_name = request.form["model"]
    if model_name not in models:
        return jsonify({"error": "Model not found"}), 404

    # Load and preprocess the image
    file = request.files["file"]
    try:
        image = Image.open(io.BytesIO(file.read()))
        # Determine the target size based on the model's expected input shape
        target_size = (64, 64) # Adjust sizes as needed
        processed_image = preprocess_image(image, target_size=target_size)
    except Exception as e:
        print(f"Error processing image: {e}")
        return jsonify({"error": "Invalid image file"}), 400

    # Make prediction
    model = models[model_name]
    prediction = model.predict(processed_image)
    predicted_class_index = np.argmax(prediction, axis=1)[0]
    predicted_class_name = category_names[predicted_class_index]

    return jsonify({
        "prediction": prediction.tolist(),
        "predicted_class_index": int(predicted_class_index),
        "predicted_class_name": predicted_class_name
    })

if __name__ == '__main__':
    print("Server started")
    app.run(host='0.0.0.0', port=5000)
