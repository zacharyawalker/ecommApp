import pandas as pd
from django.core.management.base import BaseCommand
from mockups.models import Color, ProductCategory
import os

class Command(BaseCommand):
    help = 'Imports color data from an Excel file into the Color model, allowing duplicate titles'

    def add_arguments(self, parser):
        parser.add_argument('file_path', type=str, help='Path to the Excel file to import')

    def handle(self, *args, **kwargs):
        file_path = kwargs['file_path']
        
        # Choose engine based on file extension
        file_extension = os.path.splitext(file_path)[1].lower()
        engine = 'openpyxl' if file_extension == '.xlsx' else 'xlrd'

        # Read the Excel file, skipping non-data rows
        try:
            data = pd.read_excel(file_path, engine=engine, skiprows=2)  # Adjust skiprows if needed
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Failed to read Excel file: {e}"))
            return

        # Check if DataFrame is empty
        if data.empty:
            self.stdout.write(self.style.ERROR("The Excel file is empty or has no readable data."))
            return

        # Drop any unnamed columns
        data = data.loc[:, ~data.columns.str.contains('^Unnamed')]

        # Check if DataFrame has the expected columns after dropping unnamed ones
        expected_columns = ['title', 'hex_code', 'category']
        if len(data.columns) != len(expected_columns):
            self.stdout.write(self.style.ERROR(
                f"Unexpected column structure. Expected columns: {expected_columns}, but found: {list(data.columns)}"
            ))
            return

        # Rename columns to match the model fields
        data.columns = expected_columns

        # Iterate over each row in the DataFrame
        for _, row in data.iterrows():
            color_category = row.get('category')
            color_title = row.get('title')
            color_hex_code = row.get('hex_code')

            # Skip rows with missing essential fields
            if pd.isna(color_title) or pd.isna(color_hex_code) or pd.isna(color_category):
                self.stdout.write(self.style.WARNING(f"Skipping incomplete row: {row}"))
                continue

            # Convert to string and strip whitespace
            color_category = str(color_category).strip()
            color_hex_code = str(color_hex_code).strip()
            color_title = str(color_title).strip()

            # Create a new Color instance without checking for duplicates
            Color.objects.create(
                category=color_category,
                title=color_title,
                hex_code=color_hex_code
            )
            self.stdout.write(self.style.SUCCESS(f"Created color: {color_title} in category: {color_category}"))

        self.stdout.write(self.style.SUCCESS("Excel import completed successfully!"))