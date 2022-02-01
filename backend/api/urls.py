from django.urls import path

from .views import AnswerView, CompanyView, EventView, LoginView, LogoutView, NetworkView, ProfileView, ProjectView, QuestionView, UpdateProfileView,VerifyView

urlpatterns = [
    path('login/', LoginView.as_view(), name="login"),
    path('profile/',ProfileView.as_view(),name="profile"),
    path('update-profile/',UpdateProfileView.as_view(),name="update-profile"),
    path('event/<str:pk>',EventView.as_view(),name="event"),
    path('project/<str:pk>',ProjectView.as_view(),name="project"),
    path('company/<str:pk>',CompanyView.as_view(), name="company"),
    path('question/<str:pk>',QuestionView.as_view(), name="question"),
    path('answer/<int:pk>',AnswerView.as_view(), name="answer"),
    path('logout/',LogoutView.as_view(), name="logout"),
    path('verify/',VerifyView.as_view(), name="verify"),
    path('network/<str:pk>',NetworkView.as_view(), name="network"),
]