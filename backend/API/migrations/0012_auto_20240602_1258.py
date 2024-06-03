# Generated by Django 3.2.23 on 2024-06-02 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0011_auto_20240313_1216'),
    ]

    operations = [
        migrations.CreateModel(
            name='Generos',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=100, unique=True)),
                ('descripcion', models.CharField(blank=True, max_length=250, null=True)),
                ('fecha_registro', models.DateTimeField(auto_now_add=True)),
                ('fecha_actualizacion', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'generos',
            },
        ),
        migrations.AddField(
            model_name='cargos',
            name='img_logo',
            field=models.FileField(blank=True, null=True, upload_to='img_logo_cargos'),
        ),
        migrations.AddField(
            model_name='recreadores',
            name='img_perfil',
            field=models.FileField(blank=True, null=True, upload_to='img_recreadores'),
        ),
        migrations.AlterField(
            model_name='cargos',
            name='descripcion',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='nivel',
            name='descripcion',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='nivel',
            name='nombre',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='permisos',
            name='descripcion',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='tipodocumento',
            name='descripcion',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AlterField(
            model_name='tipodocumento',
            name='nombre',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
