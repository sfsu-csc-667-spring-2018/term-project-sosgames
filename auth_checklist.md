# Auth

Checklist used from Coding Garden with CJ

## We will have 3 types of users

* Visitors - can only view the homepage
* Logged In User - can only view the their page
* Admin User - can view any page; can de-activate users;

## Authentication

* [ ] Add auth router
* [ ] Create user with POST /auth/signup
  * [ ] validate required fields
  * [ ] Check if email is unique
  * [ ] hash password with bcrypt
  * [ ] insert into db
* [ ] Login user with POST /auth/login
  * [ ] check if email in db
    * [ ] compare password with hashed password in db
    * [ ] Set a cookie with user_id after creating user
      * [ ] Best Practices
      * [ ] Cross origin cookie!
* [ ] Create login form; show errors; redirect;
  * [ ] validate required fields
* [ ] Create sign up form; show errors; redirect;
  * [ ] Validate required fields

## Authorization

* [ ] Visitors can only see the homepage
  * [ ] isLoggedIn middleware
    * [ ] user_id cookie must be set
    * [ ] send an unauthorized error message
  * [ ] redirect to login form
* [ ] Logged in users can only see their page
  * [ ] allowAccess middleware
    * [ ] id in url must match user_id in cookie
    * [ ] send an unauthorized error message
  * [ ] redirect to user page if they visit the homepage
    * [ ] set user_id in localStorage after login/signup
* [ ] Add GET /auth/logout to clear user_id cookie
  * [ ] redirect to login page

## Admin Page

* [ ] Admin page that lists all users
  * [ ] admin table with user_id (unique constraint)
  * [ ] de-activate users
* [ ] Admin can see any page on site

## Other ways to auth

* [ ] Use sessions instead of cookies!
* [ ] Use JWTs instead of sessions!