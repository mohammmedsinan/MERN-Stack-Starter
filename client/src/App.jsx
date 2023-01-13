import React from 'react'

function App() {
  const [data, setData] = React.useState([]);
  const [text, setText] = React.useState("");
  React.useEffect(() => {
    fetch("http://localhost:5000/post/get", { method: "post" }).then(Data => Data.json()).then(Data => setData(Data.data))
    console.log(data)
  }, [])
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        fetch(`http://localhost:5000/post/create`, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        })
      }}
      >
        <input onChange={e => setText(e.target.value)} style={{ margin: "auto", display: "block", width: "300px", height: "40px" }} />
      </form>
      <div>
        {data.map(post => {
          return (
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "120px" }}>
              <h2>{post.text}</h2>
              <button>Edit</button>
              <button >delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App