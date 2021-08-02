import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/image/ImageLinkForm';
import Rank from './components/rank/Rank';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import SignIn from './components/signIn/SignIn';
import Register from './components/register/Register';
import './App.css';

const particlesOptions = {
  particles:{
    number:{
      value:75,
      density:{
        enable:true,
        value_area:800
      }},
    color:{
      value:"#b2a0f0"
    },
    shape:{
      type:"circle",
      stroke:{
        width:0,
        color:"#50d933"
        },
        polygon:{
          nb_sides:5
    }},
    opacity:{
      value:0.5,
      random:false,
      anim:{
        enable:false,
        speed:1,
        opacity_min:0.1,
        sync:false
    }},
    size:{
      value:2,
      random:true,
        anim:{
          enable:false,
          speed:5,
          size_min:0.1,
          sync:false
    }},
    line_linked:{
      enable:true,
      distance:150,
      color:"#ffffff",
      opacity:0.4,
      width:1
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
    }
  
  
loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('https://rocky-crag-56598.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
        .then(response => {
          if (response) {
            fetch('https://rocky-crag-56598.herokuapp.com/image', {
              method: 'put',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        //face detect ID c0c0ac362b03416da06ab3fa36fb58e3 does not work
        //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}
            />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      {route === 'home'
       ? <div>
       <Logo />
       <Rank name={this.state.user.name} entries={this.state.user.entries} />
       <ImageLinkForm 
         onInputChange={this.onInputChange} 
         onButtonSubmit={this.onButtonSubmit} 
       />
       <FaceRecognition box={box} imageUrl={imageUrl} />
       </div>
      : (
          route === 'signIn'
          ? <SignIn 
          loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register 
         loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      }
    </div>
  );
  }
}

export default App;
