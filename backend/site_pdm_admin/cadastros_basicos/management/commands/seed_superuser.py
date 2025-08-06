from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os
from config import load_dot_env_config

class Command(BaseCommand):
    help = "Seed para superusuário"

    def handle(self, *args, **kwargs):
        load_dot_env_config()
        User = get_user_model()
        
        try:
            username = os.environ['ADMIN_USER']
            email = os.environ['ADMIN_EMAIL']
            password = os.environ['ADMIN_PASSWORD']
        except KeyError as e:
            self.stdout.write(self.style.ERROR(f"Environment variable {e} not set. Please check your .env file."))
            return

        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(username=username, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"Superuser '{username}' created successfully."))
        else:
            self.stdout.write(self.style.WARNING(f"Superuser '{username}' already exists."))
