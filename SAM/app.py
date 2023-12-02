from flask import Flask, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials,storage
import os
import torch
from segment_anything import sam_model_registry, SamAutomaticMaskGenerator
import numpy as np
import cv2
import pydicom
import matplotlib.pyplot as plt
from unicodedata import normalize


import sys
import requests
from urllib.parse import urlparse

HOME = os.getcwd()
app = Flask(__name__)
CORS(app)


cred = credentials.Certificate('..\\functions\project-09-e4dd7-firebase-adminsdk-508df-4fb4827183.json')
store = firebase_admin.initialize_app(cred,{
    'storageBucket':"project-09-e4dd7.appspot.com"
})

# bucket = storage.bucket()
# blob = bucket.get_blob("lungimage.dcm")
# blob.download_to_filename(r"./images/lungimage.dcm")
# #sys.argv[1]


# CHECKPOINT_PATH = os.path.join(HOME, "sam_vit_h_4b8939.pth")
# DEVICE = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')
# MODEL_TYPE = "vit_h"

# sam = sam_model_registry[MODEL_TYPE](checkpoint=CHECKPOINT_PATH).to(device=DEVICE)
# mask_generator = SamAutomaticMaskGenerator(sam)


# def show_anns(anns):
#     if len(anns) == 0:
#         return
#     sorted_anns = sorted(anns, key=(lambda x: x['area']), reverse=True)
#     ax = plt.gca()
#     ax.set_autoscale_on(False)

#     img = np.ones((sorted_anns[0]['segmentation'].shape[0], sorted_anns[0]['segmentation'].shape[1], 4))
#     img[:,:,3] = 0
#     for ann in sorted_anns:
#         m = ann['segmentation']
#         color_mask = np.concatenate([np.random.random(3), [0.35]])
#         img[m] = color_mask
#     ax.imshow(img)

# def prepare_dicoms(dcm_file,show=False):
#     dicom_file_data = pydicom.dcmread(dcm_file).pixel_array
    
#     HOUNSFIELD_MAX = np.max(dicom_file_data)
#     HOUNSFIELD_MIN = np.min(dicom_file_data)

#     HOUNSFIELD_RANGE = HOUNSFIELD_MAX - HOUNSFIELD_MIN

#     dicom_file_data[dicom_file_data < HOUNSFIELD_MIN] = HOUNSFIELD_MIN
#     dicom_file_data[dicom_file_data > HOUNSFIELD_MAX] = HOUNSFIELD_MAX
#     normalized_image = (dicom_file_data - HOUNSFIELD_MIN) / HOUNSFIELD_RANGE
#     uint8_image = np.uint8(normalized_image*255)

#     opencv_image = cv2.cvtColor(uint8_image, cv2.COLOR_GRAY2BGR)
#     return opencv_image

# print("preparing dicom")
# dicom_image = prepare_dicoms('./images/lungimage.dcm', show=True)
# print("generating mask")
# masks = mask_generator.generate(dicom_image)      #uses model to segment image, takes ~1m with GPU, ~10m without depending on CPU 

# plt.figure(figsize=(20,20))
# plt.imshow(dicom_image)   
# show_anns(masks)        #plots segmented image
# plt.axis('off')
# plt.savefig('./images/annotated_lungimage.png', bbox_inches='tight', pad_inches=0)      #saves image into directory 
# plt.close()
# print("annotated saved locally")
# blob2 = bucket.blob("annotated_lungimage.png")
# blob2.upload_from_filename("./images/annotated_lungimage.png")


@app.route('/process_and_upload', methods=['GET'])
def runImage():
    data = request.json
    print(data)
    return jsonify(data)    #testing to see if data sent
    



if __name__ == '__main__':
    app.run(debug=True)
