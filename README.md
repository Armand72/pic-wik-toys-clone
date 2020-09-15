### Currently researching a job or a company that would hire me for one year for a work-based training. To see my other projects, look at [my portfolio][website] or [my linkedin][linkedin]. 💻 

## 🤖 Welcome to the pic-wik-toys-clone project 😀

[Link to the project website][picwik]

[Link to the real website][picwikReal]



<b>Why</b>: I was able to learn new technologies like mongoDB, a payment API (Stripe), typescript and hooks with react. It has required lots of research on the internet in order to comprehend the full extent of each technology. The project is a clone of [the following website][cloneurl]. 

<b>Features</b>
- select a product
- choose a quantity
- create an account
- check your cart 🧺
- pay

The website has been secured thanks to cookies, dotenv, bcrypt and jsonwebtoken.

### Stack ⚙️

<div style="display:flex;justify-content:center;">

  <img src="https://i.ibb.co/f0Kp7cw/github.png" width="50" height="50" padding="5" title="github">
  <img src="https://i.ibb.co/d6kyD08/react.png" width="50" height="50" title="react">
  <img src="https://i.ibb.co/X2cMhQ0/redux.png" width="50" height="50" title="redux">
   <img src="https://i.ibb.co/GshqzgP/typescript-1.png" width="50" height="50" title="typescript">
  <img src="https://i.ibb.co/GVdFnW1/sass.png" width="50" height="50" title="sass">
  <img src="https://i.ibb.co/vhynR80/nodejs.png" width="50" height="50" title="nodejs">
   <img src="https://i.ibb.co/FBBVg06/jestlogo.png" width="50" height="50" title="jest">
  <img src="https://i.ibb.co/djVY283/stripe2.png" width="50" height="50" title="stripe">
</div>

### Install the repository 📩

To run this project, you will need typescript and ts-node to be installed globally:
`npm install -g typescript`
`npm install -g ts-node`

The repository is composed of two package.json. You will need to run `npm install` <b>two times</b>.

<b>Create 2 .env</b>: one in the root folder the other in the client folder.

<b>.env in the root folder</b>

- SERVER_ADDRESS = port (Ex: 4000)
- DB = link to your mongodb atlas cluster
- URL_DOMAIN = URL for the domain name (in this case: https://pic-wik-toys-clone.herokuapp.com/)
- URL_LOCALHOST = URL for localhost  (Ex: http://localhost:3000)
- STRIPE_KEY = Private key given by stripe 
- SECRETJWT = JWT secret for tokenisation
- DB_TEST = link to the mongodb cluster for testing

<b>.env in the client folder</b>

- REACT_APP_SERVER_ADDRESS = server address/api/ (Ex: http://localhost:4000/api/)
- REACT_APP_URL_ADDRESS = URL address/api/ (Ex: https://pic-wik-toys-clone.herokuapp.com/api/)
- PUBLIC_STRIPE_KEY =  Public key given by stripe 

### Start Project 🏃

Use `npm run dev` in the root folder in order to launch the back and front concurrently.

Use `npm test`to run the test with jest in the root folder



  
  
  [website]: https://armand-meunier.herokuapp.com/
  [cloneurl]: https://www.picwictoys.com/
  [linkedin]: https://www.linkedin.com/in/armand-meunier/
    [picwik]: https://pic-wik-toys-clone.herokuapp.com/
    [picwikReal]: https://www.picwictoys.com/
