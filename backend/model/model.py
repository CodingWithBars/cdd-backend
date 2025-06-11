import tensorflow as tf
from tensorflow.keras.applications.efficientnet import preprocess_input
import numpy as np
import os

# Load the model once
model = tf.keras.models.load_model("models/model.h5")
class_names = ['Healthy', 'Coccidiosis', 'Fowlpox', 'Marek', 'Newcastle']  # Change accordingly

def load_model_and_predict(image):
    img_array = np.array(image)
    img_array = preprocess_input(img_array)
    img_array = tf.image.resize(img_array, (380, 380))
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions)
    confidence = predictions[0][predicted_index]
    return class_names[predicted_index], confidence
