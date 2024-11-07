import os
import argparse
import cv2
import json
from PIL import Image
import numpy as np
from skimage import io
from skimage.color import rgb2gray
from skimage.measure import label, regionprops

def load_parameters(path):
    with open(path, "r") as file:
        parameters = json.load(file)
    return parameters

def create_mockup(mockup_path, design_path, output_path, bbox, width, height, rotation):
    mockup = Image.open(mockup_path)
    design = Image.open(design_path)
   
    #aspect_ratio = design.height / design.width  <---- Changed this for posters.  Dont maintain aspect ratio.  May want to change based on product.
    design_width = width
    design_height = height
    #design_height = int(width * aspect_ratio)  <---- Changed this for posters.  Dont maintain aspect ratio.  May want to change based on product.

    if design_height > height:
        design_height = height
        #design_width = int(height / aspect_ratio)  <---- Changed this for posters.  Dont maintain aspect ratio.  May want to change based on product.
        design_width = width

    design = design.resize((design_width, design_height))
    design = design.rotate(np.degrees(rotation), expand=True)

    position = (int(bbox[1] + width / 2 - design.width / 2), int(bbox[0]))

    mockup.paste(design, position, design)
    mockup.save(output_path)

def create_mockups(design_dir, mockup_dir, parameters, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    mockup_count = 1
    for design_filename in os.listdir(design_dir):
        if design_filename.endswith(".jpg"): 
            print("its a jpg")
            exit() 
        design_path = os.path.join(design_dir, design_filename)
        for mockup_filename, params in parameters.items():
            mockup_path = os.path.join(mockup_dir, mockup_filename)
            output_path = os.path.join(output_dir, mockup_filename)
            create_mockup(mockup_path, design_path, output_path, params["bbox"], params["width"], params["height"], params["rotation"])
            mockup_count += 1
            

# params = '{"4.png": {"bbox": [462, 783, 1175, 1379], "height": 713, "width": 596, "rotation": 0.0}',
# bbox = params['bbox']
# print(bbox) 

# mockup_path = '/media/mockups/production_images/1_0iSEL1N.png'
# design_path = '/media/Life_is_Either_Adventure.png'
# output_path = '/Users/zach/Documents/ZAW/Development/theone/api/media/products/first.png'
# bbox = '416, 653, 1442, 1511'
# width = '858'
# height = '1026'
# rotation = '0'

# create_mockup(mockup_path, design_path, output_path, bbox, width, height, rotation)
