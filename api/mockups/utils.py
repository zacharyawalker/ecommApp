from PIL import Image
import os
import numpy as np
from skimage import io
from skimage.color import rgb2gray
from skimage.measure import label, regionprops

def ensure_folder_exists(folder_path):
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
        return(folder_path)
    else:
        return(folder_path)


def create_single_mockup(design_id, mockup_id, base_image_path, design_image_path, bbox, width, height, rotation, output_path):
    # Open the base image and design image
    base_image = Image.open(base_image_path)
    design_image = Image.open(design_image_path).convert("RGBA")  # Keep transparency

    # Resize the design image to the specified width and height
    design_image = design_image.resize((width, height), Image.LANCZOS)

    # Rotate the design image around its center
    design_image = design_image.rotate(rotation, expand=True)

    # Calculate position to paste (using bbox)
    x_offset = int(bbox[1]) + int((bbox[3] - bbox[1]) / 2 - design_image.width / 2)
    y_offset = int(bbox[0])

    # Paste the design image onto the base image using alpha channel as mask
    base_image.paste(design_image, (x_offset, y_offset), design_image)

    # Save the resulting image to the specified output path
    base_image.save(output_path, "PNG")

def create_library_mockup(design_id, mockup_id, base_image_path, design_image_path, bbox, width, height, rotation):
    # Open the base image and design image

    output_folder = ensure_folder_exists(f'/Users/zach/development/ecommApp/api/media/products/library_mockups/{design_id}/')
    output_path = f'{output_folder}/{design_id}_{mockup_id}.png'
    print(output_path)
    base_image = Image.open(base_image_path)
    design_image = Image.open(design_image_path).convert("RGBA")  # Keep transparency

    # Resize the design image to the specified width and height
    design_image = design_image.resize((width, height), Image.LANCZOS)

    # Rotate the design image around its center
    design_image = design_image.rotate(rotation, expand=True)

    # Calculate position to paste (using bbox)
    x_offset = int(bbox[1]) + int((bbox[3] - bbox[1]) / 2 - design_image.width / 2)
    y_offset = int(bbox[0])

    # Paste the design image onto the base image using alpha channel as mask
    base_image.paste(design_image, (x_offset, y_offset), design_image)

    # Save the resulting image
    base_image.save(output_path, "PNG")

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

# res = get_parameters('/Users/zach/Documents/ZAW/Development/theone/api/media/mockups/box_mockups/box_39.png')
# print(res)

# from PIL import Image, ImageOps
# import os
# import numpy as np
# from skimage import io
# from skimage.color import rgb2gray
# from skimage.measure import label, regionprops
# from api.utils import *


# def create_single_mockup(design_id, mockup_id, base_image_path, design_image_path, bbox, width, height, rotation):
#     output_folder = ensure_folder_exists(f'/Users/zach/Documents/ZAW/Development/theone/api/media/products/single_mockups/{design_id}/')
#     output_path = f'{output_folder}/{design_id}_{mockup_id}.png'
#     print(output_path)
    
#     base_image = Image.open(base_image_path)
#     design_image = Image.open(design_image_path).convert("RGBA")

#     design_image = design_image.resize((width, height), Image.LANCZOS)
#     design_image = design_image.rotate(rotation, expand=True)

#     x_offset = int(bbox[1]) + int((bbox[3] - bbox[1]) / 2 - design_image.width / 2)
#     y_offset = int(bbox[0])

#     base_image.paste(design_image, (x_offset, y_offset), design_image)
#     base_image.save(output_path, "PNG")


# def create_library_mockup(design_id, mockup_id, base_image_path, design_image_path, bbox, width, height, rotation):
#     output_folder = ensure_folder_exists(f'/Users/zach/Documents/ZAW/Development/theone/api/media/products/library_mockups/{design_id}/')
#     output_path = f'{output_folder}/{design_id}_{mockup_id}.png'
#     print(output_path)

#     base_image = Image.open(base_image_path)
#     design_image = Image.open(design_image_path).convert("RGBA")

#     design_image = design_image.resize((width, height), Image.LANCZOS)
#     design_image = design_image.rotate(rotation, expand=True)

#     x_offset = int(bbox[1]) + int((bbox[3] - bbox[1]) / 2 - design_image.width / 2)
#     y_offset = int(bbox[0])

#     base_image.paste(design_image, (x_offset, y_offset), design_image)
#     base_image.save(output_path, "PNG")


# def calculate_parameters(image_path, target_color):
#     image = io.imread(image_path)[:, :, :3] / 255.0  # Scale image to [0, 1] range
#     grayscale = rgb2gray(image)

#     r, g, b = target_color
#     target_gray = 0.2989 * r + 0.5870 * g + 0.1140 * b
#     mask = np.isclose(grayscale, target_gray)  # Use isclose for more robust matching

#     label_img, _ = label(mask.astype(bool), connectivity=mask.ndim, return_num=True)
#     properties = regionprops(label_img)

#     if properties:
#         # Find the largest region by area
#         largest_region = max(properties, key=lambda p: p.area)
        
#         # Use bbox attribute directly, as there's no area_bbox in regionprops
#         bbox = largest_region.bbox
#         height = bbox[2] - bbox[0]
#         width = bbox[3] - bbox[1]
        
#         # Use orientation attribute if it exists
#         rotation = getattr(largest_region, 'orientation', 0)
#         return bbox, height, width, rotation
#     else:
#         print(f"No properties found for image: {image_path}")
#         return None, None, None, None


# def get_parameters(image_path):
#     color = '#000000'  # black mockup mask on shirts

#     hex_color = color.lstrip('#')
#     target_color = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

#     bbox, height, width, rotation = calculate_parameters(image_path, target_color)
#     if bbox and height and width:
#         parameters = {
#             'bbox': bbox,
#             'height': height,
#             'width': width,
#             'rotation': rotation,
#         }
#         return parameters
#     else:
#         print("Failed to retrieve parameters.")
#         return None


# res = get_parameters('/Users/zach/Documents/ZAW/Development/theone/api/media/mockups/box_mockups/box_39.png')
# print(res)