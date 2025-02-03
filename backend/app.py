from flask import Flask, request, jsonify
from ultralytics import YOLO
import cv2
import numpy as np
import base64

app = Flask(__name__)

# Load the YOLOv8 model
model = YOLO('model.pt')  # Ensure 'model.pt' is in the same directory

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.json:
        return jsonify({"error": "No image provided"}), 400

    try:
        # Decode the base64 image
        image_data = request.json['image'].split(',')[1]  # Remove data URL prefix
        image_bytes = base64.b64decode(image_data)
        image = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)

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

        # Convert output image to base64
        _, encoded_image = cv2.imencode('.jpg', output_image)
        output_image_base64 = base64.b64encode(encoded_image).decode('utf-8')

        return jsonify({
            "detections": detections,
            "output_image": output_image_base64,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)