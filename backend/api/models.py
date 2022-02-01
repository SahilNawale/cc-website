from distutils.command import upload
from time import timezone
from django.db import models
import datetime
from django.core.validators import MaxValueValidator, MinValueValidator

def current_year():
    return datetime.date.today().year 

def max_value_current_year(value): # validator for passout year in profile
    return MaxValueValidator(current_year()+4)(value)   

class Profile(models.Model):
    uid = models.CharField(max_length=12,primary_key=True)
    email = models.EmailField(max_length=254,unique=True)
    name = models.CharField(max_length=30)
    password = models.TextField(editable=True)
    passoutYear = models.PositiveIntegerField(default=current_year(), validators=[MinValueValidator(1984), max_value_current_year])
    branch =  models.CharField(max_length=20)
    skills = models.TextField()
    workExperience = models.TextField(blank=True)
    linkedInProfile = models.CharField(max_length=100,blank=True)
    githubProfile = models.CharField(max_length=100,blank=True)
    otherLinks = models.TextField(blank=True)
    city = models.CharField(max_length=20)
    state = models.CharField(max_length=20)
    country = models.CharField(max_length=20)
    currentCompany = models.CharField(max_length=30,blank=True)
    description = models.TextField()
    role = models.CharField(max_length=30,blank=True)
    profilePic = models.ImageField(upload_to='profilePics',blank=True)

    def __str__(self):
        return self.email
        

class Event(models.Model):
    name = models.CharField(max_length=100)
    details = models.TextField()
    date = models.DateField()
    resources = models.CharField(max_length=50)  
    image = models.ImageField(upload_to='eventImages',null=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=20)
    shortDesc = models.CharField(max_length=50)
    formLink = models.CharField(max_length=50)
    longDesc = models.TextField()
    image = models.ImageField(upload_to='projects')

    def __str__(self):
        return self.name

class Company(models.Model): 
    name = models.CharField(max_length=20)
    package = models.CharField(max_length=20)
    descOfRole = models.TextField()
    tech = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Question(models.Model):
    company = models.ForeignKey(Company,on_delete=models.CASCADE)
    question = models.TextField() 
    date = models.DateField(default=datetime.date.today())

    def __str__(self):
        return str(self.question)  

class Answer(models.Model):
    question = models.ForeignKey(Question,on_delete=models.CASCADE)
    user = models.ForeignKey(Profile,on_delete=models.CASCADE)    
    answer = models.TextField()
    upvote = models.IntegerField()

    def __str__(self):
        return str(self.question) + " "+ str(self.answer) 


#which company model to keep , will question model have user field     
