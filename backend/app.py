from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import io

app = Flask(__name__)

# Load the YOLOv8 model
model = YOLO('best.pt')  # Ensure 'model.pt' is in the same directory

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    # Read the uploaded image
    file = request.files['file']
    image_bytes = file.read()
    image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

    # Perform inference
    results = model(image)

    # Extract detection results
    output_image = results[0].plot()  # Draw bounding boxes on the image
    detections = []

    for result in results:
        for box in result.boxes:
            class_id = int(box.cls)
            class_name = result.names[class_id]
            confidence = float(box.conf)
            detections.append({
                "class": class_name,
                "confidence": confidence,
                "bbox": box.xyxy.tolist()[0]  # Convert tensor to list
            })

    # Convert output image to bytes
    _, encoded_image = cv2.imencode('.jpg', output_image)
    output_image_bytes = encoded_image.tobytes()

    # Return the results
    return jsonify({
        "detections": detections,
        "output_image": output_image_bytes.hex()  # Send image as hex string
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)