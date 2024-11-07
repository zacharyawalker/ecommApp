from PIL import Image

def paste_design_on_mockup(base_image_path, design_image_path, bbox, width, height, rotation):
    # Open the base image and design image
    output_path = '/Users/zach/development/ecommApp/api/media/products/test.png'
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