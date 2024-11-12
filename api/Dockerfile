# Use an official Python runtime as a parent image
FROM python:3.10

# Set environment variables to prevent Python from writing .pyc files and to buffer stdout/stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory to /api
WORKDIR /api

# Install dependencies
COPY requirements.txt /api/
RUN pip install -r requirements.txt

# Copy the rest of the Django project files
COPY . /api/

# Expose port 8000 to interact with Django
EXPOSE 8000

# Use Gunicorn to serve Django (or runserver for development)
CMD ["gunicorn", "api.wsgi:application", "--bind", "0.0.0.0:8000"]