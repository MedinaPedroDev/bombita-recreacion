from django.urls import path
from .views.view import Metodos_Pagos_Views, Actividades_Views, Cargos_Views, Preguntas_Evento_View, Clientes_Views, Dollar_View, Eventos_Views, Generos_Views, Login, Eventos_Recreadores_Servicios_View, Materiales_Views, Niveles_Views, Permisos_Views, Personas_Views, Recreadores_Views, Respaldo, Servicios_Views, Sobrecargos_Views, Tipos_Documentos_Views, Usuarios_Views, Verify_Token_Views, Pagos_Views, Recraadores_Eventos_Views, Evaluacion_View

urlpatterns=[
    path('cargos/', Cargos_Views.as_view(), name='cargos'),
    path('cargos/<int:id>/', Cargos_Views.as_view(), name='cargo'),
    path('permisos/', Permisos_Views.as_view(), name='permisos'),
    path('tipos_documentos/', Tipos_Documentos_Views.as_view(), name='tipo_documentos'),
    path('tipos_documentos/<int:id>/', Tipos_Documentos_Views.as_view(), name='tipo_documento'),
    path('niveles/', Niveles_Views.as_view(), name='niveles'),
    path('dolar/', Dollar_View.as_view(), name='dolar'),
    path('niveles/<int:id>/', Niveles_Views.as_view(), name='nivel'),
    path('generos/', Generos_Views.as_view(), name='generos'),
    path('generos/<int:id>/', Generos_Views.as_view(), name='genero'),
    path('sobrecargos/', Sobrecargos_Views.as_view(), name='sobrecargos'),
    path('sobrecargos/<int:id>/', Sobrecargos_Views.as_view(), name='sobrecargo'),
    path('actividades/', Actividades_Views.as_view(), name='actividades'),
    path('actividades/<int:id>/', Actividades_Views.as_view(), name='actividad'),
    path('materiales/', Materiales_Views.as_view(), name='materiales'),
    path('materiales/<int:id>/', Materiales_Views.as_view(), name='material'),
    path('metodos_pago/', Metodos_Pagos_Views.as_view(), name='metodos_pago'),
    path('metodos_pago/<int:id>/', Metodos_Pagos_Views.as_view(), name='metodo_pago'),
    path('servicios/', Servicios_Views.as_view(), name='servicios'),
    path('servicios/<int:id>/', Servicios_Views.as_view(), name='servicio'),
    path('personas/<int:tipo_documento>/<int:documento>/', Personas_Views.as_view(), name='personas'),
    path('usuarios/', Usuarios_Views.as_view(), name='usuarios'),
    path('usuarios/<int:id>/', Usuarios_Views.as_view(), name='usuario'),
    path('recreadores/', Recreadores_Views.as_view(), name='recreadores'),
    path('recreadores/eventos/<int:id>/', Recraadores_Eventos_Views.as_view(), name='recreadores_evento'),
    path('recreadores/<int:id>/', Recreadores_Views.as_view(), name='recreadores'),
    path('eventos/', Eventos_Views.as_view(), name='eventos'),
    path('eventos/pagos/', Pagos_Views.as_view(), name='pagos'),
    path('eventos/recreadores/', Eventos_Recreadores_Servicios_View.as_view(), name='recreadores_eventos'),
    path('eventos/recreadores/<int:id>/', Eventos_Recreadores_Servicios_View.as_view(), name='recreadores_evento'),
    path('eventos/<int:id>/', Eventos_Views.as_view(), name='evento'),
    path('clientes/', Clientes_Views.as_view(), name='clientes'),
    path('clientes/<int:id>/', Clientes_Views.as_view(), name='cliente'),
    path('preguntas/', Preguntas_Evento_View.as_view(), name='preguntas'),
    path('preguntas/<int:id>/', Preguntas_Evento_View.as_view(), name='pregunta'),
    path('evaluacion/', Evaluacion_View.as_view(), name='evaluaciones'),
    path('evaluacion/<int:id>/', Evaluacion_View.as_view(), name='evaluacion'),
    path('login/', Login.as_view(), name='login'),
    path('verify/', Verify_Token_Views.as_view(), name='verify'),
    path('respaldo/', Respaldo.as_view(), name='respaldo'),
]