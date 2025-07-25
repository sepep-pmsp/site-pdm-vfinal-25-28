# Generated by Django 5.2.4 on 2025-07-24 22:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estrutura_pdm', '0002_remove_tema_eixos_tema_eixo'),
    ]

    operations = [
        migrations.CreateModel(
            name='Meta',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero', models.IntegerField(verbose_name='Número da Meta')),
                ('destaque', models.CharField(max_length=250, unique=True, verbose_name='Destaque da Meta')),
                ('descricao', models.TextField(verbose_name='Descrição da Meta')),
            ],
            options={
                'verbose_name': 'Meta',
                'verbose_name_plural': 'Metas',
                'ordering': ['destaque'],
            },
        ),
        migrations.CreateModel(
            name='AcaoEstrategica',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('posicao', models.IntegerField(verbose_name='Ordem de Apresentação da Ação Estratégica')),
                ('descricao', models.CharField(max_length=100, unique=True, verbose_name='Descrição da Ação Estratégica')),
                ('meta', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='acoes_estrategicas', to='estrutura_pdm.meta', verbose_name='Meta relacionada')),
            ],
            options={
                'verbose_name': 'Ação Estratégica',
                'verbose_name_plural': 'Ações Estratégicas',
                'ordering': ['posicao'],
            },
        ),
    ]
