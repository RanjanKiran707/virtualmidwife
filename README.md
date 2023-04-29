#Virtual Midwife
The backend code for virtual midwife application

default URL = http://localhost:4000
Please consider that all the routes start with the default url

# User authentication routes(POST):

The user authentication routes are as follows-

## Register - /auth/register
 Parameters required for body - { name,age,email,passsword}
 
 ## Login - /auth/login
  Parameters required for body - {email,password}
  
  ## User info - /details
    Parameters required for body - {height, weight, days since pregnant, doctor, partnerNumber}
    Please pass the email of the user as a query string parameter for this route 
 
 # API Endpoints for Diet plans that doctors provide to the patients:
  
   # POST REQUESTS:

   ## Add the diet plan: /diet/add 
    Parameters required - {email, plan}
    Note: The plan is just a string containing the meals advised by the doctor.

   ## Update water tracker: /diet/updatewater
    Parameters required - {litre}
    Please pass the email of the user as a query parameter in the URL.

   # GET REQUESTS
   
    ## Get the meal plan of a user - /diet/getmealplan
    Please pass the email of the user as a query parameter in the URL.
   
   
 
   
    
 
    
    

## Checking inventory - /inventory/getlist
 No parameters required. It's a GET request
 
 
