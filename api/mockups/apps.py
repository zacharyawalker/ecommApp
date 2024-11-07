from django.apps import AppConfig


class MockupsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'mockups'
    
    def ready(self):
        import mockups.signals

