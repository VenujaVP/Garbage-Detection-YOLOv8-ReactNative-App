from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import base64
from PIL import Image
import io

app = Flask(__name__)

# Load the YOLOv8 model
model = YOLO('model.pt')  # Ensure 'model.pt' is in the same directory

def process_image(image):
    """
    Process an image using the YOLOv8 model.
    Args:
        image: Input image (numpy array).
    Returns:
        detections: List of detection results.
        output_image: Annotated image with bounding boxes.
    """
    # Perform inference
    results = model(image)

    # Extract detection results
    detections = []
    for result in results:
        for box in result.boxes:
            class_id = int(box.cls)
            class_name = result.names[class_id]
            confidence = float(box.conf)
            bbox = box.xyxy.tolist()[0]  # Convert tensor to list
            detections.append({
                "class": class_name,
                "confidence": confidence,
                "bbox": bbox,
            })

    # Draw bounding boxes on the image
    output_image = results[0].plot()

    return detections, output_image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files and 'image' not in request.json:
        return jsonify({"error": "No image provided"}), 400

    # Handle image upload (for classification)
    if 'file' in request.files:
        file = request.files['file']
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
        image = np.array(image)  # Convert PIL image to numpy array

    # Handle base64 image (for real-time detection)
    elif 'image' in request.json:
        image_data = request.json['image'].split(',')[1]  # Remove data URL prefix
        image_bytes = base64.b64decode(image_data)
        image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

    # Process the image
    detections, output_image = process_image(image)

    # Convert output image to base64
    _, encoded_image = cv2.imencode('.jpg', output_image)
    output_image_base64 = base64.b64encode(encoded_image).decode('utf-8')

    return jsonify({
        "detections": detections,
        "output_image": output_image_base64,
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)