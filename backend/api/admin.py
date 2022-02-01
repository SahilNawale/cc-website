from django.contrib import admin

from api.models import Answer, Company, Profile,Event, Project, Question
# Register your models here

admin.site.register(Event)
admin.site.register(Answer)
admin.site.register(Question)
admin.site.register(Profile)
admin.site.register(Project)
admin.site.register(Company)

#username = test
#password = test