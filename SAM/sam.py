import torch
import torchvision
import os
from segment_anything import sam_model_registry, SamAutomaticMaskGenerator, SamPredictor
import numpy as np
import matplotlib.pyplot as plt
import cv2

HOME = os.getcwd()  #gets current path (cd)
print("HOME:", HOME)

#file added to gitignore but you have to have sam_vit_h_4b8939.pth in this folder
CHECKPOINT_PATH = os.path.join(HOME, "sam_vit_h_4b8939.pth")      
print(CHECKPOINT_PATH, "; exist:", os.path.isfile(CHECKPOINT_PATH))         #checks if SAM model is in the directory (should be true. if false change directory to ..\project_09\SAM)

DEVICE = torch.device('cuda:0' if torch.cuda.is_available() else 'cpu')     
MODEL_TYPE = "vit_h"

sam = sam_model_registry[MODEL_TYPE](checkpoint=CHECKPOINT_PATH).to(device=DEVICE)      #generates the SAM model 

mask_generator = SamAutomaticMaskGenerator(sam)     #creates the mask generator to segment images

#shows the segments of the image
def show_anns(anns):
    if len(anns) == 0:
        return
    sorted_anns = sorted(anns, key=(lambda x: x['area']), reverse=True)
    ax = plt.gca()
    ax.set_autoscale_on(False)

    img = np.ones((sorted_anns[0]['segmentation'].shape[0], sorted_anns[0]['segmentation'].shape[1], 4))
    img[:,:,3] = 0
    for ann in sorted_anns:
        m = ann['segmentation']
        color_mask = np.concatenate([np.random.random(3), [0.35]])
        img[m] = color_mask
    ax.imshow(img)

#image segmentation

image = cv2.imread('images/dog.jpg')            #reads an image from the images folder
image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)   
masks = mask_generator.generate(image)      #uses model to segment image, takes ~1m with GPU, ~10m without depending on CPU 
plt.figure(figsize=(20,20))
plt.imshow(image)   
show_anns(masks)        #plots segmented image
plt.axis('off')
plt.savefig('annotated_dog_image.png', bbox_inches='tight', pad_inches=0)      #saves image into directory 
plt.close()
