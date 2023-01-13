import React from 'react'

function App() {
  const [data, setData] = React.useState([]);
  const [text, setText] = React.useState("");
  const [updatedText, setUpdatedText] = React.useState("");
  const [switcher, setSwitcher] = React.useState(false);
  const [id, setId] = React.useState("");
  React.useEffect(() => {
    fetch("http://localhost:5000/post/get", { method: "post" }).then(Data => Data.json()).then(Data => setData(Data.data))
  }, [])
  function onSubmitHandler(e) {
    e.preventDefault()
    if (switcher) {
      fetch(`http://localhost:5000/post/update/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: updatedText }),
      })
        .then(() => fetch("http://localhost:5000/post/get", { method: "post" })
          .then(Data => Data.json())
          .then(Data => setData(Data.data)))
      setSwitcher(false)
    } else {
      fetch(`http://localhost:5000/post/create`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      }).then(e => fetch("http://localhost:5000/post/get", { method: "post" }).then(Data => Data.json()).then(Data => setData(Data.data)))
    }
    setText("")
    setUpdatedText("")
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler}
      >
        <input onChange={e => {
          setText(e.target.value)
          setUpdatedText(e.target.value)
        }} style={{ margin: "auto", display: "block", width: "300px", height: "40px" }} value={updatedText && updatedText} />
      </form>
      <div>
        {data.map(post => {
          return (
            <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "120px" }}>
              <h2>{post.text}</h2>
              <button onClick={e => {
                setUpdatedText(post.text)
                setSwitcher(true)
                setId(post._id)
              }}>Edit</button>
              <button onClick={e => fetch(`http://localhost:5000/post/delete/${post._id}`, { method: "delete" }).then(() => fetch("http://localhost:5000/post/get", { method: "post" }).then(Data => Data.json()).then(Data => setData(Data.data)))}>delete</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App

