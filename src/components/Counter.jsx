import { Button } from '@radix-ui/themes';
import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
  return (
    <>
    <h2>Counter: {count}</h2>
    <div className='flex gap-2'>
    <Button onClick={() => setCount(count + 1)}>Increment</Button>
    <Button onClick={() => setCount(count - 1)}>Decrement</Button>
    <Button onClick={() => setCount(0)}>Reset</Button>
    </div>
    </>
  )
}

export default Counter