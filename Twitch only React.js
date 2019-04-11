const {useState, useEffect} = React;


function Twitch(){
  const [twitch, setTwitch] = useState([]);
  
  useEffect(()=>{
    const promStream= fetch("https://api-express.glitch.me/streams")
      .then(res => res.json())
      .catch(err => console.error(err))
    const promChannel = fetch("https://api-express.glitch.me/channels")
      .then(res => res.json())
      .catch(err => console.error(err))
    
  Promise.all([promStream, promChannel]).then(res =>{
    let arr = []; 
    for(let item1 of res[0]){
        if(item1.stream === undefined){
          arr.push({channel: "undefined"});
        }else if(item1.stream === null){ 
           for(let item of res[1]){ // if no stream but need name
              if(item._links.self === item1._links.channel){// if the same channel
                
                arr.push({channel: `https://www.twitch.tv/${item.name}`,
                          stream: "offline",
                          name: item.display_name,
                          logo: item.logo})
              }
            }
        }else{
          arr.push({channel: `https://www.twitch.tv/${ 
                       item1.stream.channel.display_name}`,
                    self: item1._links.self, // not available without api
                    stream: "online",
                    name: item1.stream.channel.display_name,
                    game: item1.stream.game,
                    logo: item1.stream.channel.logo,
                    video_banner: item1.stream.channel.video_banner,
                    })
        }  
      }
    addItem(arr)
    })
  }, [twitch]);
  
  function addItem(data){
    if(twitch[0] === undefined){ // if empty array
      setTwitch(data)
    } 
  }
 
  return(
    <div className="container">
      <ul className="list">
        {
          twitch.map(item => {
           return( 
             <li className="item">
               <h3>{item.name}</h3>
               <a href={item.channel} 
                  title={item.name}
                  target="_blank">
                 <img className="image" 
                      src={item.logo} 
                      width="60" alt="logo" />
                </a>  
               <p className={item.stream}>
                 {item.stream} 
               </p>
               <p className="game">{item.game}
                 <span className="banner">
                    {
                      item.video_banner ? 
                        <a href={item.self} 
                           title={item.game}
                           target="_blank">
                          <img src={item.video_banner} 
                               alt={item.game}
                               width="60"/>
                        </a>: ''
                    }
                 </span>
              </p>
             </li>
             )
          })
        }
      </ul>
    </div>
  )
}

ReactDOM.render(<Twitch/>, document.getElementById("root"))
