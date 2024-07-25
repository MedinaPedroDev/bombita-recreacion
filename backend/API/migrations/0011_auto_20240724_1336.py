# Generated by Django 3.2.23 on 2024-07-24 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0010_auto_20240724_1313'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pagos',
            name='divisa',
        ),
        migrations.AddField(
            model_name='metodospago',
            name='divisa',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='pagos',
            name='referencia',
            field=models.BigIntegerField(blank=True, default=None, null=True),
        ),
    ]
