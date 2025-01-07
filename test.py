from ultralytics import YOLO
import torch
import cv2
import time

# Initialize webcam
cap = cv2.VideoCapture(0)  
cap.set(3, 1920)  # Set width = 1920  px
cap.set(4, 1080)  # Set height = 1080 px 

if not cap.isOpened():
    print("Error: Cannot access the camera.")
    exit()

# Load YOLO model
model = YOLO("./weights/yolov8l.pt")

# Add GPU support
device = 'cuda' if torch.cuda.is_available() else 'cpu'
model.to(device)
print(device)

# Test OpenCV GUI
cv2.namedWindow("Image", cv2.WINDOW_NORMAL)
cv2.resizeWindow("Image", 1280, 720)

while True:
    success, img = cap.read()
    if not success:
        print("Error: Failed to capture frame.")
        break

    results = model(img, stream=True)
    for r in results:
        boxes = r.boxes
        for box in boxes:
            # Bounding Box
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            # Draw Rectangle
            cv2.rectangle(img, (x1, y1), (x2, y2), (255, 0, 255), 3)

            # Confidence Score
            conf = box.conf[0] 
            conf = round(float(conf), 2)

            # Class Name
            cls = int(box.cls[0])  # Class ID
            label = f"{model.names[cls]} {conf}" 

            # Put Text
            cv2.putText(img, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    cv2.imshow("Image", img)  # Display the frame

    cv2.waitKey(1)

cap.release()
cv2.destroyAllWindows()
