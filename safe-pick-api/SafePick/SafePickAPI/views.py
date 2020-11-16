from django.shortcuts import render, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
from . import kiwiscraper
from .dbContext import DbContext
import urllib.parse as parse
from . import mailsender
from hashlib import md5
import jwt
import redis

r = redis.Redis(host="localhost", port="6379", db=0)

countryList = []
results = {}

@csrf_exempt
def countries(request):
    if request.method == "GET":
        return HttpResponse(json.dumps(countryList))

    if request.method == "POST":
        data = json.loads(request.body.decode())

        userCountry = data['country'].lower()
        userCity = data['city'].lower()

        if len(countryList) > 0:
            countryList.clear()
        for country in data['markers']:
            countryList.append(country["countryName"])
        for i in range(len(countryList)):
            try:
                results[countryList[i]] = kiwiscraper.KiwiScraper.scrape(f"{userCity}-{userCountry}",countryList[i].lower())
            except:
                continue
    else:
        return HttpResponse('Please log in.')

    return HttpResponse(json.dumps(results))

@csrf_exempt
def register(request):
    if request.method == "POST":

        form = json.loads(request.body.decode())
        email = DbContext.checkEmail(form['email'])

        if not email:
            return HttpResponse('Email already exists.')
        else:  
            password = form['password']
            country = form['country']
            city = form['city']
            
            DbContext.save(email,password,country,city)
            return HttpResponse("Success")

@csrf_exempt
def login(request):
    if request.method == "POST":

        form = json.loads(request.body.decode())
        email = form['email']
        password = md5(form['password'].encode()).hexdigest()

        user = DbContext.login(email, password)

        if user:
            token = jwt.encode({'email':user['email'],'country':user['country'],'city':user['city']}, 'penguin', algorithm="HS256")
            return HttpResponse(token)
        else:
            return HttpResponse('Email or password incorrect.')

def logout(request):
    try:
        r.delete('email')
        r.delete('country')
        r.delete('city')
    except:
        pass
    return HttpResponse('Logged out.')

def activate(request, token):
    if token:
        try:
            DbContext.activate(token)
        except:
            return HttpResponse('Invalid token.')
    return HttpResponse('')

