import Head from 'next/head'
import { DragEventHandler, useState, DragEvent } from 'react'

export default function Home() {
  const [todoItems, setTodoItems] = useState(['Buy milk'])
  const [doingItems, setDoingItems] = useState(['Wash the car'])
  const [doneItems, setDoneItems] = useState(['Paint a picture'])

  return (
    <div className="prose mx-auto min-h-screen">
      <Head>
        <title>DIY Trello</title>
        <meta
          name="description"
          content="Exploring the native drag-and-drop API"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>DIY Trello</h1>

      <ItemList
        name="TODO"
        className="bg-purple-200"
        items={todoItems}
        setItems={setTodoItems}
      />
      <ItemList
        name="Doing"
        className="bg-blue-200"
        items={doingItems}
        setItems={setDoingItems}
      />
      <ItemList
        name="Done"
        className="bg-green-200"
        items={doneItems}
        setItems={setDoneItems}
      />
    </div>
  )
}

function ItemList({
  items,
  name,
  className,
  setItems
}: {
  items: string[]
  name: string
  className?: string
  setItems: (items: string[]) => void
}) {
  const [isReadyForDrop, setIsReadyForDrop] = useState(false)
  const handleDrop: DragEventHandler = (e) => {
    setIsReadyForDrop(false)
    setItems([...items, e.dataTransfer.getData('text/plain')])
  }

  function allowDrop(event: DragEvent) {
    event.preventDefault()
    setIsReadyForDrop(true)
  }

  return (
    <ul
      aria-label={name}
      className={`p-2 rounded ${className ? className : ''}`}
      onDragOver={allowDrop}
      onDrop={handleDrop}
      onDragLeave={() => setIsReadyForDrop(false)}
    >
      <strong>{name}</strong>
      {items.map((todoItem) => (
        <Item
          key={todoItem}
          itemText={todoItem}
          removeItself={() =>
            setItems(items.filter((currentItem) => currentItem !== todoItem))
          }
        />
      ))}
      {isReadyForDrop ? <ItemDropZone /> : null}
    </ul>
  )
}

function Item({
  itemText,
  removeItself
}: {
  itemText: string
  removeItself: () => void
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart: DragEventHandler<HTMLDivElement> = ({
    dataTransfer
  }) => {
    setIsDragging(true)
    dataTransfer.setData('text/plain', itemText)
  }

  const handleDragEnd: DragEventHandler<HTMLDivElement> = () => {
    setIsDragging(false)
    removeItself()
  }

  return (
    <div
      role="listitem"
      className={`border-2 p-2 bg-white rounded m-1 ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {itemText}
    </div>
  )
}

function ItemDropZone() {
  return (
    <div className="rounded border-dotted border-2 border-red-300 h-11 m-1" />
  )
}
