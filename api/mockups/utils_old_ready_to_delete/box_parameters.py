import numpy as np
from skimage import io
from skimage.color import rgb2gray
from skimage.measure import label, regionprops

def calculate_parameters(image_path, target_color):
    image = io.imread(image_path)[:, :, :3]
    grayscale = rgb2gray(image)

    r, g, b = target_color
    target_gray = 0.2989 * r + 0.5870 * g + 0.1140 * b
    mask = grayscale == target_gray

    label_img, _ = label(mask, connectivity=mask.ndim, return_num=True)
    properties = regionprops(label_img)

    if properties:
        for prop in properties:
            if prop.area == np.max([p.area for p in properties]):
                bbox = prop.bbox
                height = bbox[2] - bbox[0]
                width = bbox[3] - bbox[1]
                rotation = prop.orientation
        return bbox, height, width, rotation
    else:
        print(f"No properties found for image: {image_path}")
        return None, None, None, None


def get_parameters(image_path):
    color = '#000000' #black mockup mask on shirts

    hex_color = color.lstrip('#')
    target_color = tuple(int(hex_color[i:i+2], 16) for i in (0, 2 ,4))
    
    bbox, height, width, rotation = calculate_parameters(image_path, target_color)
    if bbox and height and width:
        parameters = {
            'bbox' : bbox,
            'height' : height,
            'width' : width,
            'rotation' : rotation,
        }
    return(parameters)