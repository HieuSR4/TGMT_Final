# Image
from keras.models import load_model
from time import sleep
from tensorflow.keras.utils import img_to_array
# from keras.preprocessing.image import img_to_array
from keras.preprocessing import image
import cv2
import numpy as np
from django.conf import settings
import os

BASE_DIR = settings.BASE_DIR

face_classifier = cv2.CascadeClassifier(os.path.join(
    BASE_DIR, "moodifymodel", 'haarcascade_frontalface_default.xml'))
classifier = load_model(os.path.join(
    BASE_DIR, "moodifymodel", 'model.h5'))

class_labels = ['Angry', 'Happy', 'Neutral', 'Sad', 'Surprise']

def return_mood(image_path):

    cap = cv2.VideoCapture(image_path)  # mp4 input from the front end
    while True:

        ret, frame = cap.read()
        labels = []
        try:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        except Exception as e:
            print("Error", e)
            return "No face detected"
        #nhận diện các khuôn mặt trong ảnh xám.
        faces = face_classifier.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (238, 130, 238), 2)
            roi_gray = gray[y:y+h, x:x+w]
            roi_gray = cv2.resize(roi_gray, (48, 48),
                                  interpolation=cv2.INTER_AREA)
            # để dự đoán tâm trạng từ vùng khuôn mặt và lấy ra kết quả dự đoán.
            if np.sum([roi_gray]) != 0:
                roi = roi_gray.astype('float')/255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)

                preds = list(classifier.predict(roi)[0])

                # array to be sent to the frontend
                return preds.index(max(preds))
