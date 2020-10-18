# Generated by Django 3.1.2 on 2020-10-17 19:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='title',
            field=models.CharField(default='section', max_length=1000),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='section',
            name='training',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='core.training'),
        ),
        migrations.AlterField(
            model_name='subtopic',
            name='section',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subtopics', to='core.section'),
        ),
    ]
